const mongoose = require("mongoose");

const MentorshipSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        alumniId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Alumni",
            required: true
        },
        message: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

MentorshipSchema.index(
    { studentId: 1, alumniId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Mentorship", MentorshipSchema);