const Joi = require('joi');

const facultySchema = Joi.object({
    department: Joi.string().required(),
    designation: Joi.string().required(),
    specialization: Joi.string().allow('').default(''),
    researchInterests: Joi.array().items(Joi.string()).default([]),
    experience: Joi.number().min(0).default(0),
    linkedIn: Joi.string().allow('').default(''),
    bio: Joi.string().allow('').default(''),
    profilePicture: Joi.string().allow('').default('')
});

module.exports = facultySchema;