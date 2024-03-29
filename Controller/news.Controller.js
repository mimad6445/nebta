const CRUD = require('../services/CRUD.op'); 
const newsdb = require("../model/news.model");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const Allnews = await CRUD.getAll(newsdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {Allnews}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewNews = await CRUD.create([req.body],newsdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewNews}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getNews = await CRUD.getOne(Id,newsdb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getNews}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updateNews = await CRUD.update(Id, [req.body], newsdb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updateNews}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, newsdb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}