var security = require('./security');
var express = require('express');
var router = express.Router();
var ecnrypt=require('sha256');
var pool = require('../../pg');

router.use(security);

router.post('/',function(req,res,next)
{   
    if (security.status==1){ // проверка статуса пользователя

        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
            if (r.login&&r.password&&r.name&&r.role_id) //получаем логин пароль и роль пользователя
            {

            
            var pass=ecnrypt.x2(req.body.password);// получаем хеш от пролья
            client.query("INSERT INTO auth(name, login, password,role_id) VALUES ($1,$2,$3,$4);",[r.name, r.login, pass,r.role_id], function(err, result) // сохраняем в системе
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
    }else
    res.json({access:'denied'});


    
});


module.exports = router;













