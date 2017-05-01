var jwt=require('jsonwebtoken');
var express = require('express');
var security=express.Router();

security.use(function(req, res, next)
{

var token = req.body.token || req.query.token || req.headers['x-access-token']||req.params.token;

if(token)
{
	jwt.verify(token,process.env.SECRET_KEY,function(err,decode)
	{
		if(err){res.status(500).send("Не правильный token!");
	}
	else{
			next();
			var decoded = jwt.decode(token);
			var decoded = jwt.decode(token, {complete: true});
			module.exports.status=decoded.payload.status;
		}
	});
}else
{
	res.send("Отправьте token!");
}
});
module.exports = security;

