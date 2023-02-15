const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb+srv://coursemoreadmin:GT%21ChristMercyGrace%3B%3B23@cluster0.w5mecxi.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})