const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

const port = 4001
const app = express()
const server = http.createServer(app)

const mongoose = require('./database');
app.use(cors({origin:'http://localhost:8080'}));
app.use(express.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

let users = [];

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/message', require('./routes/message.routes'));
app.use('/api/image', require('./routes/image.routes'));

const io = socketIO(server)
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('join', (data) => {
    socket.nickname = data.nickName;
    users[socket.nickname] = socket;

    let userObj = {
        nickName: data.nickName,
        socketId: socket.id
    }
    users.push(userObj);
    io.emit('onlineUsers', users);
  })

  socket.on('send-public-message', (data) => {
    io.emit('message-received', data);
  });

  socket.on('disconnect',() =>{
    console.log('new desconnection made');
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))