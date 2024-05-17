const mongoose = require('mongoose')

const Conseille = new mongoose.Schema({
    Conseille : {type : String,require : true}
},{timestamps: true});


module.exports= mongoose.model('Conseille', Conseille);