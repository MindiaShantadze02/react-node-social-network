// importing dependencies
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// importing models
import User from '../models/User.js';

// @desc for registering a new user
// @method POST /api/users/register
export const registerUser = asyncHandler(async (req, res, next) => {
    // hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // creating new user
    await User.create({
        ...req.body,
        password: hashedPassword
    });

    res.status(201).json('User registered successfully');
});

// @desc for logging in user
// @method POST /api/users/login
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // stopping and displaying message if user does not exists
    if (!user) {
        res.status(404);
        throw new Error('Invalid email or password.');
    }

    // checking for password matching
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error('Invalid email or password');
    }

    // signing token and sending cookie to user
    const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res
        .cookie('access_token', token, {
            httpOnly: true
        })
        .status(200).json({ _id: user.id, isAdmin: user.isAdmin });
});

// @desc for getting all users list
// @method GET /api/users
export const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.paginatedResults);
});

// @desc for getting a single user
// @method GET /api/users/:id
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

// @desc for updating an user
// @method PUT /api/users/:id
export const updateUser = asyncHandler(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true
    });
    res.status(201).json(updatedUser);
});

// @desc for deleting an user
// @method delete /api/users/:id
export const deleteUser = asyncHandler(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
});
