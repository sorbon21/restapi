var jwt=require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var pool = require('../../pg');
var ecnrypt=require('sha256');

router.get('/',function(req,res)
{
	
	res.send("Отправьте свoи идентификационные данные<br>для получения токена! например<br>login:alex<br>password:merser");

});
router.post('/',function(req,res)
{

 pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        var r=req.body;
        if (r.login&&r.password)
        {
	    var pass=ecnrypt.x2(req.body.password);
        client.query("select * from autch where login= $1;",[r.login], function(err, result)
        {

           if(!err&&result.rows.length==1)
           {
           	if (result.rows[0].login==r.login&&result.rows[0].password==pass)
           	{
	           	var user={status:result.rows[0].id_status};
				var token=jwt.sign(user,process.env.SECRET_KEY,{expiresIn:5000});
				res.json({success:true,token:token});
    
           	}else
           		res.json({success:false,token:null});
            }
            else
                res.json(err);

        });

        }else{
        	res.send("Не  правильные параметры были переданы!");
        }
    });
});
module.exports = router;
