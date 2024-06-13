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

// Text input for partner
let input_partner;

// Scroll div variable
let div_scroll;

// 
let input_file;

/*

Send button clicked:
    - client -> server: {user: "...", to: "...", text: "..."}
    - on server: 
                push message to the tablet[msg.from].messages[msg.to].push(msg);
                push message to the tablet[msg.to].messages[msg.from].push(msg);

Update on each second:
    - client -> server: {get: true, user: "...", to: "..."}
    - on server:
                send to socket:
                            ws.send(tablet[msg.from].messages);           
*/

let old_length = 0;

// Message from server handle function
function onMessage(event) {
    console.log("on message");

    let messages = JSON.parse(event.data);

    //paragraph.textContent = "";
    //const space =  `           `; 
    div_scroll.innerHTML = "";
    const par = `<div class="a"><p>`;
    const par_self = `<div class="self"><p class="par_self">`;

    for (let msg of messages) {
        //div_scroll.innerHTML += "<p><b>[" + msg.user + "]</b>";
        //div_scroll.innerHTML += msg.text + "</p>";
        if (msg.user == input_name.value)
            div_scroll.innerHTML += par_self + "<b>" + msg.user + "</b><br />  " + msg.text + "</p></div>";
        else
            div_scroll.innerHTML += par + "<b>" + msg.user + "</b><br />  " + msg.text + "</p></div>";

        /*
        paragraph.innerHTML += "<b>[" + msg.user + "]</b>   ";
        paragraph.innerHTML += "&nbsp&nbsp" + msg.text;
        paragraph.innerHTML += "<br />"
        */
    }

    // let x = true;
    // for (let l in messages) {
    //     if (old_messages[l] != messages[l])
    //         x = false;
    // }
    if (old_length != messages.length) {
        div_scroll.scrollTop = div_scroll.scrollHeight;
    }
    old_length = messages.length;

};

// Function to initialize websocket
function initializeCommunication() {
    socket.onopen = (e) => {
        console.log("socket open on client");
        //socket.send(JSON.stringify({ client_start: true }));
    }
    socket.onmessage = (e) => onMessage(e);
}

// Initializing client on window loading event attachment
window.addEventListener(
    "load", () => {

        input_name = document.getElementById(`username`);
        input_message = document.getElementById(`message`);
        input_partner = document.getElementById(`partner`);
        paragraph = document.getElementById(`paragraph`);
        div_scroll = document.getElementById(`scroll`);
        input_file = document.getElementById(`file`);

        let button_send = document.getElementById(`send`);

        /*
        button_send.addEventListener("click", () => {
            if (socket.bufferedAmount == 0) {
                if (input_partner.value == "Global") {
                    socket.send(JSON.stringify({ send_global: true, partner: input_partner.value, user: input_name.value, text: input_message.value }));
                } else {
                    socket.send(JSON.stringify({ partner: input_partner.value, user: input_name.value, text: input_message.value }));
                }
            }
        });
*/
        /*
<button id="send" form="" width="100%" class="glow-on-hover" type="button">Send message</button><br />
        */
        let cur_img = null;
        input_message.addEventListener("keydown", (e) => {
            if (socket.bufferedAmount == 0 && e.key == "Enter") {
                if (input_partner.value == "Global") {
                    if (cur_img != null) {
                        let img = `<image class="img" src="${URL.createObjectURL(input_file.files[0])}"></image><br />`;
                        socket.send(JSON.stringify({ send_global: true, partner: input_partner.value, user: input_name.value, text: img + input_message.value }));
                        input_message.value = "";
                        cur_img = null;
                    } else {
                        socket.send(JSON.stringify({ send_global: true, partner: input_partner.value, user: input_name.value, text: input_message.value }));
                        input_message.value = "";
                    }

                } else {
                    socket.send(JSON.stringify({ partner: input_partner.value, user: input_name.value, text: input_message.value }));
                    input_message.value = "";
                }
            }
        });
        /*
        
        */
        input_file.addEventListener("change", e => {
            cur_img = 1;
        });
        /*
        input_name.onblur = () => {
            socket.send(JSON.stringify({ client_start: true }));
        }
        */

        setInterval(() => {
            if (input_partner.value == "Global") {
                socket.send(JSON.stringify({ get_global: true, user: input_name.value, partner: input_partner.value }));
            } else {
                socket.send(JSON.stringify({ get: true, user: input_name.value, partner: input_partner.value }));
            }
        }, 200);

        initializeCommunication();
    }
);
