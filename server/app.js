var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var logger = require("morgan");
const es6Renderer = require("express-es6-template-engine");
const path = require("path");

var indexRouter = require("./routes/index");

var app = express();

mongoose
  .connect("mongodb://localhost/corona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set('views',path.join(__dirname,'views'))
// app.set('view engine', 'html')
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
