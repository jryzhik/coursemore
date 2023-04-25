const db = require("./db/conn");
const express = require('express');
const mongoose = require('mongoose'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050; // was || 5001



const usersRouter = require('./routes/users');
const recordRouter = require('./routes/record');
const coursesRouter = require('./routes/courses');
const instructorsRoutes = require('./routes/instructors');
const scheduleRoutes = require('./routes/schedule');
const uploadRouter = require("./routes/upload");
//All routers (middleware) will be placed here

app.get('/', function (req, res) {
    res.send('hello');
})

app.get('/hello', function (req, res) {
    res.send('welcome to coursemore');
})

app.use("/test" , recordRouter);
app.use('/users', usersRouter);
app.use("/courses" , coursesRouter);
app.use("/instructors" , instructorsRoutes);
app.use("/schedule" , scheduleRoutes);
app.use("/upload" , uploadRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});