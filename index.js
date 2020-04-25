var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const mongoose = require('mongoose');
var http = require('http');

const login = require('./routes/login');
var broadcast = require('./routes/broadcast');

var dotenv = require('dotenv')
dotenv.config();

const app = express();

//app related configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use("/broadcast", broadcast);
app.use("/login", login);

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
var server = http.createServer(app);

// const server = app.listen(port, () => console.log(`Express server listening on port ${port}`));
server.listen(port, () => {
    console.log('listening on port', port);
});

var uuid = require('uuid');
const { v1: uuidv1 } = require('uuid');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

//chat sessions storage
var chatSessions = {
    clients: [],
    messages: [],
};

wss.on('connection', function connection(ws) {
    console.log('ws connection succeeded');
    const clientId = uuidv1();
    console.log('connection established for client', clientId);
    
    //aliasing the current chat sessions object
    var session = chatSessions;

    // assign index and store in memory db
    ws.uuid = clientId;
    session.clients.push(ws);

    ws.on('message', function incoming(data) {
    session.messages.push(data);
    session.clients.forEach(w => w.send(data));
    console.log('sessions object', session)
    });
});