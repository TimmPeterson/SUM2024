import http from "node:http";
import { WebSocketServer } from "ws";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { serverInit, onConnection, onMessage, onClose } from "./players.js";

serverInit();

const app = express();
let counter = 0;
app.get("/", (req, res, next) => {
  counter = counter + 1;
  console.log(counter);
  next();
});

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  // Attaching call back on getting message from client
  ws.on("message", (m) => {
    //console.log("Hello from client");
    onMessage(ws, m);
  });

  // Removing socket from pool of sockets on closikng it
  ws.on("close", () => {
    onClose(ws);
  });

  onConnection(ws);
});

const host = "localhost";
const port = 8000;

server.listen(port, host, () => {
  console.log(`server started on http://${host}:${port}`);
});
