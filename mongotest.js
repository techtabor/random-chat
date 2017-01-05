var express = require('express');
//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/i_can_write_anything_here');
//app deklaralas
var app = express();
// define model =================
var User = mongoose.model('User', {
    username : String,
    userid: Number
});

var online = [];

app.get('/', function (req, res) {
    User.find(function(err, users) {
        var usernames = [];
    var userids = [];
        for (var i = 0; i < users.length; ++i) {
            usernames.push(users[i].username);
      userids.push(users[i].userid)
        }
        console.log(usernames);
        console.log(userids);
        res.send('users logged to console');
    });
});

//adding user via get
app.get('/add_users', function(req, res) {
	username=req.query['username'];
	userid=req.query['userid'];
    User.create({username:username, userid:userid});
    res.send('users created')
});

//get a user online
app.get('/add_online', function(req, res) {
	userid=req.query['userid'];
	online.push(userid);
    res.send('user online')
});

//remove user from online
app.get('/offline', function(req, res) {
	userid=req.query['userid'];
	var index = online.indexOf(userid);
	if (index > -1) {
    	online.splice(index, 1);
	}
    res.send('user offline')
});

//list online users
app.get('/online', function(req, res) {
	console.log(online);
	res.send("online user's ids logged to console");
});

app.get('/match', function(req, res) {
	console.log(online);
	res.send("online user's ids logged to console");
});

app.listen(3000, function () {
    console.log('The server is set up, and listening on port 3000.');
});