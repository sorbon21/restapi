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
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'SELECT *  FROM ardoc '); 
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
                done(err);

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

        client.query("INSERT INTO ardoc (statusid, total_value, customeraccountid, docdate, description, salesid, creditdocid, doctypeid) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",[r.statusid, r.total_value, r.customeraccountid, r.docdate, r.description, r.salesid, r.creditdocid, r.doctypeid], function(err, result)
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
    
            var resl=qw.select(req,'DELETE  FROM ardoc '); 
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
    
            var resl=qw.upd(req,'UPDATE ardoc SET  ','id');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
           });
  }else
      res.json({access:"denied"});
});

module.exports = router;













