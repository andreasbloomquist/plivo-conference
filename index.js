// Setup requirements for app
var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  plivo = require("plivo");

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
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res){
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});

app.post("/conference", function (req, res){
  var response = plivo.Response()

  response.addSpeak("Hello, and welcome to Andreas's conferencing line. You are now joining the conference.")

  response.addConference('talk2meconf',{
    startConferenceOnEnter: true
  });

  res.set({'Content-Type': 'text/xml'});
  res.end(response.toXML());
  console.log(response.toXML());
});

app.post('/call', function (req, res){
  var numbers = [];
  numbers.push('1' + req.body.call.numberOne.replace(/\D/g,''), '1' + req.body.call.numberTwo.replace(/\D/g,''));
  
  console.log(numbers)

  var callParams = {
    "from": plivoNumber,
    "answer_url": answerUrl,
  }

  for(var i=0; i < numbers.length; i++){
    callParams["to"] = numbers[i];
    console.log('calling ', callParams['to']);
    // Add callback for status
      api.make_call(callParams);
  }
  var conferencePath = path.join(views, 'conference.html');
  res.sendFile(conferencePath);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Up and running! Check localhost:3000");
});
