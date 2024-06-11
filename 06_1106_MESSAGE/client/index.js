console.log("ABC");

const host = "localhost";
const port = 8000;

let socket = new WebSocket(`ws://${host}:${port}`);

function initializeCommunication() {

    let p = document.getElementById(`p`);
    let input = document.getElementById(`input`);

    socket.onopen = (e) => {
        //console.log("Socket open:)");
        //socket.send("Hello from socket");

    };
    socket.onmessage = (e) => {
        //let a = JSON.parse(e.data);
        //console.log(`Host semd me: ${e.data.toString()}`);
        let messages = JSON.parse(e.data);

        p.textContent = "";
        for (let msg of messages) {
            p.innerHTML += msg.user + ":   ";
            p.innerHTML += msg.text;
            p.innerHTML += "<br />"
        }
    };
}

window.addEventListener(
    "load", () => {

        let x = document.getElementById(`test`);
        let p = document.getElementById(`p`);
        let input = document.getElementById(`input`);
        let input_name = document.getElementById(`input name`);

        x.addEventListener("click", () => {
            if (socket.bufferedAmount == 0) {
                socket.send(JSON.stringify({ user: input_name.value, text: input.value }));
            }
        });

        // p.addEventListener("click", () => {
        //     if (socket.bufferedAmount == 0)
        //         socket.send(1);
        // });

        initializeCommunication();
    }
);
