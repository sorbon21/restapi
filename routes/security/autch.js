var jwt=require('jsonwebtoken');// библиотека jsonwebtoken для авторизации по токену
var express = require('express');// фреймворк express
var router = express.Router();
var pool = require('../../pg');//подключаем базу
var ecnrypt=require('sha256');// используем для получения хеша от пароля 

router.get('/',function(req,res)// при отправки get запроса получаем информацию о передачи параметров по методу POST
{
	
	res.send("Отправьте свoи идентификационные данные<br>для получения токена! например<br>login:alex<br>password:merser");

});

router.post('/',function(req,res)
{

 pool.connect(function(err, client, done)// объект для подключения к postgres у
    {
        if(err) 
        {
            return console.error('error fetching client from pool', err);
        }

        var r=req.body;
        if (r.login&&r.password) //если задан и логин и пароль
        {
	    var pass=ecnrypt.x2(req.body.password);//получаем двойной хеш от паролья 
        client.query("select * from autch where login= $1;",[r.login], function(err, result)//проверяем логин в системе
        {

           if(!err&&result.rows.length==1)// если результат равняетст одной строки 
           {
           	if (result.rows[0].login==r.login&&result.rows[0].password==pass)// если логин сравнимо с логином и пароль сравнимо с паролем
           	{
	           	var user={status:result.rows[0].id_status}; // создаем массив в катором получаем статус пользователя в дальнейшем он будет храниться в нашей токене и поможет нам при распределения ролей
				var token=jwt.sign(user,process.env.SECRET_KEY,{expiresIn:5000});// создаем токен который будет доступен в течении 5000сек и вводми пароль SECRET_KEY так же массив данных user 
				res.json({success:true,token:token});// передаем пользователю токен
    
           	}else// иначе выводим нет токена
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
