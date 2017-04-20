
var result=
{


select: function(req,qr) 
{
     	var query_length = Object.keys(req.query).length;     	
     	var query2 = this.findone(req.query,'token');     	
     	
				if(query_length > 1)
            	{
	                qr += ' where '
	                for (var propName in req.query)
	                {
	                	if (propName!='token')
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
	                        if (query_length > 1) 
	                        {
	                            qr += ' and '
	                        }
	                             
	                    }	
	                }
	                    
	                }
            }
     	
            
            	return qr;
},
findone: function(req,qr) 
{   
	var i=0;
	for (var propName in req) 
	   {
	   	
	                    	if (propName==qr)
	                    	{

	                    		return i;
	                    	}

	                 
	                i++;
	   }

	
},
upd: function(req,qr) 
{
            	var query_length = this.findone(req,'where'); 
				var query2 = this.findone(req.query,'token');     	
            	if(query_length >1&&query2>0)
            		{
	             
	                for (var propName in req) 
	                {
	                    	

				if (propName!='token')
				{
	                    	if (propName!='where')
	                    	{

	                    	if (isNaN(req[propName])==true)
	                    	{
	                    		qr += propName + " = '" + req[propName]+"'";	
	                    	}else
	                    	{
	                    	qr += propName + ' = ' + req[propName];	
	                    	}
	                        
	                        query_length -= 1;
	                        if (query_length > 1)
	                        {
	                            qr += ' , '
	                        }
	                    }else
	                    qr+=' where ';
	                    
	                }
	            }
            }
            console.log(qr);
            return qr;
}
};

module.exports=result;
