const express = require('express');
const cors = require('cors'); //Cross-origin resource sharing
const mongoose = require('mongoose');
require('dotenv').config(); //Loads environment variables from a .env file into process.env

const app = express();
const port = process.env.PORT || 4000;

//Middlewares
app.use(cors());
app.use(express.json());    //Helps in parsing JSON
/*
app.get('/', function (req, res) {
    console.log("GET Request");
    res.send('Hello World!');
});
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established!");
});

const covidRouter = require('./routes/covid')
const aboutRouter = require('./routes/about')

app.use('/covid', covidRouter);
app.use('/covid/historic', covidRouter);
//app.use('/about', aboutRouter);

if(process.env.NODE_ENV === 'production'){
    console.log("In production..");
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port}`);
});