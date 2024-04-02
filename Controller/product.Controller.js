const CRUD = require('../services/CRUD.op'); 
const productdb = require("../model/product.model");
const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require("../utils/httpStatusText")
const { cacheData } = require('../middleware/redis');
const redis = require("redis");




const client = redis.createClient({
    legacyMode: true,
    port: 8000
});
client.connect().catch(console.log("top"))


const getAll = asyncWrapper(async(req,res)=>{
    
    client.get('allProduct',async (err, data) => {
        if (err) {
            console.error('Error getting data from Redis:', err);
        }

        if (data !== null) {
            console.log('Data found in cache:', data);
            res.status(200).json({ status: httpStatusText.SUCCESS, data: JSON.parse(data) });
        }
        else{
            try {
                const AllProduct = await CRUD.getAll(productdb);
                console.log("chaching data");
                cacheData(req,AllProduct)
                res.status(200).json({status : httpStatusText.SUCCESS, data : {AllProduct}});
            } catch (error) {
                console.log("error in set data")
            }
        }
    })
    
    
    
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