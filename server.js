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

app.use('/api/image', require('./routes/image.routes'));

const User = require('./models/User');
const Message = require('./models/Message');

const io = socketIO(server)
io.on('connection', socket => {
  console.log('New client connected')

  sendStatus = (status) => {
    socket.emit('status', status);
  }

  socket.on('user-login', async (userName) => {    
    if (await User.findOne({ userName: userName })){
      io.emit('onlineUsers', 10);
      socket.emit('success-login', userName);
    } else {
      user = new User({userName:userName});
      user.save((err, data) => {
          if(err){
            sendStatus(err);
          } else {
            sendStatus('User added');
            socket.emit('success-login', data.userName);
          }
      });
    }
  });

  socket.on('message-history-call', async () => {
    await Message.find((err, data) => {
        if(err){
          sendStatus(err);
        } else {
          sendStatus('Messages received');
          socket.emit('message-history-receipt', data);
        }
    });
  });

  socket.on('save-message', async (message) => {
    message = new Message(message);
    await message.save((err, data) => {
      if(err){
        sendStatus(err);
      } else {
        sendStatus('Message saved');
        io.emit('message-receipt', data);
      }
    });
  });

  // Terminar de implementar
  socket.on('join', (data) => {
    socket.nickname = data.nickName;
    users[socket.nickname] = socket;

    let userObj = {
        nickName: data.nickName,
        socketId: socket.id
    }
    users.push(userObj);
    io.emit('onlineUsers', users);
  });

  socket.on('disconnect',() =>{
    console.log('new desconnection made');
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))