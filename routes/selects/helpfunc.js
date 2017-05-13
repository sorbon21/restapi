
var result=
{


select: function(req,qr) 
{
     	var query_length = Object.keys(req.query).length;     	
     			if(query_length > 0 || req.params.id)
            	{
	                qr += ' where '
					if (req.params.id)
					{
						qr += 'id = ' + req.params.id + ' '; 
					}else 
	                for (var propName in req.query)
	                {
	                	if (req.query.hasOwnProperty(propName)) 
	                    {   
                            if (propName == 'fromdate' || propName == 'todate')
                            {
                                var newprop = req.query[propName];
                                console.log(Object.keys(newprop));
                                if (propName == 'fromdate')
                                    var symb = '>';
                                else 
                                    var symb = '<';
                                qr += Object.keys(newprop) + symb +"= '" + newprop[Object.keys(newprop)[0]] + "'";
                            }else if (isNaN(req.query[propName])==true){
	                    		qr += propName + " = '" + req.query[propName]+"'";
                                console.log(typeof req.query[propName])	;
	                    	}else{
	                    		qr +=propName + ' = ' + req.query[propName];
                                console.log(typeof req.query[propName]) ;	
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
select1: function(req,qr,pool,cb) 
{
        var query_length = Object.keys(req.query).length;       
                if(query_length > 0 || req.params.id)
                {
                    qr += ' where '
                    if (req.params.id)
                    {
                        qr += 'id =' + req.params.id + ' '; 
                    }else 
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
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query(qr, function(err, result)
            {
                if(!err){
                    console.log(result.rows);
                    cb("test");}
                else
                    cb(null,err);
            });
        }); 

//  console.log(qr);            
 //             return qr;
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
	 
	if (req.params.id||this.findone(req.body)>0)
	{
		for (var propName in req.body) 
       {
	                    	
           if (isNaN(req.body[propName])==true)
	        {
	        	qr += propName + " = '" + req.body[propName]+"',";	
	       	}else{
	       		qr += propName + ' = ' + req.body[propName]+",";	
	       	} 

		}
        qr=qr.substring(0,qr.length-1);
        if (req.params.id) {
   		qr+= " where "+queryid+" = "+req.params.id;  
        } 

	}

  console.log(qr);
            return qr;
},

status_modify: function(table,req,res,pool)
{

   if (req.params.id)
  {
	var qwer="UPDATE " + table + " set statusid = " + req.body.statusid + " where id = " + req.params.id ;
    console.log(qwer);
    pool.connect(function(err, client)
            {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }

                client.query(qwer, function(err, result)
                {
                    if(!err)
                    {
                        res.json({status: "new status set"}); 	
                    }
                    else
                        res.json(err);
                });
            });    
}
},





};

module.exports=result;

