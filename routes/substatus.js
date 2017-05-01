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
            var resl=qw.select(req,'SELECT *  FROM substatus ');

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

        client.query('INSERT INTO substatus(name) VALUES ($1);',[req.body.name], function(err, result)
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
            var resl=qw.select(req,'DELETE  FROM substatus ');
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

if (router.status==1)
{ 
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.upd(req.body,'UPDATE substatus SET  ');
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













