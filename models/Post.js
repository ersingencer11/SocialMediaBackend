const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    posttext:{
        type: String
    },
    posttitle:{
        type: String
    },
    categories: [{
        type: String,
        
    }],
    comments: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post',postSchema)
module.exports =  Post