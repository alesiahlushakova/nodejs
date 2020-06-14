const express = require("express");
const app = require("express")();

app.use(express.json()) //body-parser

app.post('/json', (req,res, next)=>{
	if(req.body) {
		if (req.accepts('json')) res.type('json').send(JSON.stringify(Object.assign({src:'server'}, req.body)));
		else res.type('txt').send('server');
	}
	else res.status(400).type('txt').send('no parser');
});

app.listen(3000);