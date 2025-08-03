const express = require('express');
const { registerUser, updateUSer } = require('../controllers/userController');
const userRouter = express.Router();

//register Route
userRouter.post("/register", registerUser)
userRouter.put("/update/:userId", updateUSer);





module.exports = userRouter;