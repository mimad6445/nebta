const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Image: {type:String, required : true},
    ProductName: {type: String, required:true},
    ProductScientificName: {type: String, required:true},
    ProductArabicName: {type: String, required:true},
    Productdesc: {type: String, required:true},
    stock:{type: Number, required:true},
    Price: {type: Number, required:true},
    PromotionPrice:{type: Number, required:false},
    Promotion:{type: Boolean, default: false},
    Indication: {type: Array, required:true},
    ContreIndication: {type: Array, required:true},
    Propriete: {type: String, required:true},
    ModeUtilisation: {type: String, required:true},
    Precaution: {type: String, required:true},
    aromatherapie:{type: Boolean, default: false},
    epicerie:{type: Boolean, default: false},
    LikedBy:{type: Number, default: 0},
},{timestamps: true});

module.exports= mongoose.model('product', productSchema);