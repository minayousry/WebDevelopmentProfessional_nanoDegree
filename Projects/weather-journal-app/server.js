// Setup empty JS object to act as endpoint for all routes
projectData = {};
let counter = 0;

let projectDataModified = false;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies*/
//we use bpdy parser to parse our data
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.use(express.static("website"));

const port = 8000;

const server = app.listen(port,appListener);


//appListener callback
function appListener()
{
    console.log("server running");
    console.log("running on port:",port);
}


//Add Get route
app.get('/all',replyWithData);

//once a get request is received respond with projectData
function replyWithData(req,res) 
{
    if(projectDataModified == true)
    {
        res.send(projectData[counter - 1]);
    }
    else
    {
        res.send(projectData);
    }
}

//Add post route
app.post('/add',SaveIncomingData);

/*save incoming data and respond with ok */
function SaveIncomingData(req,res)
{
    
    //adds incoming data from app in thr post request to projectData.
    const data = req.body;

    console.log(data);

    projectData[counter] = data
    //increase counter fore new elements
    counter++;
    projectDataModified = true;
    res.send('POST received');
}


