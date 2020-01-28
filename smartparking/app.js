var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');
const {
  Pool,
  Client
} = require('pg');

const connectionString = 'postgres://vfqpuona:rrSckG8ApXOhGWuZfzQ2M3P_3sOISmxe@dumbo.db.elephantsql.com:5432/vfqpuona';

const client = new Client({
  connectionString: connectionString
});

client.connect();

var aantalPlekkenVerdieping0 = 0;
var aantalPlekkenVerdieping1 = 0;
var aantalPlekkenVerdieping2 = 0;
var aantalPlekkenVerdieping3 = 0;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

client.connect();

var j = schedule.scheduleJob('*/10 * * * * *', function (fireDate) {
  client.query('SELECT * FROM "public"."Parkingspots"', (err, result) => {
    if (err)
      throw err;
    console.log(result.rows);
    aantalPlekkenVerdieping0 = 0;
    aantalPlekkenVerdieping1 = 0;
    aantalPlekkenVerdieping2 = 0;
    aantalPlekkenVerdieping3 = 0;
    result.rows.forEach(function(element) {
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
    });
  });
});

app.use('/', function (req, res) {

  res.render('index', {
    verdieping0: aantalPlekkenVerdieping0,
    verdieping1: aantalPlekkenVerdieping1
  });

});


app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;