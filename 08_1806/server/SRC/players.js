import { DB } from "./db.js";

let db;

let playersPool = [];

export async function serverInit() {
    db = new DB("mongodb://127.0.0.1:27017", "TP5", "players");
    await db.connect();
}

let noofUser = 0;

export function onConnection(ws) {
}

///////////////
// Protocol:
//   - message.type == coords:
//       --> playerName: ...
//       --> playerCoords: ...
//////////////

export function onMessage(ws, m) {
    let message = JSON.parse(m.toString());

    if (message.type == "connected") {
        ws.send(JSON.stringify({ type: "id", id: noofUser }));
        noofUser++;
    }
    if (message.text != undefined) {
        console.log(message.text);
    }
    if (message.type == "coords") {
        playersPool[message.id] = { id: message.id, coords: message.coords };
    }

    if (message.type == "get_coords") {
        ws.send(JSON.stringify({ type: "players", players: playersPool }));
    }
}

export function onClose(ws, m) {

}