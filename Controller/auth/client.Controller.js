const clientdb = require("../model/client.model");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")
const bcrypt = require("bcrypt")
const generatetoken = require("../utils/generateToken")

const createClient = asyncWrapper(async(req,res,next)=>{
    const { email , password ,fullName,relative,gender,DateOfBirth,heigh,Weight,avatar,maladieCronique} = req.body;
    const addNewClient = await CRUD.create([fullName,relative,gender,DateOfBirth,heigh,Weight,avatar,maladieCronique],clientdb);
    return addNewClient;
})




module.exports = createClient;