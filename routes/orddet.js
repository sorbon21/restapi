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
            client.query('SELECT * FROM orddet WHERE  orddet.detid= '+req.params.id+'', function(err, result)
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
            client.query('SELECT * FROM orddet', function(err, result)
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

        client.query("INSERT INTO orddet (orderid, unitprice_value, servqty, duration, durbilperiod, durbullperiodtypeid, discountamt_value, extendedprice_value, plancategoryid, subscriptionid, planperiodid, resourceid, descr) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);",[r.orderid, r.unitprice_value, r.servqty, r.duration, r.durbilperiod, r.durbullperiodtypeid, r.discountamt_value, r.extendedprice_value, r.plancategoryid, r.subscriptionid, r.planperiodid, r.resourceid, r.descr], function(err, result)
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
            client.query('DELETE  FROM orddet WHERE  orddet.detid='+req.params.id+'', function(err, count)
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
            client.query("UPDATE  orddet SET orderid=$1, unitprice_value=$2, servqty=$3, duration=$4, durbilperiod=$5, durbullperiodtypeid=$6, discountamt_value=$7, extendedprice_value=$8, plancategoryid=$9, subscriptionid=$10, planperiodid=$11, resourceid=$12, descr=$13 WHERE orddet.detid= $14",[r.orderid, r.unitprice_value, r.servqty, r.duration, r.durbilperiod, r.durbullperiodtypeid, r.discountamt_value, r.extendedprice_value, r.plancategoryid, r.subscriptionid, r.planperiodid, r.resourceid, r.descr,req.params.id], function(err, result){
            	
            
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













