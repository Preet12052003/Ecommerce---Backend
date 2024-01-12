const mongoose = require('mongoose')

async function connectDB() {
    await mongoose.connect(process.env.DATABASE_URI , {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('databse connected');
}

module.exports.connectDB = connectDB