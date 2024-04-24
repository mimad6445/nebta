const Accountdb = require("../../model/auth/Account.model")
const asyncWrapper = require("../../middleware/asyncWrapper");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const httpStatusText = require("../../utils/httpStatusText")
const codePromodb = require("../../model/home/CodePromo.model")
const eventEmitter = require("../../utils/eventEmitter")

const registerAccount = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const existingEmail = await Accountdb.findOne({ email });
        if(existingEmail){
            res.status(400).json({ status: httpStatusText.SUCCESS, mesg: "E-mail already exists"});
        }
    const addNewAccount = new Accountdb({email,password:hashedPassword});
    const CodePromo = await codePromodb.find();
    addNewAccount.CodePromo = CodePromo;
    const token = await generateToken({ email:email , id: addNewAccount._id })
    addNewAccount.token = token;
    await addNewAccount.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { addNewAccount }});
})


const addProfile = asyncWrapper(async(req,res)=>{  
    const AccountId = req.params.id;
    const { profileId} = req.body;
    const Account = await Accountdb.findById(AccountId)
    Account.profile.push(profileId);
    Account.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { Account }});
})

const removeCodePromo = asyncWrapper(async(req,res)=>{
    const AccountId = req.params.id;
    const { CodePromoId} = req.body;
    const Account = await Accountdb.findById(AccountId);
    if (!Account) {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "Account n'exist pas" });
    }
    Account.CodePromo.forEach((code)=>{
        if(code === CodePromoId){
            code.CodePromo.pop(CodePromoId);
        }
        Account.save();
    })

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
    const token = await generateToken({email: email , id: Account._id})
    res.status(200).json({status: httpStatusText.SUCCESS, data: {
        profile : Account.profile,
        email : email,
        token : token
    }})
})

const deleteAccount = asyncWrapper(async(req,res,next)=>{
    const AccountId = req.params.id;
    const Account = await Accountdb.findById(AccountId);
    if (!Account) {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "Account n'exist pas" });
    }
    await Accountdb.findByIdAndDelete(AccountId);
    res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Account deleted successfully' });
})

const updateAccount = asyncWrapper(async(req,res,next)=>{
    try {
        const AccountId = req.params.id;
        const updates = req.body;
        const Account = await Accountdb.findByIdAndUpdate(AccountId, updates, { new: true });

        if (!Account) {
            return res.status(404).json({ success: httpStatusText.FAIL, message: 'Account not found' });
        }
        res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Account updated successfully', data : {Account} });
    } catch (error) {
        res.status(500).json({ success: httpStatusText.ERROR, message: 'Internal server error' });
    }
})

eventEmitter.on('deleteCode',async(id)=>{
    const Users = await Accountdb.find();
    const CodePromo = await codePromodb.findById(id);
    Users.forEach((user)=>{
        user.CodePromo.pop(CodePromo);
        user.save();
    })
})

eventEmitter.on('updateCode',async(id)=>{
    const Users = await Accountdb.find();
    const CodePromo = await codePromodb.findById(id);
    Users.forEach((user)=>{
        user.CodePromo.pop(CodePromo);
        user.CodePromo.push(CodePromo);
        user.save();
    })
})

eventEmitter.on('addCodePromo',async(CodePromo)=>{
    const Users = await Accountdb.find();
    Users.forEach((user)=>{
        user.CodePromo.push(CodePromo);
        user.save();
    })
})


module.exports = {
    registerAccount,
    addProfile,
    login,
    updateAccount,
    deleteAccount,
    removeCodePromo
}