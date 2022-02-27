// IMPORTS
const express = require('express');

const app = express();
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// GLOBAL MIDDLEWARES

// set security HTTP headers
app.use(helmet());

// BODY PARSER,  reading data from body to req.body
app.use(express.json());

// below is setting directory for static files
app.use(express.static(`${__dirname}/public`));

// limit the number of requests from same IP
const limiter =rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Too many requests from this IP, please try again in an hour!'
})
app.use('/api',limiter);

//Data Sanitization against NoSQL query injection
// what it does is, it remove '$' and dots from the string. rendering any query for mongoDB to not run
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp({
  whitelist:['duration','rate','price']
}));

app.use('/api/v1/tours/:id', (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('api/v1/users', userRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`No valid path to ${req.originalUrl}`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);
// START SERVER
module.exports = app;
