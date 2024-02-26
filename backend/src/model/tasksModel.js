const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{type:String,default:""},
    isDeleted:{type:Boolean,default:false},

}, { timestamps:true})

global.taskSchema = global.taskSchema || mongoose.model('TaskModel', taskSchema);
module.exports = global.taskSchema;