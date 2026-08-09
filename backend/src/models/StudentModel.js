const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    department:{
        type: String,
        required: true
    },
    graduationYear:{
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    linkedIn: {
        type: String,
        default: ''
    },
    gitHub: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    resume: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Student', StudentSchema)