const express = require('express')
const router = express.Router()
const controller = require('../../Controller/auth/ProfileClient.Controller')




router.route('/')
        .post(controller.createProfile)



module.exports=router