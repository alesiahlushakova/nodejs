let http = require('http');
let fs = require('fs');

let handler = (req, res) => {
    if(req.method == 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./exampleHTTPupload.html'));
    }
    else if (req.method == 'POST') {
        let result = '';
        req.on('data', data => {result += data;});
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write('<H1>FileUploaded</H1>');
            res.end(result);
        });
    }
    else
    {
        res.end('this method not allowed');
    }
}


let server = http.createServer();
server.listen(3000, (v) => {console.log('serv.listen(3000)')})
    .on('error', (e) => {console.log(e.message)})
    .on('request', handler)