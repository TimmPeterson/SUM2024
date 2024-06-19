export function wsInit(render) {
    const host = "localhost";
    const port = "8000";

    mainRender = render;
    let socket = new WebSocket(`ws://${host}:${port}`);

    socket.onopen = e => onConnection(socket, e);
    socket.onmessage = e => onMessage(socket, JSON.parse(e.data));
    setInterval(() => onInterval(socket), 1);
}

let id = null;
let playersPool = [];
let mainRender;

function onConnection(socket, m) {
    console.log("hello from client");
    socket.send(JSON.stringify({ type: "connected" }));
    //id = JSON.parse(m).id;
}

function onMessage(socket, m) {
    console.log("message got");
    if (m.type == "id")
        id = m.id;
    if (m.type == "players")
        playersPool = m.players;
}

export function onInterval(socket) {
    socket.send(JSON.stringify({ id: id, type: "coords", coords: { trans: mainRender.control.transform, pos: mainRender.control.position } }));
    socket.send(JSON.stringify({ type: "get_coords" }));
}

export function getPlayers() {
    return { players: playersPool, id: id };
}