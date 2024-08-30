// export const fetch = async (req, res) =>{
//     try {
//         return res.send("Hello World!");
//     } catch (error) {
//         res.status(500).json({error: "Internal Server error."});
//     }
// };

import userService from "../services/userService.js";
import User from '../model/userModel.js';


// Function to get the home page
const getHomePage = async (req, res) => {
    try {
        const data = await User.find().lean(); // Fetch data from models/index
        console.log('.............................');
        console.log(data);
        console.log('.............................');
        return res.render('test/homepage.ejs', {
            data: JSON.stringify(data) // Pass data to view
        });
    } catch (e) {
        console.error(e);
    }
};

// Function to get the about page
const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

// Function to find all users for CRUD
const getFindAllCrud = async (req, res) => {
    const data = await userService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    }); // Render view and pass data
};

const getCRUD = (req, res) =>{
    return res.render('crud.ejs'); 
}

const postCRUD = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD to server');
}

// Function to get data for editing
const getEditCRUD = async (req, res) => {
    const userId = req.query._id;
    if (userId) {
        const userData = await userService.getUserInfoById(userId);
        return res.render('users/updateUser.ejs', {
            data: userData
        });
    } else {
        return res.send('Cannot find user ID');
    }
};

// Function to update CRUD data
const putCRUD = async (req, res) => {
    try {
        const { id, ...updateData } = req.body; // Tách id và dữ liệu cập nhật từ req.body
        
        // Gọi hàm updateUser với id và dữ liệu cập nhật
        const updatedUser = await userService.updateUser(id, updateData);
        
        // Hiển thị thông tin hoặc chuyển hướng sau khi cập nhật
        return res.render('users/findAllUser.ejs', {
            datalist: [updatedUser] // Cập nhật dữ liệu hiển thị
        });
    } catch (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }
};

// Function to delete data
const deleteCRUD = async (req, res) => {
    const id = req.query.id; // Query parameter
    if (id) {
        await userService.deleteUserById(id);
        return res.send('Deleted!!!!');
    } else {
        return res.send('User not found');
    }
};
export default {getHomePage, getAboutPage, getCRUD, postCRUD, getFindAllCrud, getEditCRUD, putCRUD, deleteCRUD};