import http from "node:http";
import fs from "node:fs/promises"; // for working with files
import { WebSocketServer } from "ws";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import morgan from "morgan";

/////
// Mongo initializing
/////

const url =
  "mongodb+srv://doadmin:x62jNC54Pi1W3t98@db-mongodb-pml30-2024-12312526.mongo.ondigitalocean.com/admin?tls=true&authSource=admin";
const Client = new MongoClient(url);
const connection = await Client.connect();
const dataBase = "PML30-2024-J";
const db = connection.db(dataBase);
const collection = db.collection("TP5");

/////
// End of mongo initialiation
/////

// Array with current pool of messages
let messages = [];

// Array with all users
let users = {
  user: { partner: [] },
};

// Array with current pool of sockets (clients)
// To send some messages to all of them
let sockets = [];

// Express for skip unnecessary messages
const app = express();

// Message counter
// For debug and for example
let counter = 0;
app.get("/", (req, res, next) => {
  counter = counter + 1;
  console.log(counter);
  next();
});

app.use(express.static("client"));
app.use(morgan("tiny"));

// Creating http server
const server = http.createServer(app);

// Creating server socket to send messages to clients
const wss = new WebSocketServer({ server });

// Event on server socket connecting to client socket
wss.on("connection", (ws) => {
  // Event on getting message on server from client socket
  ws.on("message", async (message) => {
    // Message should be an array of symbols.
    // We can convert it to string using msg.toString().
    // And then we can get an object from it using JSON.parse(msg) .
    // We should always send a string.
    // So we use JSON.stringify(msg) to convert object o string
    let msg = JSON.parse(message.toString());

    if (msg.get_global != undefined) {
      ws.send(JSON.stringify(messages));
    } else if (msg.send_global != undefined) {
      messages.push(msg);
      ws.send(JSON.stringify(messages));
    } else {
      if (msg.get != undefined) {
        // if (users[msg.user] == undefined || users[msg.user][msg.partner] == undefined)
        //     ws.send(JSON.stringify([]));
        // else
        //     ws.send(JSON.stringify(users[msg.user][msg.partner]));

        let n = await collection.countDocuments({ user: msg.user });
        if (n === 0) {
          ws.send(JSON.stringify([]));
        } else {
          for await (let js of collection.find({ user: msg.user })) {
            if (js.chats[msg.partner] == undefined) ws.send(JSON.stringify([]));
            else ws.send(JSON.stringify(js.chats[msg.partner]));
          }
        }
      } else {
        // if (users[msg.user] == undefined)
        //     users[msg.user] = {};
        // if (users[msg.partner] == undefined)
        //     users[msg.partner] = {};
        // if (users[msg.user][msg.partner] == undefined)
        //     users[msg.user][msg.partner] = [];
        // if (users[msg.partner][msg.user] == undefined)
        //     users[msg.partner][msg.user] = [];
        // users[msg.user][msg.partner].push(msg);
        // users[msg.partner][msg.user].push(msg);

        let js = { user: msg.user };
        let n = await collection.countDocuments(js);
        if (n === 0) {
          js.chats = {};
          js.chats[msg.partner] = [msg];
          await collection.insertOne(js);
        } else {
          for await (let js1 of collection.find(js)) {
            if (js1.chats[msg.partner] == undefined)
              js1.chats[msg.partner] = [msg];
            else js1.chats[msg.partner].push(msg);
            await collection.replaceOne(js, js1);
          }
        }
        js = { user: msg.partner };
        n = await collection.countDocuments(js);
        if (n === 0) {
          js.chats = {};
          js.chats[msg.user] = [msg];
          await collection.insertOne(js);
        } else {
          for await (let js1 of collection.find(js)) {
            if (js1.chats[msg.user] == undefined) js1.chats[msg.user] = [msg];
            else js1.chats[msg.user].push(msg);
            await collection.replaceOne(js, js1);
          }
        }
        //ws.send(JSON.stringify(users[msg.user][msg.partner]));
      }
    }
    /*
        if (msg.client_start != undefined) {
            ws.send(JSON.stringify(messages));
        } else {
            messages.push(msg);
            for (let sck of sockets)
                sck.send(JSON.stringify(messages));
        }
        */
  });

  // Removing socket from pool of sockets with callback on closing event
  ws.on("close", () => {
    sockets.slice(sockets.indexOf(ws), 1);
  });

  // Pushing current client socket to the pool of sockets on connection event
  sockets.push(ws);
});

// Some stuff for debug
const host = "localhost";
const port = 8000;
server.listen(port, host, () => {
  console.log(`server started on http://${host}:${port}`);
});

const main = () => {};
main();
