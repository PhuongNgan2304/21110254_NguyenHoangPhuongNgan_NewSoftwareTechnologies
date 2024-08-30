// export const fetch = async (req, res) =>{
//     try {
//         return res.send("Hello World!");
//     } catch (error) {
//         res.status(500).json({error: "Internal Server error."});
//     }
// };

import userService from "../services/userService.js";

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

export default {getCRUD, postCRUD, getFindAllCrud};