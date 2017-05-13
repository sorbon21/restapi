var security = require('../security/security');
var express = require('express');
var router = express.Router();
var pool = require('../../pg');
router.use(security);



router.get('/:id?',function(req,res,next)
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
            client.query('SELECT * FROM salesorder where id = $1',[req.params.id], function(err, result1)
            {
                if(!err)
               {
			    		client.query('SELECT * FROM orddet where orderid  = $1',[req.params.id], function(err, result)
            			{
                			if(!err)
                			{
                				
            			var obj1 = result1.rows[0];
					var obj2 ={details:result.rows};
					Object.assign(obj1, obj2);
                				
                				res.json(obj1);		
                			}                				
                			else
                    			res.json(err);
            			});

                }
                else
                    res.json(err);
            });
        });
    }else
    {
        
    	pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            	
            client.query('SELECT * FROM salesorder ', function(err1, result1)
            {
                if(!err1)
               {
var bigest=[];

for (let i in result1.rows) 
{
    client.query('SELECT * FROM orddet where orderid  = $1',[result1.rows[i].id], function(err2, result)
     {
                    if(!err2)
                    {
                    
                        
                      var obj1 = result1.rows[i]; 
                      var obj2 ={details:result.rows};
                       Object.assign(obj1, obj2);   
                       bigest.push(obj1);
                       if (i==result1.rows.length-1)
                       {
                                    res.json(bigest);     
                       }
                    }                               

        });
    

}

            	
}else
   res.json(err1);
   
            });
    
        });
    

    }
    }
        
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
        client.query("INSERT INTO salesorder (customeraccountid, orderstatusid, ordertypeid, total_value, descr, salesid) VALUES ($1,1,$2,0,$3,$4);",[r.customeraccountid, r.ordertypeid, r.descr, r.salesid], function(err, result)
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


router.post('/:id/details',function(req,res,next)
{
if (security.status==1)
 {    
 	if(req.body.planperiodid)
 	{
 		pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
                if (req.body.resourceid==null)
                {


                client.query('select pp.*, p.name from planperiod pp join plan p on (p.id = pp.planid) where id =$1',[req.body.planperiodid], function(err, result)
                {
                    if(!err)
                    {

							        client.query("insert into orddet (orderid,unitprice_value,servqty,duration,discountamt_value,extendedprice_value,planperiodid,subscriptionid) values ($1,$2,$3,$4,$5,$6,$7,$8) ",[req.params.id,result.rows[0].setupfee + result.rows[0].subscriptionfee, req.body.quantity,req.body.duration,0,(result.rows[0].setupfee + result.rows[0].subscriptionfee)*req.body.quantity*req.body.duration,'Subscription on'+result.rows[0].name], function(err, result1)
								        {
									           if(!err)
									           {

													        client.query("update salesorder set total_value = total_value + $1 where id = $2",[((result.rows[0].setupfee + result.rows[0].subscriptionfee)*req.body.quantity*req.body.duration),req.params.id] function(err, result2)
													        {

													           if(!err)
													          
													            
													                res.json({success:true,message:"add"});
													           
													            else
													                res.json(err);

													        });

									           }
								            
								            
								           }
								            else
								                res.json(err);

								        });
                    }
                    else
                        res.json(err);
                    done(err);

                });


                }else{

				client.query('select pr.*, r.name from planrate pr join resource r on (r.id = pr.resourceid) join planperiod pp on (pp.planid = pr.planid) where r.id =$1 and pp.id =$2',[req.body.resourceid,req.body.planperiodid], function(err, result)
                {
                    if(!err)
                    {
									client.query("insert into orddet (orderid,unitprice_value,servqty,duration,discountamt_value,extendedprice_value,planperiodid,resourceid,desc,subscriptionid) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ",[req.params.id,result.rows[0].setupfee + result.rows[0].recurringfee, req.body.quantity,req.body.duration,0,(result.rows[0].setupfee + result.rows[0].recurringfee)*req.body.quantity*req.body.duration,,'Additional resource'+result.rows[0].name,req.body.subsctiptionid], function(err, result1)
								     {
								        	

								           if(!err)
								                {

								     					client.query("update salesorder set total_value = total_value + $1 where id = $2",[((result.rows[0].setupfee + result.rows[0].subscriptionfee)*req.body.quantity*req.body.duration),req.params.id] function(err, result2)
												        {			
												           if(!err)
												                res.json({success:true,message:"add"});
												            else
												              res.json(err);

												        });


								                }
								            else
								                res.json(err);

								        });
                    }
                    else
                     	res.json(err);
                    	done(err);

                });

    }  
        });
 	}
		
}else
      res.json({access:"denied"});

});




router.put('/:id/details',function(req,res,next)
{
if (security.status==1)
 {    
 	if(req.body.planperiodid)
 	{
 		pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
                if (req.body.resourceid!=null)
                {


                client.query('select pp.*, p.name from planperiod pp join plan p on (p.id = pp.planid) where id =$1',[req.body.planperiodid], function(err, result)
                {
                    if(!err)
                    {

							        client.query("insert into orddet (orderid,unitprice_value,servqty,duration,discountamt_value,extendedprice_value,planperiodid,subscriptionid) values ($1,$2,$3,$4,$5,$6,$7,$8) ",[req.params.id,result.rows[0].setupfee + result.rows[0].subscriptionfee, req.body.quantity,req.body.duration,0,(result.rows[0].setupfee + result.rows[0].subscriptionfee)*req.body.quantity*req.body.duration,'Subscription on'+result.rows[0].name], function(err, result1)
								        {

								           if(!err)
								                res.json(req.body);
								            else
								                res.json(err);

								        });
                    }

                    else
                        res.json(err);
                    done(err);

                });


                }else{

				client.query('select pr.*, r.name from planrate pr join resource r on (r.id = pr.resourceid) join planperiod pp on (pp.planid = pr.planid) where r.id = from_request.resourceid and pp.id =$1',[req.body.planperiodid], function(err, result)
                {
                    if(!err)
                    {
									client.query("insert into orddet (orderid,unitprice_value,servqty,duration,discountamt_value,extendedprice_value,planperiodid,resourceid,desc,subscriptionid) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ",[req.params.id,result.rows[0].setupfee + result.rows[0].recurringfee, req.body.quantity,req.body.duration,0,(result.rows[0].setupfee + result.rows[0].recurringfee)*req.body.quantity*req.body.duration,,'Additional resource'+result.rows[0].name,req.body.subsctiptionid], function(err, result1)
								     {
								        	

								           if(!err)
								                res.json(req.body);
								            else
								                res.json(err);

								        });
                    }

                    else
                        res.json(err);
                    done(err);

                });

    }  
        });
 	}
		
}else
      res.json({access:"denied"});

});



module.exports = router;