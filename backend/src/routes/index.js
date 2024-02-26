const express =require("express");
const router = express.Router();
const tasksController = require("../controller/tasksController")


router.get('/tasks', tasksController.tasksList);

router.post('/tasks/add', tasksController.addTask);

router.post('/tasks/update', tasksController.updateTask);

router.post('/tasks/delete', tasksController.deleteTask);


module.exports = {router}