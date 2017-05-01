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
        if (r.login&&r.password&&r.name&&r.id_status)// если передан логин пароль и статус пользователя 
        {

        
        var pass=ecnrypt.x2(req.body.password);// бирем двойной хем от паролья 
        client.query("INSERT INTO autch(name, login, password,id_status) VALUES ($1,$2,$3,$4);",[r.name, r.login, pass,r.id_status], function(err, result)// записываем в базу
        {
           if(!err)
                res.json({user:"add"});// успешно
            else
                res.json(err);// отказ

        });

        }else{
        	res.send("Не  правильные параметры были переданы!");
        }

    });

});


module.exports = router;













