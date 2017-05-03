var jwt=require('jsonwebtoken');
var express = require('express');
var security=express.Router();

security.use(function(req, res, next)
{

var token =req.headers['token'];
if(token)
{
	jwt.verify(token,process.env.SECRET_KEY,function(err,decode)
	{
		if(err){res.status(500).send({success:false,token:'incorrect'});
	}
	else{
			next();
			var decoded = jwt.decode(token, {complete: true});
			module.exports.status=decoded.payload.status;
		}
	});
}else
{
	res.send({recommend:{send:'token'}});
}
});
module.exports = security;

