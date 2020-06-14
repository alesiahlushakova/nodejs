const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log('handler 1-forward');
    next();
      console.log('handler 1-back');
});

app.use((req,res,next)=>{
      console.log('handler 2-forward');
    next();
     console.log('handler 2-back');
});
app.use((req,res,next)=>{
   console.log('handler 3-forward');
    next();
     console.log('handler 3-back');
});

app.get('/',(req,res)=>{
	console.log('get / forward handler 4');
	res.send("<h2> handler 4 </h2>");
	console.log('get / back handler 4');
})


app.post('/',(req,res)=>{
	console.log('post / forward handler 5');
	res.send("<h2> handler 5 </h2>");
	console.log('post / back handler 5');
})

app.put('/',(req,res)=>{
		console.log('put / forward handler 6');
	res.send("<h2> handler 6 </h2>");
	console.log('put / back handler 6');
})

app.delete('/',(req,res)=>{
		console.log('delete / forward handler 7');
	res.send("<h2> handler 7 </h2>");
	console.log('delete / back handler 7');
})

app.listen(3000);