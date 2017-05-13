var jwt=require('jsonwebtoken');
var express = require('express');
var security=express.Router();
var pool = require('../../pg');


security.use(function(req, res, next)
{

var token =req.headers['token']; // получаем токен
if(token)// проверяем на пустоту
{

			pool.connect(function(err, client, done)
		    {
		        if(err) {
		            return console.error('error fetching client from pool', err);
		        }
		        		               		               
		        client.query('select token from blacklist where token =$1',[token], function(err, result1) // проверяем в системе токен если токен не доступен то выводим сообщения
		        {
		           if(!err&&result1.rows.length==1) //если найден токен выводим сообщения
							res.send({recommend:{success:false,msg:'Token not valid'}});
				        else
		            		{


															jwt.verify(token,process.env.SECRET_KEY,function(err,decode) // иначе выводим значения и провеяем на правильность токена
															{
																if(err)
																{
																	res.status(500).send({success:false,token:'incorrect'});
																}
																else{
																	next();
																	var decoded = jwt.decode(token, {complete: true}); //декодируем
																	module.exports.status=decoded.payload.status; //експортируем статус
																	module.exports.uid=decoded.payload.uid;	

																}
															});



		            		}
		        });
		    
		   
		    });    




}else
{
	res.send({recommend:{send:'token'}});
}
});
module.exports = security;


