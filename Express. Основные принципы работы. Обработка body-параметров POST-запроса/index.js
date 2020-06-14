const app = require("express");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}))

app.post('/form', (req,res,next)=>{
	if(req.body) {
		console.log('name = ', req.body.name || 'no param' );
		console.log('bday = ', req.body.bday || 'no param' );
		console.log('press = ', req.body.press || 'no param' );

		res.send('post body params');

	}
	else res.status(400).send('no bodyparser');
});

app.listen(3000);