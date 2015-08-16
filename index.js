// Setup requirements for app
var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  plivo = require("plivo");

// Load environment variables
require('dotenv').load();

var views = path.join(__dirname, "views");

var plivoNumber = '13306807797';
var conferenceUrl = 'https://api.plivo.com/v1/Account/' + process.env.PLIVO_ID + '/Conference';
var answerUrl = 'https://agile-hollows-3981.herokuapp.com/conference';

var api = plivo.RestAPI({
  authId: process.env.PLIVO_ID,
  authToken: process.env.PLIVO_TOKEN
});

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});

app.post("/conference", function (req, res){
  var response = plivo.Response().addConference('talk2meconf',{
    enterSound: "Welcome to the conference",
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  })
  res.set({'Content-Type': 'text/xml'});
  res.send(response.toXML());
  console.log(res);
});

app.post('/call', function (req, res){
  var numbers = [];
  numbers.push(req.body.call.numberOne, req.body.call.numberTwo);
  
  var callParams = {
    "from": plivoNumber,
    "answer_url": answerUrl,
  }
  
  console.log(numbers)

  for(var i=0; i < numbers.length; i++){
    callParams["to"] = numbers[i];
    console.log('calling ', callParams['to']);
    // Add callback for status
    api.make_call(callParams);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Up and running! Check localhost:3000");
});
