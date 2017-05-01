var router = require('./security/security');
var pool = require('../pg');
var qw = require('../helpfunc');

router.get('/',function(req,res,next)
{
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            if (router.status==1||router.status==2)
            {
                var resl=qw.select(req,'SELECT *  FROM accountstatus');            
                client.query(resl, function(err, result)
                {
                    if(!err)
                        res.json(result.rows);
                    else
                        res.json(err);
                    done(err);

                });
            }
        });

});

router.post('/',function(req,res,next)
{
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

if (router.status==1){

        client.query('INSERT INTO accountstatus  (name) VALUES ($1);',[req.body.name], function(err, result)
        {
            if(!err)
                res.json(req.body);
            else
                res.json(err);

        });    
}else
res.send("Не хвотает привилегии!");

    });


});


router.delete('/',function(req,res,next)
{
    
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

            if (router.status==1) 
            {
             var resl=qw.select(req,'DELETE FROM accountstatus');            
            client.query(resl, function(err, count)
            {
                if(!err)
                    res.json(count);
                else
                    res.json(err);
            });

            }else
res.send("Не хвотает привилегии!");
            
        });
    

});
router.put('/',function(req,res,next)
{


        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            if (router.status==1) 
            {
            
            var resl=qw.upd(req.body,'UPDATE accountstatus  SET ');            
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
            }else
res.send("Не хвотает привилегии!");
            

        });



});

module.exports = router;













