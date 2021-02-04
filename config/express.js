var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var winston = require("./winston");
const appRoot = require("app-root-path");
var session = require('express-session')
var passport = require('passport')
var app = express();

var indexRouter = require("../app/modules/users/routes/user.home.route");
var auth = require("../app/modules/users/routes/user.auth.route")(passport);

require('./passport')(passport)
//sequelize create table 


// view engine setup
app.set("views", path.join(`${appRoot}`, "views"));
app.set("view engine", "jade");

app.use(logger("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(`${appRoot}`, "public")));

//express session 
app.use(session({
  secret:'thesecret',
  saveUninitialized: false,
  resave:false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/auth' , auth)
app.use("/user", indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //add error to the winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.method} -${
      req.originalUrl
    } - ${req.ip}`
  );
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
