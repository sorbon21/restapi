var security = require('./security');
var jwt1=require('jsonwebtoken');
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
		               
		               
		        client.query("select * from blacklist;", function(err, result) // все данные из blcaklist 
		        {
		           if(!err)
		           {
							for (let i in result.rows)
					           	{
					           		

					           				jwt1.verify(result.rows[i].token,process.env.SECRET_KEY,function(err,decode) // проверяем на правильность токена
											{
												if(err)
												{
															
													client.query("delete from blacklist where token =$1",[result.rows[i].token], function(err, result1) //если токен не доступные удаляем его
											        {
											           if(!err)
											           {
											        		console.log("deleted ");   	 
											        		
											        		
											           }
											             else
											            	console.log(err);
											     
											        });

												}			

													
												}
											 		
											);

					           		if (i==result.rows.length-1) 
					           		{
									        			res.json({success:true}) ;	
									}
					           	}
		           }else
		            	res.json({error:"params"});
		     
		        });
		    });


}else
      res.json({access:"denied"});
});


module.exports = router;


    