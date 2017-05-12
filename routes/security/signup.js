var express = require('express');
var router = express.Router();
var ecnrypt=require('sha256');
module.exports = router;
var pool = require('../../pg');


router.post('/',function(req,res,next)
{
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;
        if (r.login&&r.password&&r.name&&r.role_id)
        {

        
        var pass=ecnrypt.x2(req.body.password);
        client.query("INSERT INTO auth(name, login, password,role_id) VALUES ($1,$2,$3,$4);",[r.name, r.login, pass,r.role_id], function(err, result)
        {
           if(!err)
                res.json({user:"add"});
            else
                res.json(err);

        });

        }else{
        	res.json({info:"wrong params"});
        }

    });

});


module.exports = router;













