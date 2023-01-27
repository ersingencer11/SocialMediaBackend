const express = require('express')
const postController = require('../controllers/postController')


const router = express.Router()

router.route('/').post(postController.createPost)
router.route('/:page').get(postController.getAllPosts)
router.route('/:id').delete(postController.deletePost)



module.exports = router

