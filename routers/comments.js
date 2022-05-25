// importing dependencies
import express from 'express';

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
    .get(getPostComments)
    .post(createPostComment);

router.route('/:commentId')
    .put(updateComment)
    .delete(deleteComment);

// exporting router
export default router;
