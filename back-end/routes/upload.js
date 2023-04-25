const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const md5 = require('md5')


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
    console.log('./uploads/'+tmpFilename)
    if (lastChunk) {
      const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
      fs.renameSync('./uploads/'+tmpFilename, './uploads/'+finalFilename);
      console.log('./uploads/'+finalFilename)
      res.json({finalFilename});
    } else {
      res.json('ok');
    }
  });

module.exports = uploadRouter;