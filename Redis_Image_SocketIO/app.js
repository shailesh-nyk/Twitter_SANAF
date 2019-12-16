const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const upload = multer({
  dest: 'images/'
});

app.set('socketio', io);
app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


app.get('/', (req, res) => {
  res.json({ message: "Server Working fine bruhh" });
});

//Get names of all files uploaded
app.get('/files', (req, res) => {
  fs.readdir('./images/', (err, files) => {
    let filenames = []
    for (let i = 0; i < files.length; i++) {
      filenames.push(files[i]);
    }
    res.json({ files: filenames })
  });

});

app.post('/', upload.single('file-to-upload'), (req, res) => {
  res.json({ message:"File saved succesfully", fileName: req.file.filename });
});

app.post('/send', (req, res) => { 
 let { reciever_id, message } = req.body; 
 console.log("Receiver id :",reciever_id," Message :",message); 
 let receiverSocket = users[reciever_id];
  if (receiverSocket) {
    receiverSocket.emit('private', { message },function(data){
        console.log("Reseponse after emit----",data);   
        });
    res.json({ message: "Message delivered succesfullly" });
  }
  else {
    res.status(400).json({ error: 'Failed to deliver the message' });
  }

});

app.post('/broadcast', (req, res) => {
  let  recievers  = req.body;
  console.log("Receivers :", recievers);
  for (let i = 0; i < recievers.length; i++) {
    let receiverSocket = users[recievers[i]];
    if (receiverSocket) {
      receiverSocket.emit('newsfeed', { msg: "Reload" });
     }
   }
   res.json({ message: "Message delivered succesfullly" });
});



const port = parseInt(process.env.PORT, 10) || 3000;
server.listen(port, () => console.log(`server listening on`, port));

let users = {};
app.set('users', users);
io.on('connection', function (socket) {
  socket.on('openSocket', function (id) {
    users[id] = socket;
    console.log("------------------------");
    console.log("User ", id, " connected");
    console.log("------------------------");
  });

  socket.on('disconnect', function(){
    console.log("------------------------");   
    console.log('user disconnected');
    console.log("------------------------");
  });

});


