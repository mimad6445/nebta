const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    profile: [{type:mongoose.Types.ObjectId , ref : "Account"}],
    email: {type: String, required:true},
    password: {type: String, required:true},
},{timestamps: true});


module.exports= mongoose.model('Account', profileSchema);