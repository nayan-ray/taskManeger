const Task = require("../models/taskModel");



//create new task
const createTaskHandler = async (req, res) => {
    try {
        const { title, description, status} = req.body;

        const userEmail = req.userEmail;
       
         // Assuming user email is available in req.user
        // Create a new task
        const newTask = new Task({
            title,
            description,
            status,
            userEmail
        });

        // Save the task to the database
        await newTask.save();

        // Respond with the created task
        res.status(200).json({message : 'success', task: newTask});
    } catch (error) {
      
        res.status(500).json({ message: 'fail', data: error.message });
    }
}

//update task
const updateTaskHandler = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userEmail = req.userEmail;
     
        const taskData = {};

        if (req.body.title) {
            taskData.title = req.body.title;
        }

        if (req.body.description) {
            taskData.description = req.body.description;
        }
        if (req.body.status) {
            taskData.status = req.body.status;
        }
   
      
      
        
        // Find the task by ID, userEmail and update it
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userEmail },
            taskData,
            { new: true }
        );



        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not updated' });
        }



        res.status(200).json({ message: 'success', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'fail', data: error.message });
    }
}

//delete handler
const deleteTaskHandler = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userEmail = req.userEmail;
        //check if task is present or not
        const task = await Task.findOne({ _id: taskId, userEmail });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Find the task by ID and userEmail and delete it
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userEmail });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not deleted' });
        }

        res.status(200).json({ message: 'success', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'fail', data: error.message });
    }
}

//get specific task
const getTaskHandler = async (req, res) => {
    try {
        const { status } = req.params;
        const userEmail = req.userEmail;

        // Find the task by ID and userEmail
        const task = await Task.find({ status, userEmail });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'success', task });
    } catch (error) {
        res.status(500).json({ message: 'fail', data: error.message });
    }
}


module.exports = { createTaskHandler, updateTaskHandler , deleteTaskHandler, getTaskHandler };