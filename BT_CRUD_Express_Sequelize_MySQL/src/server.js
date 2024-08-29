import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from './route/web.js';
import  connectDB  from './config/configdb.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 6969;
app.listen(port, ()=>{
    console.log("Backend Nodejs is running on the port: " + port)
})