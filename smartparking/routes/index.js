var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');

const connectionString = 'postgres://vfqpuona:rrSckG8ApXOhGWuZfzQ2M3P_3sOISmxe@dumbo.db.elephantsql.com:5432/vfqpuona';

const client = new Client({
  connectionString: connectionString
});


var aantalPlekkenVerdieping0 = 0;
var aantalPlekkenVerdieping1 = 0;
var aantalPlekkenVerdieping2 = 0;
var aantalPlekkenVerdieping3 = 0;

/* GET home page. */
router.get('/', (req, res, next) => {
  client.connect();
  client.query('SELECT * FROM "public"."Parkingspots"', (err, result) => {
    if(err)
      throw err;
    console.log(result.rows);
    res.render('index', { verdieping0: aantalPlekkenVerdieping0, verdieping1: aantalPlekkenVerdieping1 });
    client.end();
  });
});

module.exports = router;

/*result.rows.forEach(function(element) {
      if(element['Bezet']) {
        if(element['Verdieping'] == 0) {
          aantalPlekkenVerdieping0++
        }
        else if(element['Verdieping'] == 1) {
          aantalPlekkenVerdieping1++;
        }
        else if(element['Verdieping'] == 2) {
          aantalPlekkenVerdieping2++;
        }
        else if(element['Verdieping'] == 3) {
          aantalPlekkenVerdieping3++;
        }
      }
    });*/