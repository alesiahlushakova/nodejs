const app = require("express");

app.get('/api/:x/:y', (req,res,next)=>{
	console.log('uri params = ', req.params);
	console.log('uri params, x = ', req.params.x);
	console.log('uri params,y = ', req.params.y);
	res.send('get uri params');
});

app.listen(3000);