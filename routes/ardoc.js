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
            client.query('SELECT * FROM ardoc WHERE ardoc.docid = '+req.params.id+'', function(err, result)
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

        client.query("INSERT INTO ardoc (docnum, statusid, total_value, customeraccountid, docdate, description, salesid, creditdocid, doctypeid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",[r.docnum, r.statusid, r.total_value, r.customeraccountid, r.docdate, r.description, r.salesid, r.creditdocid, r.doctypeid], function(err, result)
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
            client.query('DELETE  FROM ardoc WHERE ardoc.docid ='+req.params.id+'', function(err, count)
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
            client.query("UPDATE ardoc SET   docnum =$1, statusid =$2, total_value =$3, customeraccountid =$4, docdate =$5, description =$6, salesid =$7, creditdocid =$8, doctypeid= $9 WHERE ardoc.docid =$10",[r.docnum, r.statusid, r.total_value, r.customeraccountid, r.docdate, r.description, r.salesid, r.creditdocid, r.doctypeid,req.params.id], function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        });



});

module.exports = router;













