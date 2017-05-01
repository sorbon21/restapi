var pg = require('pg');
 
var config = {
  user: 'iqtgipyxqcvfqi', //env var: PGUSER 
  database: 'db6p6mpeb0va0u', //env var: PGDATABASE 
  password: '23cf670a4ce3d9682a3dc2b0a2f8929d82643ff77a1bff32749558bc952af8e6', //env var: PGPASSWORD 
  host: 'ec2-50-17-236-15.compute-1.amazonaws.com', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  sslmode: 'require',
  ssl: "on",
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};
var pool = new pg.Pool(config);

pool.on('error', function (err, client) 
{
  console.error('idle client error', err.message, err.stack)
})

module.exports=pool;
