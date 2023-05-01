const db = require("./db/conn");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050; // was || 5001

app.use(cors());
app.use(express.json());


const usersRouter = require('./routes/users');
const recordRouter = require('./routes/record');
const coursesRouter = require('./routes/courses');
const instructorsRoutes = require('./routes/instructors');
const scheduleRoutes = require('./routes/schedule');
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


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});