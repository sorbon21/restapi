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
            client.query('SELECT * FROM docdet WHERE docdet.detid= '+req.params.id+'', function(err, result)
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
            client.query('SELECT *  FROM ardoc', function(err, result)
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

        client.query("INSERT INTO docdet(docid, unitprice_value, extendedprice_value, servqty, duration, durbillperiod, durbillperiodtypeid, planperiodid, resourceid, discountamt_value, plancategoryid, ddorddetid, ddorderid, subscriptionid, descr) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",[r.docid, r.unitprice_value, r.extendedprice_value, r.servqty, r.duration, r.durbillperiod, r.durbillperiodtypeid, r.planperiodid, r.resourceid, r.discountamt_value, r.plancategoryid, r.ddorddetid, r.ddorderid, r.subscriptionid, r.descr], function(err, result)
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
            client.query('DELETE  FROM docdet WHERE docdet.detid='+req.params.id+'', function(err, count)
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
            client.query("UPDATE docdet SET  docid=$1, unitprice_value=$2, extendedprice_value=$3, servqty=$4, duration=$5, durbillperiod=$6, durbillperiodtypeid=$7, planperiodid=$8, resourceid=$9, discountamt_value=$10, plancategoryid=$11, ddorddetid=$12, ddorderid=$13, subscriptionid=$14, descr=$15) WHERE docdet.detid=$16",[r.docid, r.unitprice_value, r.extendedprice_value, r.servqty, r.duration, r.durbillperiod, r.durbillperiodtypeid, r.planperiodid, r.resourceid, r.discountamt_value, r.plancategoryid, r.ddorddetid, r.ddorderid, r.subscriptionid, r.descr,req.params.id], function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













