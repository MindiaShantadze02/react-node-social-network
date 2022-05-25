// importing dependencies
import express from 'express';

// importing models
import Comment from '../models/Comment.js';

// importing middlewares
import { auth } from '../middleware/auth.js';
import verify from '../middleware/verify.js';

// importing controllers
import {
    getPostComments,
    createPostComment,
    updateComment,
    deleteComment
} from '../controllers/comments.js';

// defining router
const router = express.Router();

// endpoint for getting and creating post comments
router.route('/:postId')
    .get(auth, getPostComments)
    .post(auth, createPostComment);

router.route('/:commentId')
    .put(auth, verify(Comment, 'commentId'), updateComment)
    .delete(auth, verify(Comment, 'commentId'), deleteComment);

// exporting router
export default router;
