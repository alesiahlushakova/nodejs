var http = require('http');
var url = require('url');
var fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var url = require('url');
async function init() {
  try {
    // Create a connection pool which will later be accessed via the
    // pool cache as the 'default' pool.
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    });
    console.log('Connection pool started');
  } catch (err) {
    console.error('init() error: ' + err.message);
  } 
}

async function ExecuteSQL(sql) {
  let connection;
  try {
    console.log(sql);
    // Get a connection from the default pool
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql);
    await connection.execute('Commit');
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // Put the connection back in the pool
        await connection.close();
      } catch (err) {
        console.error(err);
        process.exit(0);
      }
    }
  }
}

async function closePoolAndExit() {
  console.log('\nTerminating');
  try {
    // Get the pool from the pool cache and close it when no
    // connections are in use, or force it closed after 10 seconds
    // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file
    await oracledb.getPool().close(10);
    console.log('Pool closed');
    process.exit(0);
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

process
  .once('SIGTERM', closePoolAndExit)
  .once('SIGINT',  closePoolAndExit);
async function http_handler(req,res)
{
   if(req.method=='DELETE'){
    console.log(url.parse(req.url).pathname);
    if(url.parse(req.url).pathname.search('\/[A-z]+')!=(-1)){
        let p = url.parse(req.url,true);
        let r =decodeURI(p.pathname).split('/');
        let o = r[1];
        let result = await ExecuteSQL("SELECT * FROM EXAM where NAME='"+o+"'");
        let result2 = await ExecuteSQL("Delete from EXAM where NAME='"+o+"'");
          if(result2.rowsAffected>0)
          {
          res.writeHead(200,{'Content-Type': 'application/json'});
          res.end(`{"name":"${result.rows[0][0]}","surname":"${result.rows[0][1]}"}`);
          }
          else
          {
            console.log(result2.rowsAffected);
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(`{"error":"1","messsage":"Такого кода кафедры для удаления не существует"}`);
          }
    }
    
  }
    
}
init();
var server=http.createServer(function (req, res){
    try{
        http_handler(req,res);
    }
    catch(e)
    {
        console.error(e);
    }

}).listen(5000);
