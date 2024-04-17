const express = require('express')
const router = express.Router()
const controller = require('../../Controller/auth/ProfileClient.Controller')




router.route('/')
        .post(controller.createProfile)

router.route('/:id')
        .delete(controller.deleteProfile)
        .patch(controller.updateProfile);

module.exports=router