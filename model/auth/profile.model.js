const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    fullname: {type:String, required : true},
    relative : {type : String},
    gender: {type: String, required:true},
    DateOfBirth: {type: String, required:true},
    height: {type: Number, required:true},
    weight: {type: Number, required:true},
    avatar:{type: String},
    maladieCronique: {type: Array},
    nocif: [{type : mongoose.Types.ObjectId,ref : "product"}],
    recomonde: [{type : mongoose.Types.ObjectId,ref : "product"}],
    CodePromo : [{type : mongoose.Types.ObjectId,ref : "codePromo"}]
},{timestamps: true});


module.exports= mongoose.model('Profile', clientSchema);