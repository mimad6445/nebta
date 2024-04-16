const Profiledb = require("../../model/auth/profile.model");
const productdb =require("../../model/product.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")
const eventEmitter = require("../../utils/eventEmitter");


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


eventEmitter.on('addProduct',async(id)=>{
    const Users = await Profiledb.find();
    const produit = await productdb.findById(id);
    Users.forEach((user)=>{
        const recomonde = produit.Indication.some(maladie => user.maladieCronique.includes(maladie))
        if (recomonde) {
            user.recomonde.push(id);
        } else {
            user.nocif.push(id);
        }
        user.save();
    })
})

eventEmitter.on('deleteProduct',async(id)=>{
    const Users = await Profiledb.find();
    const produit = await productdb.findById(id);
    Users.forEach((user)=>{
        user.recomonde.forEach((productToDelete)=>{
            if(productToDelete._id === id){
                user.recomonde.pop(productToDelete)
                
            }
        });
        user.nocif.forEach((productToDelete)=>{
            if(productToDelete._id === id){
                user.nocif.pop(productToDelete)
            }
        })
    })
})

eventEmitter.on('updateProduct',async(id)=>{
    eventEmitter.emit('deleteProduct',id);
    eventEmitter.emit('addProduct',id);
})

module.exports = {
    createProfile
  };