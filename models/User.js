// importing dependencies
import mongoose from 'mongoose';
import validator from 'validator';

// defining schema
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname.'],
        minlength: [2, 'Firstname must be more than 2 characters long.'],
        maxlength: [255, 'Firstname must be less than 255 characters long.'],
        match: [/^[A-Za-zა-ჰ ]{2,255}$/gi, 'First name should only contain letters and spaces.'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your lastname,'],
        minlength: [2, 'Lastname must be more than 2 characters long.'],
        maxlength: [255, 'Lastname must be less than 255 characters long.'],
        match: [/^[A-Za-zა-ჰ ]{2,255}$/gi, 'Lastname should only contain letters and spaces'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your firstname.'],
        minlength: [2, 'Firstname must be more than 2 characters long.'],
        maxlength: [255, 'Firstname must be less than 255 characters long.'],
        unique: [true, 'User with this email already exists.'],
        trim: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    birthDate: {
        type: Date,
        required: [true, 'Please enter your birth date.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [10, 'Password must contain at least 10 characters'],
        maxlength: [255, 'Password can not contain more than 255 characters']
    },
    photo: {
        type: String
    },
    posts: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    isAdmin: {
        type: Boolean
    }
});

// exporting model
export default mongoose.model('User', UserSchema);
