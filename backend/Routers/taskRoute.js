const { createTaskHandler, updateTaskHandler, deleteTaskHandler, getTaskHandler, getSummaryHandler } = require('../controllers/taskcontroller');
const { authMiddleware } = require('../middlewares/authMiddleware');

const taskRouter = require('express').Router();

taskRouter.post("/create", authMiddleware, createTaskHandler)
taskRouter.put("/update/:taskId", authMiddleware, updateTaskHandler);
taskRouter.delete("/delete/:taskId", authMiddleware, deleteTaskHandler);
taskRouter.get("/find/:status", authMiddleware, getTaskHandler);
taskRouter.get("/summary", authMiddleware, getSummaryHandler);

module.exports = taskRouter;