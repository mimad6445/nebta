const express = require('express')
const router = express.Router()
const controller = require('../../Controller/home/CodedePromo')





router.route('/')
        .get(controller.getAllCode)
        .post(controller.createCode)

router.route('/:id')
        .delete(controller.deleteCode)
        .get(controller.getOneCode)
        .patch(controller.updateCode);
        
module.exports=router