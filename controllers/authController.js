const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()


exports.createUser = async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(hashedPassword)
        await User.create({email: req.body.email, password:hashedPassword})
        
        res.status(201).json('olusturuldu')

    } catch (error) {
        res.status(400)
    }
}

exports.loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            if(bcrypt.compare(password,user.password)){
                req.session.UserID=user._id
                req.session.save()
                console.log(req.session.UserID)
                
                res.status(200).redirect('http://localhost:3001/')
            }else{
                res.status(400).json('Your password is not correct')
            }
        }else{
            res.status(400).json("user not found")
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.logoutUser = async(req,res)=>{
    req.session.destroy()
    if(!req.session){
        
        res.status(200).json('"oturum kapatildi"')
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndRemove(req.params._id)
        await Post.findOneAndRemove({user: req.params._id})
        res.status(200).json('user deleted')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

