const express = require('express')
const router = express.Router()
const controller = require('../Controller/auth/ProfileClient.Controller')


router.route('/NbrMaladieCronique')
        .get(controller.Analyst)


module.exports=router