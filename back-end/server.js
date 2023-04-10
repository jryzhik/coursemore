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

//All routers (middleware) will be placed here

app.get('/', function (req, res) {
    res.send('hello');
})

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});