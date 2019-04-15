const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();


const doctorRouter = require('./router/doctorRoute');


const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});

//connecting to mongoose database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/freelancePortal', { useNewUrlParser: true });

app.use(express.json());
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));

//enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods: POST, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/doctor', doctorRouter);

module.exports = app;