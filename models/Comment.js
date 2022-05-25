// importing dependencies
import mongoose from 'mongoose';

// defining schema
const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Comment must have an author'],
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Comment must be attached to a post'],
        ref: 'Post'
    },
    text: {
        type: String,
        required: [true, 'Text is required.'],
        maxlength: [500, 'Comment is too long.']
    },
    likeCount: {
        type: Number,
        default: 0
    }
});

// exporting model
export default mongoose.model('Comment', CommentSchema);
