const express = require('express')
const router = express.Router()
const controller = require('../../Controller/home/news.Controller')





router.route('/')
        .post(controller.createNews)
        .get(controller.getAllNews)

router.route('/:id')
        .delete(controller.deleteNews)
        .get(controller.getOneNew)
        .patch(controller.updateNews);
        
module.exports=router