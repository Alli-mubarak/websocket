const WebSocket = require('ws');
const server = new WebSocket.Server({port: 5640});

const users = [];
function generateID(){
    let chars = 'Q1WERTY9UIOPA0SDFGHJ7KLZ6XCVBN8Mqwe5rtyuiop2asdfghjk3lz4xcvbnm'
    let id = '';
    for(let i=0; i<16; i++){
        id += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return id;
}
server.on('connection', (socket) => {
    // generate a unique id for every user
    const userID = generateID();
    users.push(userID)
    console.log('New user connected: ', userID);
    
    // send the id generated to the user
    socket.send(JSON.stringify({ type: 'userId', id: userID }));

    console.log(users);
    let d = new Date();
    let cTime = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    console.log(cTime);

    // listen for messages from users
    socket.on("message", (message) => {
        const text = message.toString();
        console.log('message received : ', text, 'from user: ', userID);
        
        // broadcast the message to all connected users
        server.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({ type: 'message', from: userID, text: text, time: d.toLocaleString() }));
            }
        });
    })
});
console.log('Websocket is running on port: 5640');