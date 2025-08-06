const { findOne } = require("../models/taskModel");
const jwt = require('jsonwebtoken');
const { secret_login_Key } = require("../secret");
const User = require("../models/userModel");

const authMiddleware = async(req, res, next)=>{
    try {
        //take access token from cookies
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            return res.status(401).json({ message: 'No access token provided' });
        }
        //verify the token
        const userData = jwt.verify(accessToken, secret_login_Key);
        if (!userData) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        //check if user exists in database
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
       
        //attach user data to request object
        req.userEmail = user.email;
       
        next();
    } catch (error) {
        return res.status(500).json({ message: 'fail', error: error.message });
        
    }

}

module.exports = { authMiddleware };