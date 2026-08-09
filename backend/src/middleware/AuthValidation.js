const Joi = require('joi');
const StudentSchema = require('./StudentValidation');
const AlumniSchema = require('./AlumniValidation');
const facultySchema = require('./FacultyValidation');

const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        role: Joi.string().valid('Alumni', 'Student', 'Faculty').required()
    });

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    const {error: userError} = schema.validate(userData)
    if(userError){
        return res.status(400)
        .json({message: 'Bad request here', userError})
    }

    let roleSchema;

    if(req.body.role === 'Student'){
        roleSchema = StudentSchema
    }
    else if(req.body.role === 'Alumni'){
        roleSchema = AlumniSchema
    }
    else if(req.body.role === 'Faculty'){
        roleSchema = facultySchema
    }

    const roleData = {...req.body}

    delete roleData.name;
    delete roleData.email;
    delete roleData.password;
    delete roleData.role;

    const {error: roleError} = roleSchema.validate(roleData)
    if(roleError){
        return res.status(400)
        .json({message: 'Bad request in role specific details', roleError})
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message: 'Bad request', error})
    }
    next();
}

module.exports = {
    signUpValidation,
    loginValidation
}