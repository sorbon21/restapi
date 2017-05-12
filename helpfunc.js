
var result=
{


select: function(req,qr) 
{
     	var query_length = Object.keys(req.query).length;     	
     			if(query_length > 0)
            	{
	                qr += ' where '
	                for (var propName in req.query)
	                {
	                	if (req.query.hasOwnProperty(propName)) 
	                    {
	                    	if (isNaN(req.query[propName])==true) 
	                    	{
	                    		qr += propName + " = '" + req.query[propName]+"'";	
	                    	}else{
	                    		qr +=propName + ' = ' + req.query[propName];	
	                    	}
	                     	query_length -= 1;
	                        if (query_length > 0) 
	                        {
	                            qr += ' and '
	                        }
	                    }	
	                
	                    
	                }
            }
     	
	console.log(qr);            
            	return qr;
},
findone: function(req) 
{   
	var i=0;
	for (var propName in req) 
	   {
	   	
	                i++;
	   }
return i;
	
},
upd: function(req,qr,queryid) 
{	    
	 
	if (req.params.id&&this.findone(req.body)>0)
	{
		for (var propName in req.body) 
       {
	                    	
           if (isNaN(req.body[propName])==true)
	        {
	        	qr += propName + " = '" + req.body[propName]+"', ";	
	       	}else{
	       		qr += propName + ' = ' + req.body[propName]+" , ";	
	       	} 

		}
		qr=qr.substring(0,qr.length-1);
   		qr+= " where "+queryid+" = "+req.params.id;   

	}

  console.log(qr);
            return qr;
},

status_modifay: function(sql,req,res,pool,type)
{

   if (req.params.id)
  {
	var qwer="";
	if (type==0)
	{
         qwer=sql+" = "+req.params.id+";";
         console.log(qwer);
    }else
    {

         qwer=sql+" = "+req.params.id+";";
         console.log(qwer);
	}
    
            pool.connect(function(err, client)
            {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }

                client.query(qwer, function(err, result)
                {
                    if(!err)
                    {
                    	if (type!=0)
                    	{
                    		res.json({update:true});	
                    	}else
                    		res.json(result.rows);
                   	
                    }
                    else
                        res.json(err);
                });
            });    
}
}




};

module.exports=result;

