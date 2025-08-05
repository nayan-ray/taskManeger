const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const createToken = require("../utilities/token");
const { secret_login_Key, secret_refresh_Key } = require("../secret");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
        try {
        //taken email and password from req.body

        const { email, password } = req.body;
        //find user  by email

        const user = await User.findOne({ email });
        //if user is not found send error response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });

        }

        //compare password

        const isMatch = await bcryptjs.compare(password, user.password);

        //check match 
        if (!isMatch) {

            return res.status(401).json({ message: 'Invalid credentials' });
         
        }
        
   
        // create  token
        const accessToken = createToken({email : user.email}, secret_login_Key, "10m" ) 
          
        //set token in cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 minutes
            secure: false,
            sameSite : "strict"
        })

        //create refresh token
        const refreshToken = createToken({email : user.email}, secret_refresh_Key, "1d" )
        //set refresh token in cookie
        res.cookie("refresh_token", refreshToken, { 
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            secure: false,
            sameSite : "strict"
        })
       
       return res.status(200).json({message: "success", user : {username: user.name, email: user.email, id: user._id}})
        
    } catch (error) {
       return res.status(500).json({ message: 'fail', error: error.message });
    }
  
}


const logoutHandler = (req, res) => {
    try {
        //clear cookies
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        
        return res.status(200).json({message: "success", user : null})
    } catch (error) {
        return res.status(500).json({ message: 'fail', error: error.message });
    }
}

const refreshTokenHandler = (req, res) => {
    try {
        //get refresh token from cookies
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        //verify refresh token
        const userData = jwt.verify(refreshToken, secret_refresh_Key);
        if (!userData) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
       //create new refresh token
        const newRefreshToken = createToken({email : userData.email}, secret_refresh_Key, "1d" );
        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            secure: false,
            sameSite : "strict"
        });
        //create new access token
        const accessToken = createToken({email : userData.email}, secret_login_Key, "10m" );

        //set new access token in cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 minutes
            secure: false,
            sameSite : "strict"
        });

        return res.status(200).json({message: "success" , accessToken});
    } catch (error) {
        return res.status(500).json({ message: 'fail', error: error.message });
    }
}

module.exports = {loginHandler, logoutHandler, refreshTokenHandler};