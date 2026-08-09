const { message } = require("../middleware/StudentValidation");
const AlumniModel = require("../models/AlumniModel");
const FacultyModel = require("../models/FacultyModel");
const StudentModel = require("../models/StudentModel");
const UserModel = require("../models/UserModel")

const profileData = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404)
            .json({message: 'User not found'})
        }

        let profile;
        if(user.role === 'Student'){
            profile = await StudentModel.findOne({
                userId: user._id
            })
        }
        else if(user.role === 'Alumni'){
            profile = await AlumniModel.findOne({
                userId: user._id
            })
        }
        else if(user.role === 'Faculty'){
            profile = await FacultyModel.findOne({
                userId: user._id
            })
        }
        if(!profile){
            return res.status(404)
            .json({message: 'User not found'})
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            profile
        });

    } catch (error) {
        res.status(500)
        .json({
            message: 'Internal Server error', error,
            success: true
        })
    }
}

module.exports = {profileData}