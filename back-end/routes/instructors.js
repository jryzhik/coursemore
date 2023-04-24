const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const instructorsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This is to get all the Instructors from the coursemoreDB
instructorsRoutes.route("/").get(function (req, res) {
 let db_connect = dbo.getDb("coursemore");
 db_connect
   .collection("Instructors")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This is see if an Instructor is in the Instructors collection
instructorsRoutes.route("/instructor").get(function (req, res) {
  let db_connect = dbo.getDb("coursemore");
  instructor_passed = req.body.InstructorName
  // instructor_passed = '"' + instructor_passed + '"' 
  db_connect
   .collection("Instructors")
   .find({"InstructorName": instructor_passed})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This is to add an instructor into the database
instructorsRoutes.route("/add").post(function (req, response) {
 let db_connect = dbo.getDb("coursemore");
 let myobj = {
   InstructorName: req.body.InstructorName,
   GPA: req.body.GPA,
   RPMRaiting: req.body.RPMRaiting
 };
 db_connect.collection("Instructors").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(myobj);
 });
});

// this is to delete a Instructor in the database
instructorsRoutes.route("/delete").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { InstructorName: req.body.InstructorName}; // prbly give an ID to remove
 db_connect.collection("Instructors").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

//This is to test if postman woks
instructorsRoutes.route("/test").get(function (req, res) {
  res.send('Hello from Express!');
});



module.exports = instructorsRoutes;