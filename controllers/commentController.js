const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

exports.makeComment = async(req,res)=>{
    try {
        
        console.log(req.session.UserID)
        const comment = await Comment.create({
            commenttext:req.body.commenttext,
            user: req.session.UserID,
            post: req.params.id
        })
        const user = await User.findById(req.session.UserID)
        const post = await Post.findById(req.params.id)
        user.comments.push(comment)
        post.comments.push(comment)
        await user.save()
        await post.save()
        res.status(201)
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
}

exports.getComments = async(req,res)=>{
    try {
        const comments = await Comment.find({post: req.params.id}).sort('-createdAt').populate('user')
        res.status(200).send(comments)

    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
}


exports.deleteComment = async(req,res)=>{
    // try {
    //     const post = Post.findById(req.params.id)

    //     const comments = Comment.find({_id:post.comments}).sort('-createdAt').populate('user')
    //     res.status(200).send(comments)

    // } catch (error) {
    //     res.status(400).json({
    //         error,
    //         status: 'fail'
    //     })
    // }
}