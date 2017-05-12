var security = require('./security');
var pool = require('../../pg');
var express = require('express');
var router = express.Router();
router.use(security);

router.get('/',function(req,res,next)
{
   if (security.status==1||security.status==2)
   {

			pool.connect(function(err, client, done)
		    {
		        if(err) {
		            return console.error('error fetching client from pool', err);
		        }
		               var token=req.headers['token'];
		               var qw="INSERT INTO  blacklist(user_id,token) VALUES("+security.uid+",'"+token+"');";
		               
		        client.query(qw, function(err, result)
		        {
		           if(!err)
		                res.json({user:"logauted"});
		            else
		            	res.json({error:"params"});
		     
		        });
		    });


}else
      res.json({access:"denied"});
});


module.exports = router;


    