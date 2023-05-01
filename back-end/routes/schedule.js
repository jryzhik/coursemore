const express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const scheduleRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const AVG_CS_GPA = 3.4;

const prerequesiteGraph = [
  { 1301: [1331, 4400] },
  { 1331: [1332, 2340, 2110] },
  { 1332: [3510] },
  { 2050: [3510] },
  { 2110: [2200] },
  { 2200: [3251, 4235] },
  { 2340: [3311] },
  { 3001: [3311] },
  { 3311: [3312] },
  { 4400: [4440] },
];

const gpaPriority = {
  GPA: 1,
  dayBlock: 0,
  hourBlock: 0,
  techSquare: 0,
};

const timingPriority = {
  GPA: 0,
  dayBlock: 1,
  hourBlock: 1,
  techSquare: 0,
};

function reduceToOneReq(listOfLists, priori) {
  for (var i = 0; i < listOfLists.length; i++) {
    //for every single req list
    for (var j = 0; j < listOfLists[i].length; j++) {
      if (courseInList(inputMandatory, listOfLists[i])) {
        //mandatory
        calculateScore(listOfLists[i][j], priori, true);
      } else {
        calculateScore(listOfLists[i][j], priori, false);
      }
    }

    listOfLists[i].sort((a, b) => b.score - a.score);
    listOfLists[i] = listOfLists[i][0];
  }
  var singleList = [];
  for (var i = 0; i < listOfLists.length; i++) {
    if(listOfLists[i]){
      //(listOfLists[i]);
      var newObj = JSON.parse(JSON.stringify(listOfLists[i]));
      singleList.push(newObj);
    }
  }
  //console.log(singleList);
  return singleList;
}

var courses = [];
//console.log(courses);
var inputs = ["GPA", "techSquare", "dayBlock", "hourBlock"];
var priorities = inverseMapping(inputs);

//console.log(courses);
var myMap = new Map();
var inputdayBlock = ["F"]; // M, T, W, R, F, blocks whole day.
var inputhourBlock = [8, 9, 10, 11, 12]; //military, blocks entire hour.
var inputMandatory = "1332";
var inputMinCredits = 12;
var inputMaxCredits = 16;
var reducedReq = reduceToOneReq(courses, priorities);

var allowedCourses = prune(reducedReq);
var gpas = courses.map((course) => course.GPA);
var minGPA = Math.min(...gpas);
var maxGPA = Math.max(...gpas);
var rangeGPA = maxGPA - minGPA;

var gpaArray = JSON.parse(JSON.stringify(allowedCourses));
var timingArray = JSON.parse(JSON.stringify(allowedCourses));

// for (var i = 0; i < allowedCourses.length; i++) {
//   var course = allowedCourses[i];
//   if (course.CourseNumber == inputMandatory) {
//     calculateScore(course, priorities, true);
//   } else {
//     calculateScore(course, priorities, false);
//   }
// }
// allowedCourses.sort((a, b) => b.score - a.score);

// for (var i = 0; i < gpaArray.length; i++) {
//   var course = gpaArray[i];
//   if (course.CourseNumber == inputMandatory) {
//     calculateScore(course, priorities, true);
//   } else {
//     calculateScore(course, priorities, false);
//   }
// }
// gpaArray.sort((a, b) => b.score - a.score);

// for (var i = 0; i < timingArray.length; i++) {
//   var course = timingArray[i];
//   if (course.CourseNumber == inputMandatory) {
//     calculateScore(course, priorities, true);
//   } else {
//     calculateScore(course, priorities, false);
//   }
// }
// timingArray.sort((a, b) => b.score - a.score);

// var schedule = generateSchedule(
//   allowedCourses,
//   inputMinCredits,
//   inputMaxCredits
// );

// var gpaSchedule = generateSchedule(gpaArray, inputMinCredits, inputMaxCredits);

// var timingSchedule = generateSchedule(
//   timingArray,
//   inputMinCredits,
//   inputMaxCredits
// );

// console.log(schedule);
// console.log(gpaSchedule);
// console.log(timingSchedule);

function generateSchedule(courses, minCredits, maxCredits) {
  let credits = 0;
  const schedule = [];
  const set = new Set();

  for (let i = 0; i < courses.length && credits < maxCredits; i++) {
    const course = courses[i];
    if (credits + parseInt(course.Credits) <= maxCredits) {
      // If the course fits in the remaining credits, add it to the schedule
      const classToAddStart = new Date(
        2000,
        0,
        1,
        course.HourStart,
        course.MinuteStart
      );
      const classToAddEnd = new Date(
        2000,
        0,
        1,
        course.HourEnd,
        course.MinuteEnd
      );

      let hasConflict = false;

      for (let i = 0; i < schedule.length; i++) {
        const existingClass = schedule[i];
        const existingClassStart = new Date(
          2000,
          0,
          1,
          existingClass.HourStart,
          existingClass.MinuteStart
        );
        const existingClassEnd = new Date(
          2000,
          0,
          1,
          existingClass.HourEnd,
          existingClass.MinuteEnd
        );

        if (
              (classToAddStart.getTime() <= existingClassEnd.getTime() &&
                classToAddEnd.getTime() >= existingClassStart.getTime()) ||
              (existingClassStart.getTime() <= classToAddEnd.getTime() &&
                existingClassEnd.getTime() >= classToAddStart.getTime())
            ) {
          hasConflict = true;
          break;
        }
      }
     //hasConflict = false;
      if (hasConflict) {
        
      } else {
        //console.log("No time conflict, class can be added to schedule.");
        // add class to schedule here
        if(set.has(course.requirement)){
          console.log("nothing");
        }else{
          console.log(course);
          console.log("something");
          schedule.push(course);
          credits += parseInt(course.Credits);
          set.add(course.requirement);
        }
      }
    }
  }

  return {
    schedule,
    // schedule: schedule.map((c) => ({ name: c.CRN, credits: c.credits })),
    // totalCredits: credits,
  };
}



// Prunes out classes that cannot be taken due to prerequesite dependency
function prune(arr) {
  for (let i = prerequesiteGraph.length - 1; i >= 0; i--) {
    const item = prerequesiteGraph[i];
    const [key, value] = Object.entries(item)[0];
    if (courseInList(key.toString(), arr)) {
      //Pruning starts here. LHS must be taken before RHS in class order.
      //If you see LHS in courses then you must remove all instances of any class with a name on the LHS
      value.forEach(function (crs) {
        if (courseInList(crs.toString(), arr)) {
          arr = removeCourseByName(arr, crs.toString());
        }
      });
    }
  }
  return arr;
}

// Removes all versions of a course with the specified name
function removeCourseByName(courses, name) {
  return courses.filter((course) => course.CourseNumber !== name);
}

// Checks if a course is inside an array based on its name
function courseInList(courseName, courses) {
  let courseFound = false;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (course.CourseNumber === courseName) {
      courseFound = true;
      break;
    }
  }
  return courseFound;
}

// Calculate the inverse of the ranking to get a weight for scoring.
function inverseMapping(arr) {
  const map = {
    GPA: 0.25,
    dayBlock: 0.25,
    hourBlock: 0.25,
    techSquare: 0.25,
  };
  if (arr == null || arr.length == 0) {
    return map;
  }
  const len = arr.length;
  if (len > 0) {
    map[arr[0]] = 1;
  }
  if (len > 1) {
    map[arr[1]] = 1 / 2;
  }
  if (len > 2) {
    map[arr[2]] = 1 / 3;
  }
  if (len > 3) {
    map[arr[3]] = 1 / 4;
  }
  return map;
}

function getMilitaryHoursInRange(start, end) {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
}

// Normalize values to get them on the same scale for comparison
function normalize(value, min, max) {
  return (value - min) / (max - min);
}

// Calculate the score for the course based on its attributes
function calculateScore(course, priori, bool) {
  if (bool) {
    console.log(course);
  }
  if (course === null) return;
  let score = 0;

  if (bool) {
    score += 10;
  }

  if (course.GPA === null) {
    score += priori.GPA * normalize(AVG_CS_GPA, minGPA, maxGPA);
  } else {
    score += priori.GPA * normalize(course.GPA, minGPA, maxGPA);
  }

  if (course.Location.toLowerCase().includes("scheller")) {
    score -= priori.techSquare * 0.5;
  } else {
    score -= priori.techSquare * 0;
  }

  var letterDays = course.Days.split("");
  var isDayBlocked = inputdayBlock.some((day) =>
    letterDays.includes(day.toUpperCase())
  );
  if (!isDayBlocked) {
    score += priori.dayBlock * 1;
  } else {
    score += priori.dayBlock * 0;
  }

  var courseHours = getMilitaryHoursInRange(
    parseInt(course.HourStart),
    parseInt(course.HourEnd)
  );
  var isHourBlocked = inputhourBlock.some((hour) =>
    courseHours.includes(hour)
  );
  if (!isHourBlocked) {
    score += priori.hourBlock * 1;
  } else {
    score += priori.hourBlock * 0;
  }
  course.score = score;
  //console.log(course.score);

  if(myMap.get(course.requirement) == 1){
    course.score = course.score + 5;
  }else if(myMap.get(course.requirement) == 2){
    course.score = course.score + .75;
  }else if(myMap.get(course.requirement) == 3){
    course.score = course.score + .5;
  }
}

// Convert array of string days to letter representations
function convertToSingleLetterDays(days) {
  const dayMap = {
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "R",
    Friday: "F",
  };

  return days.map((day) => dayMap[day.toLowerCase()]);
}



function createFinalArray(temp){

const arr = [];

for (let i = 0; i < tempCourses.length; i++) {
  const subarr = [];
  for (let j = 0; j < temp.length; j++) {
    if (tempCourses[i].includes(temp[j].CourseNumber)) {
      subarr.push(temp[j]);
    }
  }
  arr.push(subarr);
}


return arr;
}

function addGPA(temp){
  let db_connect = dbo.getDb("coursemore");

  const getInstructorGPA = (instructorName) => {
  return new Promise((resolve, reject) => {
    db_connect
      .collection("Instructors")
      .findOne({ InstructorName: instructorName })
      .then((result) => {
        if (result) {
          resolve(result.GPA);
        } else {
          resolve(AVG_CS_GPA);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const promises = [];

for (let i = 0; i < temp.length; i++) {
  const promise = getInstructorGPA(temp[i].InstructorName);
  promises.push(promise);
}

return Promise.all(promises)
  .then((gpas) => {
    for (let i = 0; i < temp.length; i++) {
      temp[i].GPA = parseInt(gpas[i]);
    }
    //console.log(temp);
    return temp;
  })
  .catch((error) => {
    console.error(error);
  });


}


function getCourses(req){
  let db_connect = dbo.getDb("coursemore");
  // this is abrar code

  // this is abrar code
  tempCourses = req.body.degreeWorksCourses;
  inputdayBlock = req.body.dayBlock.split(""); // for the JSON object make the entity 
  hourBlock = [req.body.hourBlock.start , req.body.hourBlock.end];
  manditoryCourse = req.body.mandatoryCourse;
  inputMaxCredits = parseInt(req.body.maxCredits);
  inputMinCredits = parseInt(req.body.minCredits);
  inputs = req.body.ranking;// this is the ranked inputs
const temp = [];
const promises = [];
for (let i = 0; i < tempCourses.length; i++) {
  for (let j = 0; j < tempCourses[i].length; j++) {
    const promise = db_connect
      .collection("Courses")
      .find({ CourseNumber: tempCourses[i][j] })
      .toArray();
    promises.push(promise);
  }
}

return Promise.all(promises)
  .then((results) => {
    for (let k = 0; k < results.length; k++) {
      temp.push(...results[k]);
    }
    // console.log(temp);
    //res.json(temp);
    return temp;
  })
  .catch((error) => {
    console.error(error);
  });

  
  //res.json(temp);
}

scheduleRoutes.route("/getSchedule").get(function (req, response) {
 let db_connect = dbo.getDb("coursemore");
 const temp = getCourses(req);
getCourses(req)
  .then((temp) => {
    addGPA(temp)
      .then((temp) => {
        //console.log(temp);
        // console.log(inputdayBlock);
        // console.log(hourBlock);
        // console.log(inputs);
        courses = temp;
        var x = createFinalArray(temp);
        for(var i = 0 ; i < x.length ; i++){
          for(var j = 0 ; j < x[i].length ; j++){
            x[i][j].requirement = i;
            if (myMap.has(x[i][j].requirement)) {
              let oldValue = myMap.get(x[i][j].requirement);
              myMap.set(x[i][j].requirement, oldValue + 1);
            } else {
              myMap.set(x[i][j].requirement, 1);
            }
          }
        }

        //courses = courses.map(subArr => subArr.filter(value => value !== undefined));
        // console.log("hello")
        // console.log(courses);
        // console.log("bye")
        // this is abrar code

        //var inputs = ["GPA", "techSquare", "dayBlock", "hourBlock"];
        var priorities = inverseMapping(inputs);

//console.log(courses);

        // var inputdayBlock = ["F"]; // M, T, W, R, F, blocks whole day.
        // var inputhourBlock = [8, 9, 10, 11, 12]; //military, blocks entire hour.
        // var inputMandatory = "1332";
        // var inputMinCredits = 12;
        // var inputMaxCredits = 16;
        // reducedReq = reduceToOneReq(courses, priorities);
        reducedReq = courses;

        allowedCourses = prune(reducedReq);
        //console.log()
        gpas = courses.map((course) => course.GPA);
        minGPA = Math.min(...gpas);
        maxGPA = Math.max(...gpas);
        rangeGPA = maxGPA - minGPA;

        gpaArray = JSON.parse(JSON.stringify(allowedCourses));
        timingArray = JSON.parse(JSON.stringify(allowedCourses));

        for (var i = 0; i < allowedCourses.length; i++) {
          var course = allowedCourses[i];
          if (course.CourseNumber == inputMandatory) {
            calculateScore(course, priorities, true);
          } else {
            calculateScore(course, priorities, false);
          }
        }
        allowedCourses.sort((a, b) => b.score - a.score);

        for (var i = 0; i < gpaArray.length; i++) {
          var course = gpaArray[i];
          if (course.CourseNumber == inputMandatory) {
            calculateScore(course, gpaPriority, true);
          } else {
            calculateScore(course, gpaPriority, false);
          }
        }
        gpaArray.sort((a, b) => b.score - a.score);

        for (var i = 0; i < timingArray.length; i++) {
          var course = timingArray[i];
          if (course.CourseNumber == inputMandatory) {
            calculateScore(course, timingPriority, true);
          } else {
            calculateScore(course, timingPriority, false);
          }
        }
        timingArray.sort((a, b) => b.score - a.score);

        var schedule = generateSchedule(
          allowedCourses,
          inputMinCredits,
          inputMaxCredits
        );

        var gpaSchedule = generateSchedule(gpaArray, inputMinCredits, inputMaxCredits);

        var timingSchedule = generateSchedule(
          timingArray,
          inputMinCredits,
          inputMaxCredits
        );

        // this is abrar code
        var allSchedules = [schedule , gpaSchedule , timingSchedule];
        //console.log(courses);
        response.json(allSchedules);
        //response.json(courses);
    
    })
    .catch((error) => {
    console.error(error);
    });
  })
  .catch((error) => {
    console.error(error);
  });
 // console.log(temp);
});


// //This is to test if postman woks
// scheduleRoutes.route("/test").get(urlencodedParser,jsonParser, function (req, res) {
//   // res.send('Hello from Express!');
//   res.send(req.body)
// });

scheduleRoutes.get('/test', jsonParser, function (req, res) {
    res.send(req)
})


module.exports = scheduleRoutes;