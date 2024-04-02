const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    client: {type:mongoose.Types.ObjectId , ref : "client"},
    email: {type: String, required:true},
    password: {type: String, required:true},
},{timestamps: true});


module.exports= mongoose.model('profile', clientSchema);