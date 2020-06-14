const express = require("express");
const app = express();
const cookieparser = require('cookie-parser')();

app.use(cookieparser);

app.get('/', (req,res, next)=>{
	let myid = req.cookies.myid;

	if(!isFinite(myid)) ++myid;
	else myid=0;

	console.log('cookies', req.cookies);
	if(myid>5) res.clearCookie('myid').send(`myid= ${myid=0}`);
	else res.cookies('myid', myid).send(`myid= ${myid}`);
	console.log('myid', myid);
});

app.listen(3000);