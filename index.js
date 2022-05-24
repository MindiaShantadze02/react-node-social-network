// importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

// env variables
dotenv.config({});

// defining app
const app = express();

// using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// stop script and display message if the port is not defined
if (!process.env.PORT) throw new Error('Port is not defined.');

// function for connecting to the database
const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

// listening to the server & connecting to database
app.listen(process.env.PORT, () => {
    connectDB();
});
