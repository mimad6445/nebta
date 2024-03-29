const CRUD = require('../services/CRUD.op'); 
const OffrePromotiondb = require("../model/OffreEtPromotion");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")


const getAll = asyncWrapper(async(req,res)=>{
    const AllOffrePromotion = await CRUD.getAll(OffrePromotiondb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {AllOffrePromotion}});
})

const createOne = asyncWrapper(async(req,res)=>{
    const addNewOffrePromotion = await CRUD.create([req.body],OffrePromotiondb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {addNewOffrePromotion}});
})

const getOne = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const getOffrePromotion = await CRUD.getOne(Id,OffrePromotiondb);
    res.status(200).json({status : httpStatusText.SUCCESS, data : {getOffrePromotion}});
})

const update = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const updateOffrePromotion = await CRUD.update(Id, [req.body], OffrePromotiondb)
    res.status(200).json({status : httpStatusText.SUCCESS, data : {updateOffrePromotion}});
})

const deleted = asyncWrapper(async(req,res)=>{
    const Id = req.params.id; 
    const deletedObj = await CRUD.delete(Id, OffrePromotiondb)
    res.status(200).json({status : httpStatusText.SUCCESS, msg : "deleted data Successful "});
})


module.exports = {
    getAll,
    getOne,
    createOne,
    deleted,
    update
}