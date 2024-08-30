import express from "express"
import userController from "../controller/userController.js"

const route = express.Router();

const initWebRoutes = (app) => {
    route.get('/', (req, res) => {
        return res.send('Nguyễn Hoàng Phương Ngân');
    });

    route.get('/get-crud', userController.getFindAllCrud);
    route.get('/crud', userController.getCRUD);
    route.post('/post-crud', userController.postCRUD);



    app.use('/', route);
};

export default initWebRoutes;

// route.get("/fetch", fetch);

