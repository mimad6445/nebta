const {Profile, getMaladieCroniqueCounts} = require("../../model/auth/profile.model");
const productdb =require("../../model/product.model");
const codePromodb = require("../../model/home/CodePromo.model")
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")
const eventEmitter = require("../../utils/eventEmitter");


const createProfile = asyncWrapper(async(req,res,next)=>{
    const {fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique} = req.body;
    const addNewProfile = new Profile({fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique});
    await addNewProfile.save();
    const product = await productdb.find();

    product.forEach(produit => {
        const nocif = produit.ContreIndication.some(maladie => maladieCronique.includes(maladie));
        console.log(produit._id, nocif, produit.ContreIndication, maladieCronique);
        if (nocif) {
            addNewProfile.nocif.push(produit._id);
        } else {
            addNewProfile.recomonde.push(produit._id);
        }
    });
    
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { addNewProfile }});
})


const deleteProfile = asyncWrapper(async(req,res,next)=>{
    const ProfileId = req.params.id;
    const Profile = await Profile.findById(ProfileId);
    if (!Profile) {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "Profile n'exist pas" });
    }
    await Profile.findByIdAndDelete(ProfileId);
    res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Profile deleted successfully' });
})

const getOneProfile = async (req, res) => {
    try {
        const codeId = req.params.id; 
        const code = await Profile.findById(codeId); 
        if (!code) {
            return res.status(404).json({ message: 'Code not found' });
        }

        res.status(200).json(code); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = asyncWrapper(async(req,res,next)=>{
    try {
        const ProfileId = req.params.id;
        const updates = req.body;
        const Profile = await Profile.findByIdAndUpdate(ProfileId, updates, { new: true });

        if (!Profile) {
            return res.status(404).json({ success: httpStatusText.FAIL, message: 'Profile not found' });
        }
        res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Profile updated successfully', data : {Profile} });
    } catch (error) {
        res.status(500).json({ success: httpStatusText.ERROR, message: 'Internal server error' });
    }
})

eventEmitter.on('addProduct',async(id)=>{
    const Users = await Profile.find();
    const produit = await productdb.findById(id);
    Users.forEach((user)=>{
        const nocif = produit.ContreIndication.some(maladie => maladie.includes(maladie));
        if (nocif) {
            addNewProfile.nocif.push(produit._id);
        } else {
            addNewProfile.recomonde.push(produit._id);
        }
        user.save();
    })
})
const Analyst = asyncWrapper(async(req,res,next)=>{
    try{
        const count = await getMaladieCroniqueCounts();
        res.status(200).json({sucess: httpStatusText.SUCCESS,count: count })
    }catch(error){
        res.status(500).json({ success: httpStatusText.ERROR, message: 'Internal server error' });
    }
})

eventEmitter.on('deleteProduct',async(id)=>{
    const Users = await Profile.find();
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
    updateProfile,
    getOneProfile,
    Analyst
  };