const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

exports.createPost = async(req,res)=>{
    try {
        console.log(req.session.UserID)
        const post = await Post.create({
            posttitle: req.body.posttitle,
            posttext:req.body.posttext,
            categories: req.body.categories,
            user: req.session.UserID
        })
        const user = await User.findById(req.session.UserID)
        user.posts.push(post)
        await user.save()
        res.status(201).redirect('http://localhost:3001/')    
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
}

 exports.getAllPosts = async(req,res)=>{
    try {
        const postsPerPage = 4
        const pageNumber = req.params.page
        const posts = await Post.find().sort('-createdAt').populate('user').populate('categories').limit(postsPerPage).skip(postsPerPage*pageNumber)
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

 exports.getPost = async(req,res)=>{
    try {
        console.log("post getir")
        const post = await Post.findById(req.params.id)
        const comments = await Comment.findById(req.params.id)

        res.status(200).json({post, comments})
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

 exports.getUserPosts = async(req,res)=>{
    try {
        req.session.UserID="638ce22f0c06f94e7eb2fdf3"
        console.log(req.session.UserID)

        const postsPerPage = 4
        const pageNumber = req.params.page

        const user = await User.findOne({_id: req.session.UserID}).populate('posts').sort('-createdAt').limit(postsPerPage).skip(postsPerPage*pageNumber)
        

        res.status(200).send(user)
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

 exports.getSavedPosts = async(req,res)=>{
    try {
        req.session.UserID="638ce22f0c06f94e7eb2fdf3"
        console.log(req.session.UserID)
        const user = await User.findOne({_id: req.session.UserID}).populate('savedposts')
        
        res.status(200).send(user)
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

 exports.deletePost = async(req,res)=>{
    try {
        const post = await Post.findOne({_id: req.params.id})
        const user = await User.findOne({_id: post.user})
        await user.posts.pull({_id:post._id})
        await user.save()
        await post.remove()
        res.status(200).send('silindi')


    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }
 

exports.likePost = async(req,res)=>{
    try {
        const user = await User.findById(req.session.UserID)
        user.likes.push({ _id: req.params.id })
        await user.save()
        res.status(201).send("liked")
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

 exports.savePost = async(req,res)=>{
    try {
        console.log(req.session.UserID)
        const user = await User.findById(req.session.UserID)
        user.savedposts.push({ _id: req.params.id })
        await user.save()
        res.status(201).send("basarili")
    } catch (error) {
        res.status(400).json({
            error,
            status: 'fail'
        })
    }
 }

