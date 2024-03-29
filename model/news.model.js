const mongoose = require('mongoose')

const news = new mongoose.Schema({
    Image : {type : String,require : true}
},{timestamps: true});


module.exports= mongoose.model('news', news);