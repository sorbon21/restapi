var security = require('./security/security');
var pool = require('../pg');
var qw = require('../helpfunc');
var express = require('express');
var router = express.Router();
router.use(security);

router.get('/',function(req,res,next)
{

        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
           if (security.status==1||security.status==2)
            {

            var resl=qw.select(req,'SELECT *  FROM account ');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
                done(err);

            });
        }
        else
            res.json({access:"denied"});
        });

});

router.post('/',function(req,res,next)
{
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;
    if (security.status==1)
    {
      client.query("INSERT INTO account (vendoraccountid, typeid, statusid, creationdate, companyname, address1, address2, city, state, zip, country_code)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[r.vendoraccountid, r.typeid, r.statusid, r.creationdate, r.companyname, r.address1, r.address2, r.city, r.state, r.zip, r.country_code], function(err, result)
        {
            if(!err)
                res.json(req.body);
            else
                res.json(err);

        });
        }
        else
            res.json({access:"denied"});
    });


});


router.delete('/',function(req,res,next)
{
    
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
        if (security.status==1)
        {
    
            var resl=qw.select(req,'DELETE FROM account ');
            client.query(resl, function(err, count)
            {
                if(!err)
                    res.json(count);
                else
                    res.json(err);
            });
            }
        else
            res.json({access:"denied"});
        });
    

});
router.put('/',function(req,res,next)
{


        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
      if (security.status==1)
      {
                 
            var resl=qw.upd(req,'UPDATE account SET  ','id');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        }
        else
            res.json({access:"denied"});
        });



});

module.exports = router;













