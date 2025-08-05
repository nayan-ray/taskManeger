const { secret_login_Key } = require("../secret");

const authMiddleware = (req, res, next)=>{
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

        //attach user data to request object
        req.user.email = userData.email;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'fail', error: error.message });
        
    }

}

module.exports = { authMiddleware };