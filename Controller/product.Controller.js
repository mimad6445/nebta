const AppError = require('../utils/AppError');
const CRUD = require('../services/CRUD.op'); 
const productdb = require("../model/product.model");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const AllProduct = await CRUD.getAll(productdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {AllProduct}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewProduct = await CRUD.create([req.body],productdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewProduct}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getProduct = await CRUD.getOne(Id,productdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getProduct}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updateProduct = await CRUD.update(Id, [req.body], productdb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updateProduct}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, productdb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}