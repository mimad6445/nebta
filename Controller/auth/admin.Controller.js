const admindb = require("../../model/auth/admin.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")
const bcrypt = require("bcryptjs")

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
        res.status(404).json({ status: httpStatusText.FAIL, message: "email n'exist pas" });
    }
    const passwordCompare = await bcrypt.compare(password,admin.password);
    if(!passwordCompare){
        res.status(404).json({ status: httpStatusText.FAIL, message: "password" });
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

const deleteAdmin = asyncWrapper(async(req,res,next)=>{
    const adminId = req.params.id;
    const admin = await admindb.findById(adminId);
    if (!admin) {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "admin n'exist pas" });
    }
    await admindb.findByIdAndDelete(adminId);
    res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Admin deleted successfully' });
})

const updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const updates = req.body;
        const admin = await admindb.findByIdAndUpdate(adminId, updates, { new: true });

        if (!admin) {
            return res.status(404).json({ success: httpStatusText.FAIL, message: 'Admin not found' });
        }
        res.status(200).json({ success: httpStatusText.SUCCESS, message: 'Admin updated successfully', data : {admin} });
    } catch (error) {
        res.status(500).json({ success: httpStatusText.ERROR, message: 'Internal server error' });
    }
};


module.exports = {
        createAdmin,
        login,
        getAllAdmin,
        deleteAdmin,
        updateAdmin
    };