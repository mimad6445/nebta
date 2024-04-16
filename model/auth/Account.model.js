const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    client: {type:mongoose.Types.ObjectId , ref : "Account"},
    email: {type: String, required:true},
    password: {type: String, required:true},
},{timestamps: true});


module.exports= mongoose.model('profile', profileSchema);