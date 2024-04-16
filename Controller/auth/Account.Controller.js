const clientdb = require("../../model/auth/client.model")
const profiledb = require("../../model/auth/client.model")
const asyncWrapper = require("../../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");


const register = asyncWrapper(async(req,res)=>{
    
})


const login = asyncWrapper(async(req,res)=>{

})




module.exports = {
    register,
    login
}