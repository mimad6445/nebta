const mongoose = require('mongoose')

const article = new mongoose.Schema({
    titleOfWriter : {type : String,require : true},
    imageOfArticle : {type : String,require : true},
    description : {type : String,require : true},
    link : {type : String,require : true},
    counter : {type : Number,default: 0}
},{timestamps: true});


module.exports= mongoose.model('article', article);