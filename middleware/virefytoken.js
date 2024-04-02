const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
require("dotenv").config();
const httpStatusText = require("../utils/httpStatusText");

module.exports = async(req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        const error = AppError.create("token required",401,httpStatusText.UNAUTHORIZED)
        next(error);
    }
    try{
        const token = authHeader.split(' ')[1];
        
        const currentuser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentuser = currentuser
        console.log("token ",token);
        next();
    }catch{
        const error = AppError.create("invalid token(expired)",401,httpStatusText.UNAUTHORIZED)
        next(error);
    } 
}