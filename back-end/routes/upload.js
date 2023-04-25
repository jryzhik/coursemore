const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const md5 = require('md5')
const {spawn} = require('child_process');

// uploadRouter is an instance of the express router.
const uploadRouter = express.Router();

uploadRouter.use(cors());
uploadRouter.use(express.json());
uploadRouter.use(bodyParser.raw({type:'application/octet-stream', limit:'5mb'}));



uploadRouter.post('/', (req, res) => {
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
    if (lastChunk) {
      const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
      fs.renameSync('./uploads/'+tmpFilename, './uploads/'+finalFilename);

        var dataToSend;
        // spawn new child process to call the python script
        const python = spawn('python', ['scrapers/scripts/degreeWorks.py', finalFilename]);
        // collect data from script
        python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend) });
    } else {
      res.json('ok');
    }
  });

//   uploadRouter.get('/test', (req, res) => {
 
//     var dataToSend;
//     // spawn new child process to call the python script
//     const python = spawn('python', ['scrapers/scripts/script1.py']);
//     // collect data from script
//     python.stdout.on('data', function (data) {
//      console.log('Pipe data from python script ...');
//      dataToSend = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.send(dataToSend)
//     });
    
//    })

module.exports = uploadRouter;