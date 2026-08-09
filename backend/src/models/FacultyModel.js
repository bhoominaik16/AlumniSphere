const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        default: ''
    },
    researchInterests: {
        type: [String],
        default: []
    },
    experience: {
        type: Number,
        default: 0
    },
    linkedIn: {
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
    }
})

module.exports = mongoose.model('Faculty', FacultySchema)