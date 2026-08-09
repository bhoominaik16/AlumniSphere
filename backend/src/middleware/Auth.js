const jwt = require('jsonwebtoken')

const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message: 'Unauthorized, JWT Token is required'})
    }
    try {
        const decodedUser = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(401)
        .json({message: 'JWT token is expired or invalid', error})
    }
} 

module.exports = ensureAuthentication;