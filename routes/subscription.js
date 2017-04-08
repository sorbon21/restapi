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
            client.query('SELECT * FROM subscription WHERE subscription.subscriptionid='+req.params.id+'', function(err, result)
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
            client.query('SELECT *  FROM subscription', function(err, result)
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
        client.query("INSERT INTO subscription (subscriptionname, statusid, startdate, expirationdate, shutdowndate, terminationdate,  accountid, planid, period, periodtypeid, billingperiodtypeid, billingperiod,  lastbilldate, nextbilldate, isautorenew, reneworderinterval, setupfee, subscriptionfee, renewalfee) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);",[r.subscriptionname, r.statusid, r.startdate, r.expirationdate, r.shutdowndate, r.terminationdate, r.accountid, r.planid, r.period, r.periodtypeid, r.billingperiodtypeid, r.billingperiod, r.lastbilldate, r.nextbilldate, r.isautorenew, r.reneworderinterval, r.setupfee, r.subscriptionfee, r.renewalfee], function(err, result)
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
            client.query('DELETE  from subscription WHERE subscription.subscriptionid= '+req.params.id+'', function(err, count)
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
            client.query("UPDATE subscription SET   subscriptionname =$1, statusid=$2, startdate=$3, expirationdate=$4, shutdowndate=$5, terminationdate=$6, accountid=$7, planid=$8, period=$9, periodtypeid=$10, billingperiodtypeid=$11, billingperiod=$12, lastbilldate=$13, nextbilldate=$14, isautorenew=$15, reneworderinterval=$16, setupfee=$17, subscriptionfee=$18, renewalfee=$19 WHERE subscription.subscriptionid=$20;",[r.subscriptionname, r.statusid, r.startdate, r.expirationdate, r.shutdowndate, r.terminationdate, r.accountid, r.planid, r.period, r.periodtypeid, r.billingperiodtypeid, r.billingperiod, r.lastbilldate, r.nextbilldate, r.isautorenew, r.reneworderinterval, r.setupfee, r.subscriptionfee, r.renewalfee,req.params.id], function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













