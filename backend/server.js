import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/hazardRoute.js';
import cors from 'cors'

dotenv.config()
const app=express();
app.use(json());
app.use(cors())
app.use('/api',router)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected To MongoDb Server")
}).catch(err=>console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
