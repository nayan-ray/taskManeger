const express = require('express');
const { registerUser, updateUSer } = require('../controllers/userController');
const { loginHandler, logoutHandler, refreshTokenHandler } = require('../controllers/authControllers');
const userRouter = express.Router();

//register Route
userRouter.post("/register", registerUser)
userRouter.put("/update/:userId", updateUSer);

//auth route

userRouter.post("/login", loginHandler);
userRouter.get("/logout", logoutHandler);
userRouter.get("/refresh", refreshTokenHandler);


module.exports = userRouter;