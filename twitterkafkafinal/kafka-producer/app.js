var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('./passport')
const passport = require("passport");
//var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var cors = require('cors');
var logger = require('morgan');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var app = express();
app.set('socketio', io);



//var requireAuth = passport.authenticate('jwt', {session: false});
var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
//var fileHandlingRouter = require('./routes/fileHandlingRoute');

var conversationRouter = require('./routes/conversation');
var tweetRouter = require('./routes/tweet');

//var tweetRouter = require('./routes/tweet');
var recommendationRouter = require('./routes/recommendation');
var graphRouter = require('./routes/graphsRoute');
var hashtagRouter = require('./routes/hashtagRoute');
var listRouter = require('./routes/list');




//var cors = require('cors');
//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(cors({ origin: 'http://localhost:3000 ', credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {//http://localhost:3009
  //console.log("Request",req);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


/*app.use(function(req,res,next){
  res.writeHead(200, {'Content-Type': 'application/json'});
  next();
});*/

//Routes
//app.use('/auth', auth);
//app.use('/',indexRouter);
app.use('/api', indexRouter);
app.use('/conversation', conversationRouter);
app.use('/api/tweet', tweetRouter);
app.use('/user',usersRouter);


app.use('/graphs',requireAuth,graphRouter)
//app.use('/user',userRouter);
app.use('/recommendation',requireAuth,recommendationRouter);
app.use('/hashtag',requireAuth,hashtagRouter);
app.use('/api/list',requireAuth, listRouter);



//app.use('/fileHandling',requireAuth, fileHandlingRouter);
//app.use('/ownerRestro',requireAuth, ownerRestroRouter);

//app.use('/buyerOrders',requireAuth, buyerOrderMgmtRoute);
//app.use('/restroOrders',requireAuth, restroOrderMgmtRoute);

/*app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).send("YAY! this is a protected Route")
})*/


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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log(req);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { console.log("Erru jjdjd djdj ",err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  console.log(err);
  res.send(err.message);
});


function requireAuth(req, res, next) {
  //var token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTkzMzZjOTFlN2QwNGVjODdiZWU1ZCIsInR5cGVfb2ZfdXNlciI6InVzZXIiLCJpYXQiOjE1NzI5MzA5MDMsImV4cCI6MTU3MzUzMDkwM30.MMDAxupkcriJ5TtqgYvQ0VLU4JXObd1Xn2SCVDbemhI";
  
  //req.headers.authorization = "Bearer " + token;
  //console.log("REquest ",req.headers.authorization)
  //req.set("Authorization", "Bearer " + token)
  passport.authenticate('jwt', function(err,result) {
    //console.log("Error ",err);
    //console.log("result ",result);
    //if (err) return next(err);
    /*if (!user) throw new AuthError('401', 'User is not authenticated.');
    req.user = user;*/

    if(result==false)
       return res.status(401).send({ error: true,message:"Unauthorised Access" });


    next();
  })(req, res, next);
}

module.exports = app;
