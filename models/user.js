const { Schema, model } = require("mongoose")
const { createHmac, randomBytes } = require('crypto')
const { generateToken } = require("../services/authentication")


const secret = ""

const userSchema = new Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        // required:true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    ProfileImageURL: {
        type: String,
        default: "/public/default.jpg"
    },


}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword
    // console.log(hashedPassword)

    next();

})

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email })

    if(!user) {
        throw new Error("user not found")
    }

    else{

        const salt = user.salt;
        const savedPassword = user.password;

        const providedPassword = createHmac('sha256', salt).update(password).digest('hex');

        if(providedPassword !== savedPassword){
            throw new Error("Invalid username or password")
        }

        else{
            
            const token = generateToken(user)
            return token
        }

    }
    
        

        return providedPassword === savedPassword

 
})

const User = model('user', userSchema)
module.exports = User;