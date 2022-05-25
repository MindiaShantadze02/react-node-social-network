// importing dependencies
import express from 'express';

// importing middlewares
import {
    auth,
    verifyUser,
    isAdmin
} from '../middleware/auth.js';

// importing controllers
import {
    registerUser,
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/users.js';

// importing models
import User from '../models/User.js';

// importing middleware
import paginatedResults from '../middleware/pagination.js';

// defining router
const router = express.Router(User);

// endpoint for getting all users
router.get('/', auth, isAdmin, paginatedResults(User), getUsers);

// endpoint for registering user
router.post('/register', registerUser);

// endpoint for logging in user
router.post('/login', login);

// endpoint for getting, updating and deleting single user
router.route('/:id')
    .get(auth, getUser)
    .put(auth, verifyUser, updateUser)
    .delete(verifyUser, deleteUser);

// exporting router
export default router;
