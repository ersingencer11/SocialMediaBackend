const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    interests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }],
    
    follows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

})

const User = mongoose.model('User',userSchema)
module.exports = User