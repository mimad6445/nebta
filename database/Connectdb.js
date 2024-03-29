const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.DATABSAE_URL);
        console.log("Connected to the database");
    } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
    }
};

module.exports = connectDB;
