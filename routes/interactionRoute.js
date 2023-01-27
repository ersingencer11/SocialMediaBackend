const express = require('express')
const postController = require('../controllers/postController')


const router = express.Router()

router.route('/:id').get(postController.getPost)
router.route('/:id').post(postController.likePost)
router.route('/:id').patch(postController.savePost)

module.exports = router