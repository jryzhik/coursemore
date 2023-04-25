const db = require("./db/conn");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const md5 = require('md5')
 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050; // was || 5001

app.use(cors());
app.use(express.json());
app.use(bodyParser.raw({type:'application/octet-stream', limit:'5mb'}));


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

app.post('/upload', (req, res) => {
  const {name,currentChunkIndex,totalChunks} = req.query;
  const firstChunk = parseInt(currentChunkIndex) === 0;
  const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) -1;
  const ext = name.split('.').pop();
  const data = req.body.toString().split(',')[1];
  const buffer = new Buffer(data, 'base64');
  const tmpFilename = 'tmp_' + md5(name + req.ip) + '.' + ext;
  if (firstChunk && fs.existsSync('./uploads/'+tmpFilename)) {
    fs.unlinkSync('./uploads/'+tmpFilename);
  }
  fs.appendFileSync('./uploads/'+tmpFilename, buffer);
  console.log(buffer)
  if (lastChunk) {
    const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
    fs.renameSync('./uploads/'+tmpFilename, './uploads/'+finalFilename);
    res.json({finalFilename});
  } else {
    res.json('ok');
  }
});

app.use("/test" , recordRouter);
app.use('/users', usersRouter);
app.use("/courses" , coursesRouter);
app.use("/instructors" , instructorsRoutes);
app.use("/schedule" , scheduleRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});