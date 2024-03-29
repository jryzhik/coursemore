const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const coursesRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//This is to get all the courses from the coursemoreDB
coursesRoutes.route("/").get(function (req, res) {
 let db_connect = dbo.getDb("coursemore");
 db_connect
   .collection("Courses")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// this is to add a course to the database
coursesRoutes.route("/add").post(function (req, response) {
 let db_connect = dbo.getDb("coursemore");
 let myobj = {
   CourseTitle: req.body.CourseName, // for the JSON object make the entity name exactly like the thing at end of req.body.
   InstructorName: req.body.CourseInstructor,
   CRN: req.body.CRN,
   CourseNumber: req.body.CourseNumber,
   Section: req.body.Section,
   Credits: req.body.Credits,
   TimeText: req.body.TimeText,
   HourStart: req.body.HourStart,
   MinuteStart: req.body.MinuteStart,
   HourEnd: req.body.HourEnd,
   MinuteEnd: req.body.MinuteEnd,
   Days: req.body.Days,
   Location: req.body.Location
 };
 db_connect.collection("Courses").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(myobj);
 });
});

// This is to get all the Instructors from the coursemoreDB
coursesRoutes.route("/instructors").get(function (req, res) {
 let db_connect = dbo.getDb("coursemore");
 db_connect
   .collection("Instructors")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This is to add an instructor into the database
coursesRoutes.route("/instructors/add").post(function (req, response) {
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

// this is to delete a course in the database
coursesRoutes.route("/delete").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { CRN: req.body.CRN};
 db_connect.collection("Courses").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

//This is to test if postman woks
coursesRoutes.route("/test").get(function (req, res) {
  res.send('Hello from Express!');
});



module.exports = coursesRoutes;