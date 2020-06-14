 var WebSocketServer = require('ws').Server,
    ws = new WebSocketServer({port: 4000});

 ws.on('connection', function(conn) {
         conn.on('message', function(message) {
         console.log('message from client:  %s', message);
         conn.send('Your message = ' + message);
    });
});
