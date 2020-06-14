var http =require('http');
var query= require('querystring');

let parms = query.stringify({x:3,y:4, s:"aaa"});
let path=`/threepar`;
let options= {
    host: 'localhost',
    path: path,
    port: 5000,
    method:'POST'
}
const req = http.request(options,(res)=> {
    console.log('http.request: statusCode: ',res.statusCode);
    let data = '';
    res.on('data',(chunk) =>
    {
        console.log('http.request: data: body=', data+=chunk.toString('utf-8'));
    });
    res.on('end',()=>{ console.log('http.request: end: body=', data);
    }); 
});
    req.on('error', (e)=> {console.log('error:', e.message);
});
req.write(parms);
req.end();