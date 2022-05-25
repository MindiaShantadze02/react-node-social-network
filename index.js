// importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import cookieParser from 'cookie-parser';

// importing routers
import userRouter from './routers/users.js';
import postsRouter from './routers/posts.js';
import commentsRouter from './routers/comments.js';
import errorHandler from './middleware/errorHandler.js';

// env variables
dotenv.config({});

// defining app
const app = express();

// using middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// using routers
app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// middleware for handling errors
app.use(errorHandler);

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
