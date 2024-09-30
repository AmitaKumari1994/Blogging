const jwt = require("jsonwebtoken");

const secret = "abc123"

function generateToken(user){
    const payload = {
        _id:user._id,
        email:user.email,
        role:user.role,
        url:user.profileImageURL,
        name:user.fullName
    }

    const token = jwt.sign(payload , secret)
    return token;
}

function verifyToken(token){
    try{
        const payload = jwt.verify(token,secret);
    console.log(`here from parent , ${JSON.stringify(payload)}`)
    return payload
    }

    catch (error){
        console.log("unable to verify token", error)
        return null
    }
    
    
}

module.exports = {generateToken,verifyToken}