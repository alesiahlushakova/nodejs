const child = require('child_process');
const fp = child.fork('2.js');

const f = ()  =>{
	console.log('1');
}
setInterval(f,3000);

let x=0;
const s = ()=>{fp.send(`from 1: ${++x}`)};
setInterval(s,6000);