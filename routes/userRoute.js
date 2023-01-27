const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')



const router = express.Router()

router.route('/register').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').post(authController.logoutUser)
router.route('/:id').delete(authController.deleteUser)
router.route('/userposts/:page').get(postController.getUserPosts)
router.route('/savedposts').get(postController.getSavedPosts)


module.exports = router