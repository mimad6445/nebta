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
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { addNewProfile }});
})


const deleteProfile = asyncWrapper(async(req,res,next)=>{
    const ProfileId = req.params.id;
    const Profile = await Profiledb.findById(ProfileId);
    if (!Profile) {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "Profile n'exist pas" });
    }
    await Profiledb.findByIdAndDelete(ProfileId);
    res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Profile deleted successfully' });
})

const updateProfile = asyncWrapper(async(req,res,next)=>{
    try {
        const ProfileId = req.params.id;
        const updates = req.body;
        const Profile = await Profiledb.findByIdAndUpdate(ProfileId, updates, { new: true });

        if (!Profile) {
            return res.status(404).json({ success: httpStatusText.FAIL, message: 'Profile not found' });
        }
        res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Profile updated successfully', data : {Profile} });
    } catch (error) {
        res.status(500).json({ success: httpStatusText.ERROR, message: 'Internal server error' });
    }
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
    createProfile,
    deleteProfile,
    updateProfile
  };