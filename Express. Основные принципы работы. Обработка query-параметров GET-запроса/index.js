const app = require("express");

app.get('/',(req,res,next)=>{
	console.log('get query params = ', req.query);

	if(req.query.x) console.log('x=',req.query.x);
	else console.log('x=','not defined');

	if(req.query.y) console.log('y=',req.query.y);
	else console.log('y=','not defined');

	res.send('get query params');
});

app.listen(3000);