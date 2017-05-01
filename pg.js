var pg = require('pg');
 
var config = {
  user: 'uhyskjwhpaqiyp', //env var: PGUSER 
  database: 'd76btm774cq8t4', //env var: PGDATABASE 
  password: '7c966dba87d6291574dd6c50662270efb68039ede9b1f05b6fbab9561c3b1dbb', //env var: PGPASSWORD 
  host: 'ec2-54-243-107-66.compute-1.amazonaws.com', // Server hosting the postgres database 
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
