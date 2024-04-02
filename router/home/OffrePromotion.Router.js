const express = require('express')
const router = express.Router()
const controller = require('../../Controller/home/offrePromotion.Controller')





router.route('/')
        .post(controller.createOffre)
        .get(controller.getAllOffre)

router.route('/:id')
        .delete(controller.deleteOffre)
        .get(controller.getOneOffre)
        .patch(controller.updateOffre);

module.exports=router