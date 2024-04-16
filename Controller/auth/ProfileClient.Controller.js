const Profiledb = require("../../model/auth/profile.model");
const productdb =require("../../model/product.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")

const createProfile = asyncWrapper(async(req,res,next)=>{
    const {fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique} = req.body;
    const addNewProfile = new Profiledb({fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique});
    await addNewProfile.save();
    const product = await productdb.find();
    console.log("product :" ,product);

    product.forEach(produit => {
        const recomonde = produit.Indication.some(maladie => maladieCronique.includes(maladie));
        if (recomonde) {
            addNewProfile.recomonde.push(produit._id);
        } else {
            addNewProfile.nocif.push(produit._id);
        }
    });
    addNewProfile.save()
    console.log("Profile : ",addNewProfile);
})


module.exports = {
    createProfile
  };