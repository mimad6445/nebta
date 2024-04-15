const express = require('express')
const router = express.Router()
const controller = require('../Controller/product.Controller')
const controllerTop = require("../Controller/topProduct.Controller")




router.route('/')
        .post(controller.createProduct)
        .get(controller.getAllProducts)

router.route('/topProduct')
        .get(controllerTop.topProduct);
router.route('/:id')
        .delete(controller.deleteProduct)
        .get(controller.getOneProduct)
        .patch(controller.updateProduct);



module.exports=router