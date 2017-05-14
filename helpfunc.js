
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

	            }else
	               	if (req.params.id) 
	               	{
	               		qr+= 'where id = '+req.params.id+' ';	
	               	}				
	           	
     			
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
		qr=qr.substring(0,qr.length-2);

   		qr+= " where "+queryid+" = "+req.params.id;   

	}else
	{
		qr="";
	}
      return qr;
},
sdate: function(req,qr,datecolumn) 
{

        var query_length = Object.keys(req.query).length;  
        console.log(query_length);
        switch(query_length)
        {
            case 0:
            return qr;
            break;

            case 1:
            {
                for (var propName in req.query)
                {
                        if (propName=="from"&&isNaN(req.query[propName])==true)
                        {
                           
                            qr+=' where '+datecolumn+" >= '"+req.query[propName]+"' ";

                        }else
                          if (propName=="to" &&isNaN(req.query[propName])==true)
                          {

                            qr+=' where '+datecolumn+" <= '"+req.query[propName]+"' ";

                          }

                
                }


                return qr;    
            }
                
            break;
            case 2:
            {
                for (var propName in req.query)
                {
                        if (propName=="from"&&isNaN(req.query[propName])==true)
                        {
                           
                            qr+=' where '+datecolumn+" >= '"+req.query[propName]+"' and ";

                        }else
                          if (propName=="to"&&isNaN(req.query[propName])==true)
                          {

                            qr+=" "+datecolumn+" <= '"+req.query[propName]+"' ";

                          }

                
                }
                return qr;
                
            }
          
            break;


        }               
                
            
},

fullinfo: function(table1,table2,field1,req,res,pool)
{       
    console.log("start0");
    if (req.params.id)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var qr = 'SELECT * FROM ' + table1 + 'where id = $1';
            console.log(qr);
            client.query('SELECT * FROM ' + table1 + ' where id = $1',[req.params.id], function(err, result1)
            {
                if(!err)
               {        
                        console.log("start");
                        client.query('SELECT * FROM ' + table2 + ' where ' + field1 + '  = $1',[req.params.id], function(err, result)
                        {
                            if(!err)
                            {                                
                                var obj1 = result1.rows[0];
                                var obj2 ={details:result.rows};
                                Object.assign(obj1, obj2);  
                                console.log("start1");     
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
            resl = module.exports.select(req,'SELECT * FROM '+ table1 +' ')    
            client.query(resl, function(err1, result1)
            {
                if(!err1)
                    res.json(result1.rows)
                else
                    res.json(err1);
            });
    
        });
    

    }
}
        





};

module.exports=result;

