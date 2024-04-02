const express = require('express')
const router = express.Router()
const controller = require('../../Controller/home/article.Controller')





router.route('/')
        .post(controller.createArticle)
        .get(controller.getAllArticle)

router.route('/:id')
        .delete(controller.deleteArticle)
        .get(controller.getOneArticle)
        .patch(controller.updateArticle);
        
module.exports=router