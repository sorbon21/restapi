
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


fullinfo: function(table1,table2,field1,req,res,pool)
{       
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
                        client.query('SELECT * FROM ' + table2 + ' where ' + field1 + '  = $1',[req.params.id], function(err, result)
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

