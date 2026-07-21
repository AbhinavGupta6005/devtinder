const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://motilalg25_db_user:DSXzE9i9grbgzPo9@devtinder.rnsy0ir.mongodb.net/?appName=DevTinder"
    )
}

module.exports = connectDB;