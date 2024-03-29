const mongoose = require('mongoose')

const offrePromotionSchema = new mongoose.Schema({
    titre : {type : String},
    Image : {type : String,require : true}
},{timestamps: true});


module.exports= mongoose.model('offrePromotion', offrePromotionSchema);