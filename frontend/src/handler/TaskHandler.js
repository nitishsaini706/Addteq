import axios from 'axios';

const fetchTasks = async () => {
    try{
        console.log("fetching data");
        const response = await axios.get('http://localhost:3001/tasks');
        return response;
    }catch(e){
        console.log("erorr while fetching lists");
        throw e;
    }
};

const addTask = async (body) => {
    try {
        console.log(body);
        const response = await axios.post('http://localhost:3001/tasks/add' , body);
        return response;
    } catch (e) {
        console.log("erorr while addling taks");
        throw e;
    }
};

const updateTask = async (body) => {
    try {
        const response = await axios.post('http://localhost:3001/tasks/update', body);
        return response;
    } catch (e) {
        console.log("erorr while update task");
        throw e;
    }
};
const deleteTask = async (body) => {
    try {

        const response = await axios.post('http://localhost:3001/tasks/delete',body);
        return response;
    } catch (e) {
        console.log("erorr while delete task");
        throw e;
    }
};

export {addTask , deleteTask,updateTask,fetchTasks};