const mongoose = require('mongoose');


// Define the Task schema properties title, description, status, and userEmail
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled','new'],
        default: 'pending'
    },
    userEmail: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false }
);       


// Create the Task model using the taskSchema
const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;