// importing dependencies
import asyncHandler from 'express-async-handler';

// importing models
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// @desc function for getting all posts
// @method GET /api/posts
export const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

// @desc for creating a new post
// @method POST /api/posts
export const createPost = asyncHandler(async (req, res, next) => {
    const newPost = await Post.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newPost);
});

// @desc function for getting users posts
// @method GET /api/posts/:userId
export const getUsersPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
});

// @desc function for getting posts by category
// @method GET /api/posts/:category
export const getPostsByCategory = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({ category: req.params.category });
    res.status(200).json(posts);
});

// @desc function for getting a single post
// @method GET /api/posts/:postId
export const getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
});

// @desc function for updating a post
// @method PUT /api/posts/:postId
export const updatePost = asyncHandler(async (req, res, next) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
        runValidators: true
    });
    res.status(201).json(updatedPost);
});

// @desc function for deleting a post
// @method DELETE /api/posts/:postId
export const deletePost = asyncHandler(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ userId: req.user.id, postId: req.params.postId });
    res.status(201).json(deletedPost);
});
