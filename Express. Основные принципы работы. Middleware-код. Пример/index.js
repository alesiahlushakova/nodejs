const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log('handler 1');
    next();
});

app.use((req,res,next)=>{
    console.log('handler2');
    next();
});
app.use((req,res,next)=>{
    console.log('handler 3');
    res.send("<h2> handler 3</h2>")
});

app.listen(3000);