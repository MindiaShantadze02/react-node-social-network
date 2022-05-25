// importing dependencies
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// authorization middleware
export const auth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(401);
        throw new Error('You are not authorized');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403);
            throw new Error('Token is not valid');
        }

        req.user = user;
        next();
    });
});

// middleware for verifying user
export const verifyUser = asyncHandler(async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else {
        res.status(403);
        throw new Error('You are not authorized.');
    }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.isAdmin) next();
    else {
        throw new Error('You are not authorized.');
    }
});
