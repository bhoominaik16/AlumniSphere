const mongoose = require('mongoose')

const AlumniSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    currentCompany: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    currentLocation: {
        type: String,
        default: ''
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
    isMentor: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Alumni', AlumniSchema)