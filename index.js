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

console.log(plivo.Response());

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});

app.post("/conference/response", function (req, res){
  var numberOne = req.body.call.numberOne;
  var numberTwo = req.body.call.numberTwo;

  console.log(numberOne, numberTwo);
  res.sendStatus(200);
});

app.post('/conference/call', function (req, res){

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Up and running! Check localhost:3000");
});
