const WebSocket = require('ws');
const server = new WebSocket.Server({port: 5640});
server.on('connection', (socket) => {
    console.log('User connected');

    socket.on("message", (message) => {
        const text = message.toString();
        console.log('Received', text);

        server.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(text);
            }
        });
    })
});
console.log('Websocket is running on port: 5640');