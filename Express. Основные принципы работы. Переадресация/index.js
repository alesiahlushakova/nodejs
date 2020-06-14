const app = require("express")();

app.get('/A',(req, res,next)=>{
	console.log('get /a');
	res.redirect('/B');
});
app.get('/B',(req,res,next)=>{
	console.log('get /b');
	res.type.('html').send('get /b');

});
app.post('/A', (req,res,next)=>{
	console.log('post /a');
	res.redirect('/B');
});
app.post('/B',(req,res,next)=>{
	console.log('post /b');
	res.type('html').send('post /b');

});
app.post('/C', (req,res,next)=>{
	console.log('post /c');
	res.redirect(308,'/B')''
});
app.listen(3000);

//Код ответа на статус перенаправления "HTTP 308 Permanent Redirect" указывает, что запрошенный ресурс был окончательно перемещен в URL-адрес, указанный в Location. Браузер перенаправляется на эту страницу, а поисковые системы обновляют свои ссылки на ресурс
