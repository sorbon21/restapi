var express = require('express');
var router = express.Router();
var pool = require('../../pg');



router.get('/:id',function(req,res,next)
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
                				result1.rows.push(result.rows);
                				res.json(result1.rows);		
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
        res.json({error:"plise params send id"});
});


module.exports = router;













