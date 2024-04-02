const CRUD = require('../../services/CRUD.op'); 
const articledb = require("../../model/home/article.model");
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpStatusText = require("../../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const Allarticle = await CRUD.getAll(articledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {Allarticle}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewarticle = await CRUD.create([req.body],articledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewarticle}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getarticle = await CRUD.getOne(Id,articledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getarticle}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updatearticle = await CRUD.update(Id, [req.body], articledb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updatearticle}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, articledb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}