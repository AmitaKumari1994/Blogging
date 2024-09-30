const express = require('express');
const asyncHandler = require('express-async-handler');
const Comment = require('../models/comments');
const Blog = require('../models/blog');

const router = express.Router();


router.post('/add/:blogId', async (req,res)=>{
    console.log("comment---------------->",req.body)

    const commentedBlog= await Blog.findById(req.params.blogId)
    const newComment = await Comment.create({
        content:req.body.comment,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })

    const relatedComments = await Comment.find({blogId:commentedBlog._id}).populate("createdBy")
    console.log("comments ka output",relatedComments)

    res.render('blog',{
        blog:commentedBlog,
        comment:relatedComments,
        user:req.user
    })
})


module.exports = router