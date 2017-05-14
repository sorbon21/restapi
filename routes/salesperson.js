var security = require('./security/security');
var pool = require('../pg');
var qw = require('../helpfunc');
var express = require('express');
var router = express.Router();
router.use(security);


router.get('/:id?',function(req,res,next)
{
   if (security.status==1||security.status==2)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'SELECT *  FROM salesperson ');

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
         client.query("INSERT INTO salesperson ( vendoraccountid, name, salescommission, recurringcommission) VALUES ($1,$2,$3,$4);",[r.vendoraccountid, r.name, r.salescommission, r.recurringcommission], function(err, result)
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

router.delete('/:id?',function(req,res,next)
{
    if (security.status==1)
    {
      pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'DELETE  FROM salesperson ');
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
router.put('/:id?',function(req,res,next)
{
    if (security.status==1)
    {

        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.upd(req,'UPDATE salesperson SET  ','id');
            client.query(resl,function(err, result)
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
//--------------------------------------------------------
// report
//--------------------------------------------------------
router.get('/:id/report',function(req,res,next)
{
   if (security.status==1)
    {
    	if (req.params.id)
    	{

    		pool.connect(function(err, client)
            {
	            if(err) {
	                return console.error('error fetching client from pool', err);
	            }
	            client.query('Select sp.id, sp.name, so.id, so.docdate, so.total_value *sp.salescommission as commission from salesperson sp join salesorder so on(so.salesid = sp.id) where sp.id = $1',[req.params.id], function(err, result)
	            {
	                if(!err)
	                    res.json(result.rows);
	                else
	                    res.json(err);
	            });
        	});

    	}else{

   		   pool.connect(function(err, client)
	        {
	            if(err) {
	                return console.error('error fetching client from pool', err);
	            }
	            
	            var resl=qw.select(req,'Select sp.id, sp.name, sum(so.total_value * sp.salescommission )as commission from salesperson sp join salesorder so on (so.salesid = sp.id) ');
	            resl+=" group by 1,2";
	            client.query(resl, function(err, result)
	            {
	                if(!err)
	                    res.json(result.rows);
	                else
	                    res.json(err);
	            });
	        });

    	}
        
}else
      res.json({access:"denied"});
});

module.exports = router;













