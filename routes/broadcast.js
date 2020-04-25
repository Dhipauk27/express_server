var express = require('express');
const WebSocket = require("ws");
const router = express.Router();

//POST request
router.post("/", async(req, res) => {
  try {
    console.log('inside POST request of broadcast');
    var message = req.body.message;
    
    //create web socket connection
    const url = `ws://localhost:5000`;
    this.socket = new WebSocket(url);
  
    //establish connection and send message
    var status = await broadcastMessageToWS(this.socket, message);

  } catch (error) {
    console.log(error)
  }
});

function broadcastMessageToWS(socket, message) {
  return new Promise(async (resolve, reject) => {
    socket.addEventListener('open', function(event) {
      socket.send(JSON.stringify({message}));
    })
    resolve('connection established')
  })
}

module.exports = router;