const Joi = require("joi");

const AlumniSchema = Joi.object({
    department: Joi.string().min(2).max(50).required(),
    graduationYear: Joi.number().required(),
    currentCompany: Joi.string().required(),
    jobTitle: Joi.string().required(),
    experience: Joi.number().min(0).default(0),
    skills: Joi.array().items(Joi.string()).default([]),
    interests: Joi.array().items(Joi.string()).default([]),
    currentLocation: Joi.string().allow('').default(''),
    linkedIn: Joi.string().allow('').default(''),
    gitHub: Joi.string().allow('').default(''),
    bio: Joi.string().allow('').default(''),
    profilePicture: Joi.string().allow('').default(''),
    isMentor: Joi.boolean().default(false),
})

module.exports = AlumniSchema;