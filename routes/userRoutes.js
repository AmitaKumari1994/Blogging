const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const router = express.Router();

const { signin } = require('../controllers/userController');

router.get('/signin', (req, res) => {
    res.render('signin',{user:req.user})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('jwt').render('signin')
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {

        const token = await User.matchPasswordAndGenerateToken(email, password)
        if (token) {

            // console.log('token', token)
            
    
            return res.cookie('jwt', token, { }).redirect("/")
        }
        
    } catch (error) {
        console.log(error)
       return  res.render('signin', { error: "Incorrect email or password" })
    }
    
    

    

    
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    console.log(fullName, email, password)

    // Validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password

    const userCreated = await User.create({
        fullName,
        email,
        password
    });

    if (userCreated) {
        res.status(201).json({
            message: "User successfully created"
        });
    } else {
        throw new Error("Invalid user data");
    }
}));

// Export the router
module.exports = router;
