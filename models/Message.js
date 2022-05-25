// importing dependencies
import mongoose from 'mongoose';

// defining schema
const MessageSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Message must have an author.']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please select a receiver.']
    },
    text: {
        type: String,
        required: true,
        maxlength: [500, 'Text must be less than 500 characters.']
    }
});

// exporting model
export default mongoose.model('Message', MessageSchema);
