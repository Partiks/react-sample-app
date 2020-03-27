//Load express module with `require` directive
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express()
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');

app.use(cors());
app.use(bodyParser.json());

//Launch listening server on port 3000
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})


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

