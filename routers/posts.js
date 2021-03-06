// importing dependencies
import express from 'express';

import Post from '../models/Post.js';

// importing middlewares
import {
    auth
} from '../middleware/auth.js';
import verify from '../middleware/verify.js';

// importing controllers
import {
    getPosts,
    createPost,
    getUsersPosts,
    getPost,
    getPostsByCategory,
    updatePost,
    deletePost
} from '../controllers/posts.js';

// defining router
const router = express.Router();

// route for getting all posts
router.get('/', auth, getPosts);

// route for creating a post
router.post('/', auth, createPost);

// routes for one persons posts
router.get('/:userId', auth, getUsersPosts);

// getting posts by category
router.get('/:category', auth, getPostsByCategory);

// getting single post
router.get('/:postId', auth, getPost);

// crud operations on logged in users posts
router.route('/:postId')
    .put(auth, verify(Post, 'postId'), updatePost)
    .delete(auth, verify(Post, 'postId'), deletePost);

// exporting router
export default router;
