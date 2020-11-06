const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = newScheme({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: { 
        //name and avatar are here so that we can identify the maker of the post
        //even if he has deleted the account
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        } 
    ],    
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: String,
                date: Date.now()
            },
        } 
    ],
    date: {
        type: String,
        date: Date.now()
    },
})

module.exports = Post = mongoose.model("Post",PostSchema);