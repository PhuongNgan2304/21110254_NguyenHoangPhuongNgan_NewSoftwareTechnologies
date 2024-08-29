import db from '../models/index.js'; // Import database
 import CRUDService from '../services/CRUDService.js'; // Import service

// Function to get the home page
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll(); // Fetch data from models/index
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

// Function to get CRUD page
const getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

// Function to find all users for CRUD
const getFindAllCrud = async (req, res) => {
    const data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    }); // Render view and pass data
};

// Function to post CRUD data
const postCRUD = async(req, res) => {
    let message = await CRUDService.createNewUser(req.body); // Call service
    console.log(message);
    return res.send('Post CRUD to server');
};

// const postCRUD = (req, res) => {
//     return res.render('crud.ejs');
// };



// Function to get data for editing
const getEditCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/updateUser.ejs', {
            data: userData
        });
    } else {
        return res.send('Cannot find user ID');
    }
};

// Function to update CRUD data
const putCRUD = async (req, res) => {
    const data = req.body;
    const data1 = await CRUDService.updateUser(data);
    //return res.send('Post CRUD to server');
    // Update and display user list
    return res.render('users/findAllUsers.ejs',{
        datalist: data1
    });
};

// Function to delete data
const deleteCRUD = async (req, res) => {
    const id = req.query.id; // Query parameter
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!');
    } else {
        return res.send('User not found');
    }
};

export default{
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};
