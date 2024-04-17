const mongoose = require('mongoose')

const Conseille = new mongoose.Schema({
    id : {type:Number,require: true},
    Conseille : {type : String,require : true}
},{timestamps: true});


module.exports= mongoose.model('Conseille', Conseille);