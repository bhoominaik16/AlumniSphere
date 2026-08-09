const MentorshipModel = require("../models/MentorshipModel");
const StudentModel = require("../models/StudentModel");
const AlumniModel = require("../models/AlumniModel");

const getMentors = async (req, res) => {
    try {
        const mentors = await AlumniModel.find({
            isMentor: true
        }).select("-__v");

        return res.status(200).json({
            success: true,
            mentors
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

const sendMentorshipRequest = async (req, res) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                message: "Only students can send mentorship requests",
                success: false
            });
        }

        const { alumniId, message } = req.body;

        const student = await StudentModel.findOne({
            userId: req.user._id
        });

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found",
                success: false
            });
        }

        const alumni = await AlumniModel.findById(alumniId);

        if (!alumni) {
            return res.status(404).json({
                message: "Alumni not found",
                success: false
            });
        }

        if (!alumni.isMentor) {
            return res.status(400).json({
                message: "This alumni is not currently accepting mentorship requests",
                success: false
            });
        }

        const existingRequest = await MentorshipModel.findOne({
            studentId: student._id,
            alumniId: alumni._id
        });

        if (existingRequest) {
            return res.status(409).json({
                message: "Mentorship request already exists",
                success: false
            });
        }

        const request = await MentorshipModel.create({
            studentId: student._id,
            alumniId: alumni._id,
            message
        });

        return res.status(201).json({
            message: "Mentorship request sent successfully",
            success: true,
            request
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

const getMyRequests = async (req, res) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                message: "Only students can access their mentorship requests",
                success: false
            });
        }

        const student = await StudentModel.findOne({
            userId: req.user._id
        });

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found",
                success: false
            });
        }

        const requests = await MentorshipModel.find({
            studentId: student._id
        })
            .populate({
                path: "alumniId",
                populate: {
                    path: "userId",
                    select: "name email"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

const getReceivedRequests = async (req, res) => {
    try {
        if (req.user.role !== "Alumni") {
            return res.status(403).json({
                message: "Only alumni can access received mentorship requests",
                success: false
            });
        }

        const alumni = await AlumniModel.findOne({
            userId: req.user._id
        });

        if (!alumni) {
            return res.status(404).json({
                message: "Alumni profile not found",
                success: false
            });
        }

        const requests = await MentorshipModel.find({
            alumniId: alumni._id
        })
            .populate({
                path: "studentId",
                populate: {
                    path: "userId",
                    select: "name email"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

const updateMentorshipRequest = async (req, res) => {
    try {
        if (req.user.role !== "Alumni") {
            return res.status(403).json({
                message: "Only alumni can update mentorship requests",
                success: false
            });
        }

        const { status } = req.body;

        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            });
        }

        const alumni = await AlumniModel.findOne({
            userId: req.user._id
        });

        if (!alumni) {
            return res.status(404).json({
                message: "Alumni profile not found",
                success: false
            });
        }

        const request = await MentorshipModel.findOne({
            _id: req.params.id,
            alumniId: alumni._id
        });

        if (!request) {
            return res.status(404).json({
                message: "Mentorship request not found",
                success: false
            });
        }

        request.status = status;
        await request.save();

        return res.status(200).json({
            message: `Mentorship request ${status.toLowerCase()}`,
            success: true,
            request
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

module.exports = {
    getMentors,
    sendMentorshipRequest,
    getMyRequests,
    getReceivedRequests,
    updateMentorshipRequest
};