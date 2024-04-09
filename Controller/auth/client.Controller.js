const clientdb = require("../../model/auth/client.model");
const productdb =require("../../model/product.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")
const bcrypt = require("bcrypt")
const generatetoken = require("../../utils/generateToken")

const createClient = asyncWrapper(async(req,res,next)=>{
    const { email , password ,fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique} = req.body;
    const addNewClient = new clientdb({fullname,relative,gender,DateOfBirth,height,weight,avatar,maladieCronique});
    await addNewClient.save();
    const product = await productdb.find();
    console.log("product :" ,product);
    res.json({addNewClient})
    return addNewClient;
})




module.exports = {
    createClient
  };