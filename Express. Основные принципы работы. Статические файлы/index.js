const express = require("express");
const app = express();

app.use('/static', express.static('public'));

app.use((req,res,next)=>{
	console.log("handler");
	next();
});
app.listen(3000, ()=> console.log(
	'server start'));