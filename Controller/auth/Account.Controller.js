const clientdb = require("../../model/auth/client.model")
const Accountdb = require("../../model/auth/client.model")
const asyncWrapper = require("../../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");


const registerAccount = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const addNewAccount = new Accountdb({email,password:hashedPassword});
    await addNewAccount.save();
    const product = await Accountdb.find();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { addNewAccount }});
})
const registerProfile = asyncWrapper(async(req,res)=>{  
    const AccountId = req.params.id;
    const { profileId} = req.body;
    const Account = await Accountdb.findById(AccountId)
    Account.profile.push(profileId);
    Account.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { Account }});
})


const login = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body;
    const Account = await Accountdb.findOne({email : email});
    if(!Account){
        res.status(404).json({ status: httpStatusText.FAIL, message: "email n'exist pas" });
    }
    const passwordCompare = await bcrypt.compare(password,Account.password);
    if(!passwordCompare){
        res.status(404).json({ status: httpStatusText.FAIL, message: "password" });
    }
    res.status(200).json({status: httpStatusText.SUCCESS, data: {
        profile : Account.profile,
        email : email,
    }})
})




module.exports = {
    registerAccount,
    registerProfile,
    login
}