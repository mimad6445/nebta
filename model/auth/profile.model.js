const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    fullname: {type:String, required : true},
    relative : {type : String},
    gender: {type: String, required:true},
    DateOfBirth: {type: String, required:true},
    height: {type: Number, required:true},
    weight: {type: Number, required:true},
    avatar:{type: String},
    maladieCronique: {type: Array},
    nocif: [{type : mongoose.Types.ObjectId,ref : "product"}],
    recomonde: [{type : mongoose.Types.ObjectId,ref : "product"}]
},{timestamps: true});

const Profile = mongoose.model('Profile', clientSchema);
async function getMaladieCroniqueCounts() {
    try {
        console.log("1");
        const result = await Profile.aggregate([
            { $unwind: "$maladieCronique" },
            { $group: { _id: "$maladieCronique", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        return result; 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    Profile,
    getMaladieCroniqueCounts
};