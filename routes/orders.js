var express = require('express');
var router = express.Router();

module.exports = router;
var pool = require('../pg');

router.get('/:id?',function(req,res,next)
{

    if(req.params.id)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * FROM salesorder LEFT JOIN orddet on salesorder.orderid = orddet.orderid WHERE orddet.orderid= '+req.params.id+'', function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
            });
        });
    }
    else{

        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * FROM salesorder LEFT JOIN orddet on salesorder.orderid = orddet.orderid', function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
                done(err);

            });
        });
    }
});


module.exports = router;













