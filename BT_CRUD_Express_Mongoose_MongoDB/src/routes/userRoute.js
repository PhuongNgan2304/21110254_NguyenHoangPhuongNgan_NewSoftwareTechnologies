import express from "express"
import userController from "../controller/userController.js"

const route = express.Router();

const initWebRoutes = (app) => {
    route.get('/', (req, res) => {
        return res.send('Nguyễn Hoàng Phương Ngân');
    });

    route.get('/home', userController.getHomePage);
    route.get('/about', userController.getAboutPage);

    route.get('/crud', userController.getCRUD);
    route.post('/post-crud', userController.postCRUD);
    route.get('/get-crud', userController.getFindAllCrud);
    route.get('/edit-crud', userController.getEditCRUD);
    route.post('/put-crud', userController.putCRUD);
    route.get('/delete-crud', userController.deleteCRUD);
    app.use('/', route);
};

export default initWebRoutes;

// route.get("/fetch", fetch);

