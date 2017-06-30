var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");
var port = process.env.PORT || 9500;
var config = require("./config");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use("/account", expressJwt({secret: config.secret}));
app.use(morgan("dev"));
app.use(bodyParser.json());

mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log("Connected to " + config.database + " DB")
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/account/message", require("./routes/messageRoutes"));
app.use("/account/channel", require("./routes/channelRoutes"));
app.use("/account/find", require("./routes/findUserRoute"));

app.listen(port, function () {
    console.log("The server is listening on port " + port)
});
