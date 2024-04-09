const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullname: {type:String, required : true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: Number, required:true},
    avatar:{type: String, required:true},
},{timestamps: true});


module.exports= mongoose.model('admin', adminSchema);