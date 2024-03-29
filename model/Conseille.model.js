const mongoose = require('mongoose')

const Conseille = new mongoose.Schema({
    id : {type:Number,require: true},
    Conseille : [{type : String,require : true}]
},{timestamps: true});

productSchema.pre('save', async function (next) {
    if (this.isNew) {
        
        const maxIdDoc = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 }).limit(1);
        const maxId = maxIdDoc ? maxIdDoc.id : 0;
        this.id = maxId + 1;
    }
    next();
});

module.exports= mongoose.model('Conseille', Conseille);