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
            client.query('SELECT *  FROM account  where account.accountid= '+req.params.id+'', function(err, result)
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
            client.query('SELECT *  FROM account', function(err, result)
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

        client.query("INSERT INTO account (accountid, vendoraccountid, typeid, statusid, creationdate, companyname, address1, address2, city, state, zip, countryid)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[r.accountid, r.vendoraccountid, r.typeid, r.statusid, r.creationdate, r.companyname, r.address1, r.address2, r.city, r.state, r.zip, r.countryid], function(err, result)
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
            client.query('DELETE  FROM account  where account.accountid= '+req.params.id+'', function(err, count)
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
            client.query("UPDATE account SET vendoraccountid = $1, typeid=$2, statusid=$3, creationdate=$4, companyname=$5, address1=$6, address2=$7, city=$8, state=$9, zip=$10, countryid=$11 WHERE account.accountid =$12",[ r.vendoraccountid, r.typeid, r.statusid, r.creationdate, r.companyname, r.address1, r.address2, r.city, r.state, r.zip, r.countryid,req.params.id], function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













