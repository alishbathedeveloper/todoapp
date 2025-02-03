// Import the express library
const express = require('express');
// Import the cors library
const cors = require('cors');

// Create an app using express
const app = express();

// Use cors to allow communication between frontend and backend
app.use(cors());

// Allow the server to understand JSON data
app.use(express.json());

// Create a list to store tasks (in memory)
let tasks = [];

// Create a route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks); // Send the tasks list as a response
});

// Create a route to add a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body.task; // Get the task from the request body
  tasks.push({ id: tasks.length + 1, task: newTask, completed: false }); // Add the task to the list
  res.json({ message: 'Task added!' }); // Send a success message
});

// Create a route to mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id); // Get the task ID from the URL
  const task = tasks.find((t) => t.id === taskId); // Find the task in the list
  if (task) {
    task.completed = true; // Mark the task as completed
    res.json({ message: 'Task completed!' }); // Send a success message
  } else {
    res.status(404).json({ message: 'Task not found!' }); // Send an error message
  }
});

// Create a route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id); // Get the task ID from the URL
  tasks = tasks.filter((t) => t.id !== taskId); // Remove the task from the list
  res.json({ message: 'Task deleted!' }); // Send a success message
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});