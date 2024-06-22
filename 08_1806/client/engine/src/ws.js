import { Figure } from "./plat/plat";
import { vec3 } from "./mth/vec3";

const host = "localhost";
const port = "8000";
let userName;
let playersPool = {};
let mainRender;
let avatars = {};
let shaders = {};
let materials = {};
let prims = {};
let webSocket;
let tex;

export function wsInit(render) {
    userName = sessionStorage.getItem("name");

    mainRender = render;
    let socket = new WebSocket(`ws://${host}:${port}`);
    webSocket = socket;

    tex = render.newTexture("./bin/textures/em.jpg");

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
        for (let p in m.players) {
            if (avatars[p] == undefined) {
                // Step 1: Hash your email address using SHA-256.
                const hashedEmail = CryptoJS.SHA256(m.players[p].id);
                // Step 2: Construct the Gravatar URL.
                const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
                avatars[p] = mainRender.newTexture(`https://www.gravatar.com/avatar/${hashedEmail}`);
            }
            if (shaders[p] == undefined) {
                shaders[p] = mainRender.newShader("default");
            }
            if (prims[p] == undefined) {
                shaders[p] = mainRender.newShader("default");
                materials[p] = shaders[p].newMaterial(vec3(0.1),
                    vec3(1, 0.1, 0.1),
                    vec3(0.3),
                    90,
                    1.0
                );
                materials[p].attachTexture(tex, 0);
                materials[p].update();
                const fig = new Figure();
                fig.setCube();
                prims[p] = fig.makePrim(materials[p]);
            }
        }
    }
    if (m.type == "shader") {
        /*if (shaders[m.id] == undefined) {
            shaders[m.id] = mainRender.newShader("default");
        }*/
        prims[m.id].mtl.shd.update(m.source, "frag");
    }
}

export function onInterval(socket) {
    // Sending coords to the server
    socket.send(JSON.stringify({ type: "coords", id: userName, coords: { trans: mainRender.control.transform, pos: mainRender.control.position } }));
    // Asking for getting coords from server
    socket.send(JSON.stringify({ type: "get_coords" }));
}

export function getPlayers() {
    return { players: playersPool, id: userName, avatars: avatars, prims: prims };
}

export function sendObject(object) {
    object.id = userName;
    webSocket.send(JSON.stringify(object));
}