const app = require("express")();
const xmlparser = require("express-xml-bodyparser");
const xmlbuilder = require ('xmlbuilder');

app.use(xmlparser());

app.post('/xml', (req,res,next)=>{
    console.log('req.body', req.body);

    let x = req.body.calculate.x[0].$.value;
    let y = req.body.calculate.y[0].$.value;

    let result = xmlbuilder.create('result').att('server','16-06');
    result.ele('sum',{value:x+y});

    console.log('res = \n', result.toString({pretty:true}));
})

app.listen(3000);
