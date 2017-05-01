var express = require('express');
var router = express.Router();
var pool = require('../pg');
var qw = require('../helpfunc');


router.get('/',function(req,res,next)
{
    if (router.status==1||router.status==2)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'SELECT *  FROM subscription ');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
            });
        });
    }else
      res.json({access:"denied"});
});

router.post('/',function(req,res,next)
{
 if (router.status==1)
 {
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;
        client.query("INSERT INTO subscription (subscriptionname, statusid, startdate, expirationdate, shutdowndate, terminationdate, accountid, planid, periodid, periodtypeid, billingperiodtypeid, billingperiod, lastbilldate, nextbilldate, isautorenew, reneworderinterval, setupfee, subscriptionfee, renewalfee) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);",[r.subscriptionname, r.statusid, r.startdate, r.expirationdate, r.shutdowndate, r.terminationdate, r.accountid, r.planid, r.periodid, r.periodtypeid, r.billingperiodtypeid, r.billingperiod, r.lastbilldate, r.nextbilldate, r.isautorenew, r.reneworderinterval, r.setupfee, r.subscriptionfee, r.renewalfee], function(err, result)
        {
           if(!err)
                res.json(req.body);
            else
                res.json(err);

        });
    });
}else
      res.json({access:"denied"});

});


router.delete('/',function(req,res,next)
{
  if (router.status==1)
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
    }else
      res.json({access:"denied"});

});
router.put('/',function(req,res,next)
{

if (router.status==1) 
{
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
            var resl=qw.upd(r,'UPDATE subscription SET  ');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
        });
}else
      res.json({access:"denied"});


});

module.exports = router;













