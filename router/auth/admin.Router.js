const express = require('express')
const router = express.Router()
const controller = require('../../Controller/auth/admin.Controller')




router.route('/')
        .post(controller.createAdmin)

router.route('/login')
        .post(controller.login)

router.route('/AllAdmin')
        .get(controller.getAllAdmin)

router.route('/:id')
        .patch(controller.updateAdmin)
        .delete(controller.deleteAdmin)

module.exports=router