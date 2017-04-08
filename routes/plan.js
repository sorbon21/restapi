var express = require('express');
var router = express.Router();

module.exports = router;
var pool = require('../pg');

router.get('/:id?',function(req,res,next)
{

    if(req.params.id)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT * FROM plan WHERE plan.planid='+req.params.id+'', function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
            });
        });
    }
    else{

        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT *  FROM plan', function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
                done(err);

            });
        });
    }
});

router.post('/',function(req,res,next)
{
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var r=req.body;

        client.query("INSERT INTO plan (name, plancategoryid, shortdescription, longdescription, accountid, billingperiodtypeid, billingperiod, isautorenew, reneworderinterval)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[r.name, r.plancategoryid, r.shortdescription, r.longdescription, r.accountid, r.billingperiodtypeid, r.billingperiod, r.isautorenew, r.reneworderinterval], function(err, result)
        {
            if(!err)
                res.json(req.body);
            else
                res.json(err);

        });
    });


});


router.delete('/:id?',function(req,res,next)
{
    if(req.params.id)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('DELETE  from plan WHERE plan.planid= '+req.params.id+'', function(err, count)
            {
                if(!err)
                    res.json(count);
                else
                    res.json(err);
            });
        });
    }

});
router.put('/:id',function(req,res,next)
{


        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
            client.query("UPDATE plan SET  name=$1, plancategoryid=$2, shortdescription=$3, longdescription=$4, accountid=$5, billingperiodtypeid=$6, billingperiod=$7, isautorenew=$8, reneworderinterval=$9 WHERE plan.planid =$10;",[r.name, r.plancategoryid, r.shortdescription, r.longdescription, r.accountid, r.billingperiodtypeid, r.billingperiod, r.isautorenew, r.reneworderinterval,r.params.id], function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













