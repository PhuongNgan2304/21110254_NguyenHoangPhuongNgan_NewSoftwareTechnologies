import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./src/routes/userRoute.js"
import viewEngine from "./src/config/viewEngine.js"


const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
viewEngine(app);
route(app);

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connnected successful.")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>console.log(error))



// app.use("/", route);