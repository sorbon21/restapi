var security = require('./security/security');
var pool = require('../pg');
var qw = require('../helpfunc');
var express = require('express');
var router = express.Router();
router.use(security);


router.get('/',function(req,res,next)
{
  
  if (security.status==1||security.status==2)
  {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

            var resl=qw.select(req,'SELECT *  FROM plan ');
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
  
if (security.status==1)
 {
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;

        client.query("INSERT INTO plan (name, plancategoryid, shortdescription, longdescription, accountid, billingperiodtype, billingperiod, isautorenew, reneworderinterval)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",[r.name, r.plancategoryid, r.shortdescription, r.longdescription, r.accountid, r.billingperiodtype, r.billingperiod, r.isautorenew, r.reneworderinterval], function(err, result)
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
    if (security.status==1)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'DELETE  FROM plan ');
            client.query(resl, function(err, count)
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

   if (security.status==1)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            
            var resl=qw.upd(req,'UPDATE plan SET  ','id');
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













