// importing dependencies
import asyncHandler from 'express-async-handler';

// importing models
import Comment from '../models/Comment.js';

// @desc function for getting post comments
// @method GET /api/comments/:postId
export const getPostComments = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
});

// @desc function for creating post comment
// @method POST /api/comments/:postId
export const createPostComment = asyncHandler(async (req, res, next) => {
    const newComment = await Comment.create({
        ...req.body,
        userId: req.user.id,
        postId: req.params.postId
    });
    res.status(201).json(newComment);
});

// @desc function for updating post comment
// @method PUT /api/comments/:commentId
export const updateComment = asyncHandler(async (req, res, next) => {
    const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { runValidators: true }
    );
    res.status(201).json(updatedComment);
});

// @desc function for deleting comment
// @method DELETE /api/comments/:commentId
export const deleteComment = asyncHandler(async (req, res, next) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    res.status(201).json(deleteComment);
});
