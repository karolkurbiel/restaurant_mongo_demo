const port = 3004;
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const mongoose = require('./database');

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');

// routes
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/categories');
const menuItemRouter = require('./routes/menuitems');
const customerRouter = require('./routes/customers');
const restaurantRouter = require('./routes/restaurants');
const statusRouter = require('./routes/statuses');
const orderItemsRouter = require('./routes/orderitems');
const placedOrderRouter = require('./routes/placedorders');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/categories', categoryRouter);
app.use('/menuitems', menuItemRouter);
app.use('/customers', customerRouter);
app.use('/restaurants', restaurantRouter);
app.use('/statuses', statusRouter);
app.use('/orderitems', orderItemsRouter);
app.use('/placedorders', placedOrderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
