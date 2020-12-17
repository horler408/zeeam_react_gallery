require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');

const stuffRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index")

const dbConnect = require("./config/db");

const app = express();

dbConnect();

// Bode Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To Override CORS Denial Errors
app.use(cors());

// Cookie
app.use(cookieParser);

// Static Files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static('./public'));

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// })

//Routes
app.use('/', indexRoutes)
app.use("/api/product", stuffRoutes);
app.use("/api/auth", userRoutes);

//Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "Server set-up successfully!",
  });
});


module.exports = app;
