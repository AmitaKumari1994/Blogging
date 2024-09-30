require('dotenv').config()
const mongoose = require('mongoose');

const mongodb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("connected"))

    } catch (error) {
        console.log(`Error :, ${error}`)
        process.exit(1)
    }
}

module.exports = mongodb