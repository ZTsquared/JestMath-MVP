const cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const jokesRouter = require("./routes/jokes");
const questionsRouter = require("./routes/questions");
const authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//the line below tells the deployment engine where to find the static assets
//(the frontend info).  when the vite app is "built" vite will merge all
//your frontend code into 1 super condensed file in a new folder called dist inside of client,
// so that is what the line below refers to:
app.use(express.static(path.join(__dirname, "/client/dist")));
//maybe if we weren't using vite the static assets would be in the public folder?
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res, next) {
  res.send("access api at path /api");
});

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/jokes", jokesRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/auth", authRouter);

//this line is also for deployment, telling your depoyment engine where to send
// anything that doesn't match a backend route (ie, when it recieves a frontend url
// it sends it to the index.html , which send you to app.jsx and gets sorted out by the react router.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

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
  res.render("error");
});

module.exports = app;
