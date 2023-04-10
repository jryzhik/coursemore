const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb+srv://coursemoreadmin:GT%21ChristMercyGrace%3B%3B23@cluster0.qdqpdp4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true,
                       dbName: "coursemore"});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// added this for the getDB function error that I was getting before
module.exports = {
  getDb: function() {
    return connection;
  }
};