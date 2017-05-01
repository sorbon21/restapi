var jwt=require('jsonwebtoken');// библиотека jsonwebtoken для авторизации по токену
var express = require('express');// фреймворк express
var security=express.Router();// создаем объект routes каторый используется для маршрутизации 

security.use(function(req, res, next)
{

var token = req.body.token || req.query.token || req.headers['x-access-token']||req.params.token;// получаем токен по все возможным параметрам

if(token)// если токен передан
{
	jwt.verify(token,process.env.SECRET_KEY,function(err,decode)//проверяем его
	{
		if(err){res.status(500).send("Не правильный token!");// если имеется ощибки то передаем сообщения об ощибке
	}
	else{// иначе
			next();
			  // декодируем  сообщения
			var decoded = jwt.decode(token, {complete: true});
			module.exports.status=decoded.payload.status;// експортируем статус пользователя для распределения ролей
		}
	});
}else
{
	res.send("Отправьте token!");
}
});
module.exports = security;

