const CRUD = require('../services/CRUD.op'); 
const Conseilledb = require("../model/Conseille.model");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const AllConseille = await CRUD.getAll(Conseilledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {AllConseille}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewConseille = await CRUD.create([req.body],Conseilledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewConseille}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getConseille = await CRUD.getOne(Id,Conseilledb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getConseille}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updateConseille = await CRUD.update(Id, [req.body], Conseilledb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updateConseille}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, Conseilledb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}