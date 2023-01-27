const express = require('express')
const commentController = require('../controllers/commentController')


const router = express.Router()

router.route('/:id').post(commentController.makeComment)
// router.route('/:id').delete(commentController.deleteComment)
router.route('/:id').get(commentController.getComments)

module.exports = router