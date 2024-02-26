const TaskModel = require("../model/tasksModel")
let tasks = [];


// function to get list of tasks created
const tasksList = async (req, res) => {
    try{
        // initially I set up local mongo db for this task
        // const list = await TaskModel.find({isDeleted:false});
        
        // return res.status(200).json(list);
        return res.json(tasks);
    }catch(e){
        console.log("eror while getting tasks",e);
        throw e;
    }
};


const addTask = async (req, res) => {
    try{
        
        
        const task = { id: tasks.length + 1, ...req.body };
        tasks.push(task);
        // const title = req.body.title;
        // const tasks = new TaskModel({
        //     title:title
        // })
        // await tasks.save();
        return res.status(201).send({ message: "Successfully Added tasks", data: tasks });
    }catch(e){
        console.log("eror while adding task", e);
        throw e;
    }
   
};

const updateTask = async(req, res) => {
    try{
        const {id,title} = req.body;
        const index = tasks.findIndex(task => task.id === parseInt(id));
        
        // const index = await TaskModel.findById(id);

        if (index >=0) {
            // await TaskModel.updateOne({ _id: id }, { $set: { title: title }} );
            tasks[index] = { ...tasks[index], ...req.body };
            return res.status(201).send({ message: "Task updated successfully", data: tasks })
        } else {
            return res.status(404).send({ message: 'Task not found' });
        }
    }catch(e){
        console.log("eror while updating task", e);
        throw e;
    }
    
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        const index = tasks.findIndex(task => task.id === parseInt(id));

        // const index = await TaskModel.findById(id);

        if (index >=0) {
            // await TaskModel.updateOne({ _id: id }, { $set: { isDeleted: false } });
            tasks = tasks.filter(task => task.id !== parseInt(id));

            return res.status(201).send({ message: "Task delete successfully", data: tasks })
        } else {
            return res.status(404).send({ message: 'Task not found' });
        }
    } catch (e) {
        console.log("eror while deleting task", e);
        throw e;
    }
}

module.exports = {deleteTask,addTask,tasksList,updateTask}