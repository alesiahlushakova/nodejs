const exec = require('child_process').exec;
const dir = exec('dir', {encoding: 'utf8'}, (error, stdout, stderr)=>{
	if(stderr) console.log('stderr',stderr);
	else console.log('stdout',stdout);
})