//Load express module with `require` directive
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');

var UserData = require ('./models/userData');

app.use(cors());
app.use(bodyParser.json());


function connectToDb(){
	mongoose.connect('mongodb://test-user:456@10.0.2.44:27017/partiks_db', {useNewUrlParser:true, autoReconnect: true }).then( (res) => console.log("MongoDB connection established successfully. " + res) ).catch( error => console.error("MongoDB connection error\n" + error));
}

setTimeout(connectToDb, 3000);

//Launch listening server on port 3000
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})

app.get('/users', function (req, res) {
	console.log('DB users called');
	UserData.find( (err, users) => {
		if(err){
			console.log(err);
		}
		else{
			console.log(users);
			res.json(users);
		}
	});
});

app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello DevOps Backend! V1.0')
})
