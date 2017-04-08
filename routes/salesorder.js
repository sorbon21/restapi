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
            client.query('SELECT * FROM salesorder WHERE salesorder.orderid='+req.params.id+'', function(err, result)
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
            client.query('SELECT *  FROM salesorder', function(err, result)
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
        client.query("INSERT INTO salesorder (customeraccountid, ordernbr, orderstatusid, ordertypeid, docdate, total_value, descr, salesid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);",[r.customeraccountid, r.ordernbr, r.orderstatusid, r.ordertypeid, r.docdate, r.total_value, r.descr, r.salesid], function(err, result)
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
            client.query('DELETE  from salesorder WHERE salesorder.orderid= '+req.params.id+'', function(err, count)
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
            client.query("UPDATE salesorder SET  customeraccountid=$1, ordernbr=$2, orderstatusid=$3, ordertypeid=$4, docdate=$5, total_value=$6, descr=$7, salesid=$8 WHERE salesorder.orderid=$9;",[r.customeraccountid, r.ordernbr, r.orderstatusid, r.ordertypeid, r.docdate, r.total_value, r.descr, r.salesid,req.params.id], function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













