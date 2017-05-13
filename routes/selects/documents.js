var security = require('../security/security');
var express = require('express');
var router = express.Router();
var pool = require('../../pg');
var qw = require('../../helpfunc')



router.get('/:id?',function(req,res,next)
{
    
if (security.status==1)
 {    
    qw.fullinfo('ardoc','docdet','ardocid',req,res,pool);
    }
        
});






//------------------------------

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





router.delete('/:id?',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT statusid FROM ardoc where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].statusid==1)
                    {
                  		
				            client.query('DELETE FROM ardoc where id= $1',[req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });

}else
      res.json({access:"denied"});
});



router.put('/:id?',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT statusid FROM ardoc where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&req.body.statusid>result.rows[0].statusid)
                    {
                  	

				            client.query('UPDATE ardoc set  statusid =$1 where id= $2',[req.body.statusid,req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json(err);
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});




//---------------------------------------------------
// details 
//---------------------------------------------------

router.get('/:id/detail',function(req,res,next)
{
    if (security.status==1||security.status==2)
    {
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            
            client.query('SELECT *  FROM docdate where ardocid =$1',[req.params.id], function(err, result)
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




router.put('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT statusid FROM ardoc where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&req.body.statusid==1)
                    {
                  	var resl=qw.upd(req,'UPDATE docdet SET  ','ardocid');

				            client.query(resl, function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json(err);
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});


router.post('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT statusid FROM ardoc where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].statusid==1)
                    {
                  		
			       			var r=req.body;
        					client.query("INSERT INTO docdet(ardocid, unitprice_value, extendedprice_value, servqty, duration, planperiodid, resourceid, discountamt_value, orddetid, ddorderid, subscriptionid, descr) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",[req.params.id, r.unitprice_value, r.extendedprice_value, r.servqty, r.duration, r.planperiodid, r.resourceid, r.discountamt_value, r.orddetid, r.ddorderid, r.subscriptionid, r.descr], function(err, result)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});

router.delete('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT statusid FROM ardoc where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].statusid==1)
                    {
                  		
				            client.query('DELETE FROM docdet WHERE ardocid = $1',[req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});



//------------------------------



module.exports = router;