
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






};

module.exports=result;

