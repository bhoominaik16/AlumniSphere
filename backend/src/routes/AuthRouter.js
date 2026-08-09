const express = require('express');
const { signUpValidation, loginValidation } = require('../middleware/AuthValidation');
const { signup, login } = require('../controllers/AuthController');
const ensureAuthentication = require('../middleware/Auth');
const { profileData } = require('../controllers/ProfileController');

const router = express.Router();

router.post('/signup', signUpValidation, signup)
router.post('/login', loginValidation, login)
router.get('/profile', ensureAuthentication, profileData)

module.exports = router