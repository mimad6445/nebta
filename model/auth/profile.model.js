const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    fullname: {type:String, required : true},
    relative : {type : String},
    gender: {type: String, required:true},
    DateOfBirth: {type: String, required:true},
    height: {type: Number, required:true},
    weight: {type: Number, required:true},
    avatar:{type: String, required:true},
    maladieCronique: {type: Array, required:true},
    nocif: [{type : mongoose.Types.ObjectId,ref : "product"}],
    recomonde: [{type : mongoose.Types.ObjectId,ref : "product"}],
},{timestamps: true});


module.exports= mongoose.model('Account', clientSchema);