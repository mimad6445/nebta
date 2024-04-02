const clientdb = require("../../model/auth/client.model")
const profiledb = require("../../model/auth/client.model")
const asyncWrapper = require("../../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");
const {createClient} =require("./client.Controller")

const register = asyncWrapper(async(req,res)=>{
    const { email,password } = req.body
    const client = createClient(req,res);
    const hashedPassword = await bcrypt.hash(password,10)
        const profile = new profiledb({
            client ,
            email ,
            password : hashedPassword,
        })
        const token = await generateToken({ email: profile.email , id: profile._id})
        profile.token = token;
        await client.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { client} });
})


const login = asyncWrapper(async(req,res)=>{

    const { email , password } = req.body;
    const profile = await profiledb.findOne({email : email});
    if(!profile){
        res.status(404).json({status:"error",msg : "email n'existe pas"})
    }
    const ComparingPassword = await bcrypt.compare(password , profile.password);
    if(profile && ComparingPassword){
        const token = await generateToken({ email: profile.email , id: profile._id})
        res.status(200).json({status: httpStatusText.SUCCESS, data : {token}})
    }
    else{
        res.status(404).json({status:httpStatusText.ERROR,msg : "error password"
        })
    }
})




module.exports = {
    register,
    login
}