const fs = require('fs');
const app = require('express')();

app.get('/download', (req,res,next)=>{
	console.log('download');
	res.download('./file01.jpg', 'file01.jpg');
})

app.get('/attachment', (req,res,next)=>{
	console.log('attachment');
	res.attachment('./file01.jpg'); //add header
	let rs  = fs.ReadStream('./file01.jpg');
	rs.pipe(res);
})

app.listen(3000);