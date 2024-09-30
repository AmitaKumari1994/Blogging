const express = require('express');
const router = express.Router('');
const path = require('path')
const multer = require('multer')

const Blog = require("../models/blog")
const Comment = require("../models/comments")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }

})


const upload = multer({ storage: storage })

router.get('/addBlog', (req, res, next) => {
    console.log("from blog route", req.user)
    res.render('addBlog', {
        user: req.user
    })
})

router.get('/:id',async (req,res)=>{

    console.log("track----------------------------------->",req.params.id)
    const fetchBlog = await Blog.findById(req.params.id).populate("createdBy")
    console.log(fetchBlog)
    const fetchComment = await Comment.find({blogId:req.params.id}).populate("createdBy")
     console.log("yyyyyyyyyyyyyyyyyyyyy--------------->",fetchBlog)
    res.render('blog',{
        blog:fetchBlog,
        user:req.user,
        comment:fetchComment

    })
})

// router.get('/allBlogs',async (req,res,next)=>{

// })

router.post('/addBlog', upload.single("coverImage"), async (req, res) => {

    const {title,Description,Body} = req.body;
   const blog = await Blog.create({
        title:title,
        Description,
        Body,
        createdBy:req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    console.log(req.body)
    console.log(req.file)
    return res.redirect(`/blog/${Blog._id}`)

})



module.exports = router