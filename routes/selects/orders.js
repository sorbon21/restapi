var express = require('express');
var router = express.Router();
var pool = require('../../pg');


var qwerty=function(res,req,table,table2,id)
{

	if (req.params.id)
	{
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * FROM $1 where id = $2',[table,req.params.id], function(err, result1)
            {
                if(!err)
               {
			    		client.query('SELECT * FROM $1 where $2  = $3',[table2,id,req.params.id], function(err, result)
            			{
                			if(!err)
                			{
                				
            			var obj1 = result1.rows[0];
					var obj2 ={details:result.rows};
					Object.assign(obj1, obj2);
                				
                				res.json(obj1);		
                			}                				
                			else
                    			res.json(err);
            			});

                }
                else
                    res.json(err);
            });
        });
    }
}


router.get('/:id?',function(req,res,next)
{
	

	if (req.params.id)
	{
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * FROM salesorder where id = $1',[req.params.id], function(err, result1)
            {
                if(!err)
               {
			    		client.query('SELECT * FROM orddet where orderid  = $1',[req.params.id], function(err, result)
            			{
                			if(!err)
                			{
                				
            			var obj1 = result1.rows[0];
					var obj2 ={details:result.rows};
					Object.assign(obj1, obj2);
                				
                				res.json(obj1);		
                			}                				
                			else
                    			res.json(err);
            			});

                }
                else
                    res.json(err);
            });
        });
    }else
    {
    	pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            	
            client.query('SELECT * FROM salesorder', function(err1, result1)
            {
                if(!err1)
               {



for (let i in result1.rows) 
{
    client.query('SELECT * FROM orddet where orderid  = $1',[result1.rows[i].id], function(err2, result)
                        {
                            if(!err2)
                            {
                                
                    var obj1 = result1.rows[i]; 
                    console.log(result1.rows[i]);
                    
                        
                    var obj2 ={details:result.rows};
                        Object.assign(obj1, obj2);                              
                            res.json(obj1);     

                            }                               
                            else
                                res.json(err2);
                        });
}


               	


			    	
                }
                else
                    res.json(err1);
            });
        });

    }
        
});


module.exports = router;













