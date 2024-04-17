const jwt = require("jsonwebtoken");
const httpStutsText = require("../utils/httpStatusText");
require("dotenv").config();
const httpStatusText = require("../utils/httpStatusText");

module.exports = async(req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        res.status(401).json({status: httpStutsText.UNAUTHORIZED, msg: "token require"})
    }
    try{
        const token = authHeader.split(' ')[1];
        
        const currentuser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentuser = currentuser
        next();
    }catch{
        res.status(400).json({status: httpStutsText.ERROR, msg: "error"})
    } 
}