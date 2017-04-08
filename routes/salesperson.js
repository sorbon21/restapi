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
            client.query("SELECT * FROM salesperson WHERE salesperson.salesid='"+req.params.id+"'", function(err, result)
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
            client.query('SELECT *  FROM salesperson', function(err, result)
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

router.post('/',function(req,res,next)
{
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;
        client.query("INSERT INTO salesperson (salesid, vendoraccountid, name, salescommission, recurringcommission) VALUES ($1,$2,$3,$4,$5);",[r.salesid, r.vendoraccountid, r.name, r.salescommission, r.recurringcommission], function(err, result)
        {

           if(!err)
                res.json(req.body);
            else
                res.json(err);

        });
    });


});

router.delete('/:id?',function(req,res,next)
{
    if(req.params.id)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query("DELETE  from salesperson WHERE salesperson.salesid='"+req.params.id+"'", function(err, count)
            {
                if(!err)
                    res.json(count);
                else
                    res.json(err);
            });
        });
    }

});
router.put('/:id',function(req,res,next)
{


        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
            client.query("UPDATE salesperson SET  vendoraccountid=$1, name=$2, salescommission=$3, recurringcommission=$4 WHERE salesperson.salesid='$5';",[ r.vendoraccountid, r.name, r.salescommission, r.recurringcommission,req.params.id],function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













