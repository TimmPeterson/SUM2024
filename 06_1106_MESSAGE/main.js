import http from "node:http";
import fs from "node:fs/promises";
import { WebSocketServer } from "ws"
import express from "express"

/*
const requestListen = async (req, res) => {
    console.log(req.url);
    if (req.url == "/") {
        const contents = await fs.readFile(process.cwd() + "/client/index.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    } else if (req.url.endsWith(".js")) {
        const contents = await fs.readFile(process.cwd() + "/client" + req.url);
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    }
}
*/

const app = express();

class Message {
    constructor(user, text) {
        this.user = user;
        this.text = text;
    }
}

let messages = [];

let sockets = [];

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
    ws.on("message", (message) => {
        //console.log(JSON.parse(message));

        messages.push(JSON.parse(message.toString()));
        for (let sck of sockets)
            sck.send(JSON.stringify(messages));
    });
    ws.on("close", () => {
        sockets.slice(sockets.indexOf(ws), 1);
    });

    //ws.send(JSON.stringify(messages));
    sockets.push(ws);
});

const host = "localhost";
const port = 8000;

server.listen(port, host, () => {
    console.log(`server started on http://${host}:${port}`);
});

const main = () => {

}

main();