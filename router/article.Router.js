const express = require('express')
const router = express.Router()
const controller = require('../Controller/article.Contoller')





router.route('/')
        .post(controller.createOne)
        .get(controller.getAll)

router.route('/:id')
        .delete(controller.deleted)
        .get(controller.getOne)
        .patch(controller.update);
        
module.exports=router