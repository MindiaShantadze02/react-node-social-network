// importing dependencies
import express from 'express';

// importing controllers
import {
    registerUser,
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/users.js';

// defining router
const router = express.Router();

// endpoint for getting all users
router.get('/', getUsers);

// endpoint for registering user
router.post('/register', registerUser);

// endpoint for logging in user
router.post('/login', login);

// endpoint for getting, updating and deleting single user
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// exporting router
export default router;
