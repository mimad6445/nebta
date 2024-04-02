const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    fullname: {type:String, required : true},
    gender: {type: String, required:true},
    DateOfBirth: {type: String, required:true},
    height: {type: Number, required:true},
    weight: {type: Number, required:true},
    avatar:{type: String, required:true},
    maladieCronique: {type: Array, required:true},
},{timestamps: true});


module.exports= mongoose.model('client', clientSchema);