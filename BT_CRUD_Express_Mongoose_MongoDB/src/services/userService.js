import mongoose from 'mongoose';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

// Generate salt for hashing
const salt = bcrypt.genSaltSync(10); 

// Function to create a new user
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPasswordFromBcrypt = await hashUserPassword(data.password); // Hash the user's password
            await User.create({
                email: data.email,
                password: hashedPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1', // Convert '1' to true, otherwise false
                roleId: data.roleId,
            });
            resolve('User created successfully');
        } catch (error) {
            reject(error);
        }
    });
};

// Function to hash the user password
const hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const hashPassword = bcrypt.hashSync(password, salt); // Hash the password
            resolve(hashPassword); // Resolve the hashed password
        } catch (error) {
            reject(error); // Reject with error if hashing fails
        }
    });
};

//findAll CRUD
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find().lean();
            resolve(users); // Return the users data
        } catch (error) {
            reject(error); // Reject with error if fetching fails
        }
    });
};

//findOne CRUD
const getUserInfoById = async (id) => {
    try {
        // Ensure id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const user = await User.findById(id).lean();
        if (user) {
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
// const getUserInfoById = async(userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // Ensure id is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             throw new Error('Invalid ID format');
//         }
//         const user = await User.findById(userId).lean();
//         if (user) {
//             return user;
//         } else {
//             throw new Error('User not found');
//         }
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

//hàm put CRUD
const updateUser = async (id, updateData) => {
    try {
        // Ensure id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (updatedUser) {
            return updatedUser;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

//hàm xóa user
const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId);
            if(user){
                await user.deleteOne();
                resolve("User deleted successfully!");
            }
            resolve();//là return
        } catch (error) {
            reject(error);
        }
    })
}




export default { createNewUser, getAllUser, getUserInfoById, updateUser, deleteUserById };
