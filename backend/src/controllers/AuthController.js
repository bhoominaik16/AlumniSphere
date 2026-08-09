const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
const StudentModel = require("../models/StudentModel");
const AlumniModel = require("../models/AlumniModel");
const FacultyModel = require("../models/FacultyModel");

const signup = async (req, res) => {
    try {
        const {name, email, password, role, department, graduationYear, skills, interests, linkedIn, gitHub, bio, profilePicture, resume, designation, specialization, researchInterests, experience, currentCompany, jobTitle, currentLocation, isMentor} = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409)
                .json({message: 'User exists', success:false})
        }
        const userModel = new UserModel({name, email, password, role})
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();

        if(role=== "Student"){
            await StudentModel.create({
                userId: userModel._id,
                department,
                graduationYear,
                skills,
                interests,
                linkedIn,
                gitHub,
                bio,
                profilePicture,
                resume
            })
        }
        else if(role=== "Alumni"){
            await AlumniModel.create({
                userId: userModel._id,
                department,
                graduationYear,
                currentCompany,
                jobTitle,
                experience,
                skills,
                interests,
                currentLocation,
                linkedIn,
                gitHub,
                bio,
                profilePicture,
                isMentor
            })
        }
        else if(role=== "Faculty"){
            await FacultyModel.create({
                userId: userModel._id,
                department,
                designation,
                specialization,
                researchInterests,
                experience,
                linkedIn,
                bio,
                profilePicture
            })
        }
        res.status(201)
        .json({message: 'User created',
            success:true
        })
    } catch (error) {
        res.status(500)
        .json({
            message: 'Internal Server error', error,
            success: true
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        const errorMsg = 'Authentication failed wrong email or password'
        if(!user){
            return res.status(403)
            .json({message: errorMsg, err, success:false})
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(403)
            .json({message: errorMsg, err, success:false})
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.status(200)
            .json({
                message:'Login Success',
                success: true,
                jwtToken,
                _id: user._id,
                email,
                name: user.name,
                role: user.role
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal server error', err,
                success: true
            })
    }
}

module.exports = {
    signup,
    login
}