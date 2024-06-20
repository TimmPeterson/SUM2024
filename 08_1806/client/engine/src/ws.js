const host = "localhost";
const port = "8000";
let userName;
let playersPool = {};
let mainRender;
let avatars = {};

export function wsInit(render) {
    userName = sessionStorage.getItem("name");

    mainRender = render;
    let socket = new WebSocket(`ws://${host}:${port}`);

    socket.onopen = e => onConnection(socket, e);
    socket.onmessage = e => onMessage(socket, JSON.parse(e.data));
    setInterval(() => onInterval(socket), 1);
}


function onConnection(socket, m) {
    console.log("hello from client");
    socket.send(JSON.stringify({ type: "connected" }));
}

function onMessage(socket, m) {
    if (m.type == "players") {
        playersPool = m.players;
        for (let p in m.players)
            if (avatars[p] == undefined) {
                // Step 1: Hash your email address using SHA-256.
                const hashedEmail = CryptoJS.SHA256(m.players[p].id);
                // Step 2: Construct the Gravatar URL.
                const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
                avatars[p] = mainRender.newTexture(`https://www.gravatar.com/avatar/${hashedEmail}`);
            }
    }
}

export function onInterval(socket) {
    // Sending coords to the server
    socket.send(JSON.stringify({ type: "coords", id: userName, coords: { trans: mainRender.control.transform, pos: mainRender.control.position } }));
    // Asking for getting coords from server
    socket.send(JSON.stringify({ type: "get_coords" }));
}

export function getPlayers() {
    return { players: playersPool, id: userName, avatars: avatars };
}