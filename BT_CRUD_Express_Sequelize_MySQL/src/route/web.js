import express from 'express';
import homeController from '../controller/homeController.js';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('Nguyễn Hoàng Phương Ngân');
    });

    router.get('/home', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCrud);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    app.use('/', router);
};

export default initWebRoutes;
