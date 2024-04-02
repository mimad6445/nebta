const express = require('express')
const router = express.Router()
const controller = require('../../Controller/home/Conseilledujour.Controller')





router.route('/')
        .post(controller.createCode)
        .get(controller.getAllCode)

router.route('/:id')
        .delete(controller.deleteCode)
        .get(controller.getOneCode)
        .patch(controller.updateCode);
        
module.exports=router