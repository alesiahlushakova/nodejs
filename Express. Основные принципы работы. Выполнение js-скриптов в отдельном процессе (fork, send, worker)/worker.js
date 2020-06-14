const {Worker, isMainThread}= require("worker_threads");

if(isMainThread){
	let w1 = new Worker(__filename);
	setInterval(()=>{console.log('main')},3000);
}
else {
	setInterval(()=>{console.log('w1')},6000);
}