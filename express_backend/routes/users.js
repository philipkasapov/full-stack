var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function (req, res, next) {
  res.send('test');
});

router.get('/all', function (req, res, next) {
  let rawdata = fs.readFileSync('temp.json');
  let users = !rawdata || rawdata.length === 0 ? [] : JSON.parse(rawdata);
  res.send(users);
});

router.post('/add', function (req, res, next) {
  //newly added user
  const user = JSON.stringify(req.body);

  //fetch previously recorder users
  let rawdata = fs.readFileSync('temp.json');
  let users = !rawdata || rawdata.length === 0 ? [] : JSON.parse(rawdata);

  //add the new one
  users.push(user);

  //write in file
  let data = JSON.stringify(users);
  fs.writeFileSync('temp.json', data);

  res.send(true);
});

module.exports = router;
