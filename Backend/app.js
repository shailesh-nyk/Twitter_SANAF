const express = require('express');
const http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');

var db_config = require('./config/db_config');
db_config.connectDB();

const app = express();
app.use('/public/', express.static('./public/'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log('API server listening on ', port)
});

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


// Set up middleware
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

var indexRouter = require('./routes/index');
var conversationRouter = require('./routes/conversation');
var tweetRouter = require('./routes/tweet');

// app.use('/api', requireAuth,  indexRouter);
app.use('/api', indexRouter);
app.use('/conversation', conversationRouter);
app.use('/api/tweet', tweetRouter);

module.exports = app;