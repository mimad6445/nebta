const express = require('express')
const router = express.Router()
const controller = require('../Controller/product.Controller')
const {cacheMiddleware} = require("../middleware/redis")




router.route('/product')
        .post(controller.createOne)
        .get(cacheMiddleware,controller.getAll)

router.route('/:id')
        .delete(controller.deleted)
        .get(controller.getOne)
        .patch(controller.update);
        
module.exports=router