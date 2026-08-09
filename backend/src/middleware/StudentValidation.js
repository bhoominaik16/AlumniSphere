const Joi = require("joi");


const StudentSchema =  Joi.object({
    department: Joi.string().min(1).max(50).required(),
    graduationYear: Joi.number().required(),
    skills: Joi.array().items(Joi.string()).default([]),
    interests: Joi.array().items(Joi.string()).default([]),
    linkedIn: Joi.string().allow('').default(''),
    gitHub: Joi.string().allow('').default(''),
    bio: Joi.string().allow('').default(''),
    profilePicture: Joi.string().allow('').default(''),
    resume: Joi.string().allow('').default('')
})

module.exports = StudentSchema