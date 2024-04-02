const CRUD = require('../../services/CRUD.op'); 
const CodePromodb = require("../../model/home/CodePromo.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const AllCodes = await CRUD.getAll(CodePromodb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {AllCodes}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewCode = await CRUD.create([req.body],CodePromodb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewCode}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getCode = await CRUD.getOne(Id,CodePromodb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getCode}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updateCode = await CRUD.update(Id, [req.body], CodePromodb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updateCode}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, CodePromodb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}