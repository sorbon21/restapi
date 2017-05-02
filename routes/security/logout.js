var jwt=require('jsonwebtoken');
/*
var express = require('express');
var security=express.Router();
*/
 
    var token = jwt.sign({foo: 123}, '123', { expiresIn: 10 });
    var result = jwt.verify(token, '123');
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + 10, 0.2);
  
/*
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
			var user={status:1};
			var user={status:1};
				var token=jwt.sign(user,process.env.SECRET_KEY,{expiresIn:5000});

		res.send({success:true,logout:true});		
		}
	});
}else
{
	res.send({recommend:{send:'token'}});
}
});


security.get('/', function(req, res, next) 
{
	 

});

module.exports = security;
*/
