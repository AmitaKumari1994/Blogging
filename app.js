require('dotenv').config()
console.log(process.env)

const path = require('path')
const express = require('express');
const mongodb = require('./database/db_configuration')
const cookieParser = require("cookie-parser")

const Blog = require('./models/blog')




// import { mongodb } from './database/db_configuration';

const userRoute = require('./routes/userRoutes');
const blogRoute = require('./routes/blogRoutes')
const commentRoute = require('./routes/commentRoutes')
const { checkForAuthenticationCookie} = require("./middleware/authenticator");


const PORT = process.env.PORT;
mongodb();
const app = express();




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(checkForAuthenticationCookie('jwt'))
app.use(express.static(path.resolve("./public")))
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.get('/test',(req,res)=>{
    res.sendFile(path.join(__dirname, './public'));
})









// app.get('/',(req,res)=>{

//     res.render('Home',{user: req.email })
// })\

app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/comment',commentRoute)

app.get('/', async (req, res) => {

    // console.log("from index js",req.user)

    const allblogs = await Blog.find({})

    res.render("Home",
        {
            user: req.user,
            AllBlogs:allblogs
        }
    ); 
});



app.listen(PORT, () => {
    console.log(`server started on the port :  ${PORT}`)
})