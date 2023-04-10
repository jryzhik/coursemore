const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const coursesRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This is to get all the courses from the coursemoreDB
coursesRoutes.route("/courses").get(function (req, res) {
 let db_connect = dbo.getDb("coursemoreDB");
 db_connect
   .collection("Courses")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This is to get all the Instructors from the coursemoreDB
coursesRoutes.route("/instructors").get(function (req, res) {
 let db_connect = dbo.getDb("coursemoreDB");
 db_connect
   .collection("Instructors")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

//This is to test if postman woks
coursesRoutes.route("/test").get(function (req, res) {
  res.send('Hello from Express!');
});



module.exports = coursesRoutes;