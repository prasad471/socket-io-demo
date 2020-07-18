const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser);
let x = true;

const server = app.listen(3000, () => {
  console.log("Started in 3000");
});

const io = socket(server);

io.sockets.on("connection", (socket) => {
  console.log(`new connection id: ${socket.id}`);
  sendData(socket);
});


function sendData(socket) {
  const obj = {
    sensor: { uuid: "test", motor_rpm: Math.random()*10000, output: Math.random()*100000 },
    lidar: {
      memory: { total: Math.random()*10000, available: Math.random()*10000 },
      cpu: { "1": Math.random()*10000, "2": Math.random()*10000 },
    },
  };
  socket.emit(
    "data",
    obj
  );
  setTimeout(() => {
    sendData(socket);
  }, 10000);
}
