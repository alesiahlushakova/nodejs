var http = require('http');
var url = require('url');
var fs = require('fs');
//let stat=require('./m07-01')('./static');
isStatic = (ext, fn)=>{ let reg = new RegExp(`^\/.+\.${ext}$`); return reg.test(fn);}
let pathStatic=(fn)=>{return `./static${fn}`;}
var k=0;
let pipeFile = (req, res, headers)=>{
    res.writeHead(200, headers);
    console.log(res.statusCode);
    console.log(k++);
	fs.createReadStream(pathStatic(req.url)).pipe(res);
}

sendFile = (req, res, headers)=>
{
	if(fs.access(pathStatic(req.url), fs.constants.R_OK,err=>{
		if(err) 
		{
			this.writeHTTP404(res);
		}
		else pipeFile(req,res,headers);
	}))
	{writeHTTP404(res)};
    }


let writeHTTP404=(res)=>{
		res.statusCode = 404;
		res.statusMessage = 'Resourse not found';
		res.end('Resourse not found');
}
let writeHTTP405=(res)=>{
	res.statusCode = 405;
	res.statusMessage = 'Use another method';
	res.end('Use another method');
}
let http_handler=(req,res)=>
{
	if(req.method=='GET'){
	if(isStatic('html', req.url)) sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
	else if(isStatic('css', req.url)) sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
	else if(isStatic('js', req.url)) sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
	else if(isStatic('png', req.url)) sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
	else if(isStatic('docx', req.url)) sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
	else writeHTTP404(res);
	}
	else writeHTTP405(res);
}
http.createServer(function (req, res){
		if(url.parse(req.url).pathname === '/html'){
			let html= fs.readFileSync('./static/index.html');
			res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
		}
		
		else
		{
			http_handler(req,res);
		}
}).listen(5000);