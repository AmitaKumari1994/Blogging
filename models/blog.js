const { Schema, model } = require("mongoose")

const blogSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Body:{
        type: String,
        required: true
    },
    coverImageURL:{
        type: String,
        required: true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true}) 

const Blog = model('blog',blogSchema);
module.exports = Blog