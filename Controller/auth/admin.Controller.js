const admindb = require("../../model/auth/admin.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")
const bcrypt = require("bcrypt")

const createAdmin = asyncWrapper(async(req,res,next)=>{
    const {fullname, email , password ,role,avatar} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const addNewAdmin = new admindb({fullname,email,password:hashedPassword,role,avatar});
    await addNewAdmin.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { addNewAdmin } });
})

const login = asyncWrapper(async(req,res,next)=>{
    const {email,password} = req.body;
    const admin = await admindb.findOne({email : email});
    if(!admin){
        res.status(400).json({ status: httpStatusText.FAIL, message: "email n'exist pas" });
    }
    const passwordCompare = await bcrypt.compare(password,admin.password);
    if(!passwordCompare){
        res.status(400).json({ status: httpStatusText.FAIL, message: "password" });
    }
    res.status(200).json({status: httpStatusText.SUCCESS, data: {
        fullname : admin.fullname,
        email : email,
        role : admin.role,
        avatar : admin.avatar
    }})
})

const getAllAdmin = asyncWrapper(async(req,res,next)=>{
    const admins = await admindb.find(); 
    res.status(200).json(admins); 
})

module.exports = {
        createAdmin,
        login,
        getAllAdmin
    };