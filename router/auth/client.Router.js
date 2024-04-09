const express = require('express')
const router = express.Router()
const controller = require('../../Controller/auth/client.Controller')





router.route('/')
        .post(controller.createClient)

        
module.exports=router