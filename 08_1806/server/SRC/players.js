import { DB } from "./db.js";

let db;

let playersPool = {};

export async function serverInit() {
    //db = new DB("mongodb://127.0.0.1:27017", "TP5", "players");
    //await db.connect();
}

let noofUser = 0;

export function onConnection(ws) {
    // Pushing new socket to a pool of sockets
    //socketsPool.push({ socket: ws, id: null });
}

///////////////
// Protocol:
//   - message.type == coords:
//       --> playerName: ...
//       --> playerCoords: ...
//////////////

export function onMessage(ws, m) {
    let message = JSON.parse(m.toString());

    if (message.type == "shader") {
        for (let s in socketsPool) {
            socketsPool[s].send(JSON.stringify(message));
        }
    }

    if (message.type == "coords") {
        socketsPool[message.id] = ws;
        playersPool[message.id] = { id: message.id, coords: message.coords };
    }

    if (message.type == "get_coords") {
        ws.send(JSON.stringify({ type: "players", players: playersPool }));
    }
}

// Pool of all sockets
const socketsPool = {};

export function onClose(ws) {
    for (let i in socketsPool) {
        if (socketsPool[i] == ws) {
            delete playersPool[i];
            delete socketsPool[i];
        }
    }
}