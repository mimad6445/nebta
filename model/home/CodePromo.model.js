const mongoose = require('mongoose')

const codePromo = new mongoose.Schema({
    code : {type : String,require : true},
    Image : {type : String,require : true},
    discount: {type : Number,require : true}
},{timestamps: true});


module.exports= mongoose.model('codePromo', codePromo);