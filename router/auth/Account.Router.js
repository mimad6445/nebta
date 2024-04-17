const express = require('express')
const router = express.Router()
const controller = require('../../Controller/auth/Account.Controller')




router.route('/')
        .post(controller.registerAccount)

router.route('/login')
        .post(controller.login)

router.route('/:id')
        .post(controller.addProfile)
        .delete(controller.deleteAccount)
        .patch(controller.updateAccount);

module.exports=router