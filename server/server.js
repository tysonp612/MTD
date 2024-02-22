const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/authentication/authentication.route");
//1) CREATE APP FROM EXPRESS AND SET UP MONGOOSE CONFIG
//app
const app = express();

app.use(express.json({ limit: "50mb" })); // Increase JSON payload size
app.use(
	express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
); // Increase URL-encoded payload size
//as we connect, we got a promise back

mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("DB connected"))
	.catch((err) => console.log(`DB connection error ${err}`));

//2 SETTING UP MIDDLEWARE
//middleware
// It simplifies the process of logging requests to your application. You might think of Morgan as a helper that generates request logs
app.use(morgan("dev"));
//helps communicate between front and back end, parse data under 2mb
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//overcome CORS error
app.use(cors());

//this line below is for calling app.use for all the routes as the app starts, so we don;t have to call each route manually
fs.readdirSync("./routes").map((r) =>
	app.use("/api", require(`./routes/${r}/${r}.route`))
);

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

//3 APP LISTENS TO PORT
//port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listen to server running on port ${port}`));

// const proxy = require("http-proxy-middleware");

// module.exports = function (app) {
//   // add other server routes to path array
//   app.use(proxy(["/api"], { target: "http://localhost:5000" }));
// };
