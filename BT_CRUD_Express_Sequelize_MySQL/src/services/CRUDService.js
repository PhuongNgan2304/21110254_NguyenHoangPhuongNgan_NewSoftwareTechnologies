import bcrypt from 'bcryptjs'; // Import bcryptjs library
import db from '../models/index.js'; // Import database
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); // Generate salt for hashing

// Function to create a new user
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPasswordFromBcrypt = await hashUserPassword(data.password); // Hash the user's password
            await db.User.create({
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
            reject (error);
        }
    })
};

// Function to hash the user password
const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync("B4c0/\/", salt); // Hash the password
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
            const users = await db.User.findAll({
                raw: true, // Return raw data
            });
            resolve(users); // Return the users data
        } catch (error) {
            reject(error); // Reject with error if fetching fails
        }
    });
};

//findOne CRUD
const getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }, //query điều kiện cho tham số
                raw: true
            });
            if (user) {
                resolve(user);//hàm trả về kết quả
            } else {
                resolve([]); //hàm trả về kết quả rỗng
            }
        } catch (error) {
            reject(error);
        }
    })
}

//hàm put CRUD
const updateUser = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id }
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //const updatedUser = await db.User.findAll;
                return "Successful!";
            }else{
                resolve();//hàm trả về kết quả rỗng
            }
        } catch (error) {
            reject(error);
            
        }
    })
}

//hàm xóa user
const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            })
            if(user){
                user.destroy();
            }
            resolve();//là return
        } catch (error) {
            reject(error);
        }
    })
}

export default { createNewUser, getAllUser, getUserInfoById, updateUser, deleteUserById };