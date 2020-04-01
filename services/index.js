//Load express module with `require` directive
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');

var User = require ('./models/user');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://test-user:456@10.0.2.44:27017/partiks_db', function (err, res){
	if (err)
		console.log("MongoDB connection error");
	else
		console.log("MongoFB connection established successfully.");
});

//const connection = mongoose.connection;

//connection.once('open', () => {
//	console.log('MongoDB connection established succesfully.');
//})

//Launch listening server on port 3000
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})

app.get('/users', function (req, res) {
	console.log('DB users called');
	User.find( (err, users) => {
		if(err){
			console.log(err);
		}
		else{
			console.log(users);
			res.json(users);
		}
	});
});

app.get('/partiksPDF', function (req, res) {
	res.sendFile(`${__dirname}/result/lolpodo.pdf`);
});

app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello DevOps Backend!')
})


app.get('/result', function(req, res) {
//  var filename = __dirname + "/result/" + req.body.fileId + ".pdf";
  var filename = __dirname + "/result/" + req.body.fileId + "*";
  var listname = __dirname + "/result/list.txt";
  var result = __dirname + "/result/" + shell.grep(req.body.fileId, listname).toString().trim();

  shell.echo('search starts');
  console.log(result );

  try  {
      fs.statSync(result);
      res.sendFile(result);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
     res.send('Document Not Found.')
    }
  }
  shell.echo('search ends');

});

