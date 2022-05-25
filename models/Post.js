// importing dependencies
import mongoose from 'mongoose';

// defining schema
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Post must belong to an user.'],
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please enter text'],
        maxlength: [1500, 'Text must be less than 1500 characters long.']
    },
    category: {
        type: String,
        default: 'No Category'
    },
    image: {
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String]
    }
});

// exporting model
export default mongoose.model('Post', PostSchema);
