var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { verdieping0: '5', verdieping1: '16' });
});

module.exports = router;
