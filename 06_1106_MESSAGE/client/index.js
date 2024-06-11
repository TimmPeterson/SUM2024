const host = "localhost";
const port = 8000;

// Socket for back connection with server
let socket = new WebSocket(`ws://${host}:${port}`);

// Text of all messages <p></p>
let paragraph;

// Text input field with username
let input_name;

// Text input field with message contant
let input_message;

// Message from server handle function
function onMessage(event) {
    console.log("on message");

    let messages = JSON.parse(event.data);

    paragraph.textContent = "";
    //const space =  `           `; 
    for (let msg of messages) {
        paragraph.innerHTML += "<b>[" + msg.user + "]</b>   ";
        paragraph.innerHTML += "&nbsp&nbsp" + msg.text;
        paragraph.innerHTML += "<br />"
    }
};

// Function to initialize websocket
function initializeCommunication() {
    socket.onopen = (e) => console.log("socket open on client");
    socket.onmessage = (e) => onMessage(e);
}

// Initializing client on window loading event attachment
window.addEventListener(
    "load", () => {

        input_name = document.getElementById(`username`);
        input_message = document.getElementById(`message`);
        paragraph = document.getElementById(`paragraph`);

        let button_send = document.getElementById(`send`);

        button_send.addEventListener("click", () => {
            if (socket.bufferedAmount == 0) {
                socket.send(JSON.stringify({ user: input_name.value, text: input_message.value }));
            }
        });

        initializeCommunication();
        socket.send(JSON.stringify({client_start: true}));
    }
);
