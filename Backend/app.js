const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db_config = require('./config/db_config');
var db_config_mysql = require('./config/db_config_mysql');

app.set('socketio', io);
db_config.connectDB();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use('/public/', express.static('./public/'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(passport.initialize());


const port = parseInt(process.env.PORT, 10) || 8000;
server.listen(port, () => console.log(`server listening on`,port));


// Bring in defined Passport Strategy
require('./config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

var indexRouter = require('./routes/index');
var conversationRouter = require('./routes/conversation');
var tweetRouter = require('./routes/tweet');

var userRouter = require('./routes/userRoute');
var graphRouter = require('./routes/graphsRoute');

app.use('/api', indexRouter);
app.use('/conversation', conversationRouter);
app.use('/api/tweet', tweetRouter);
app.use('/user',userRouter)
app.use('/graphs',graphRouter)

let users = {};
app.set('users',users);
io.on('connection',function (socket) {
  socket.on('openSocket', function(id) {
    users[id] =  socket;
    console.log('\033[2J');
    console.log("------------------------");
    console.log("User ",id," connected");
    console.log("------------------------");
});
});

module.exports = app;