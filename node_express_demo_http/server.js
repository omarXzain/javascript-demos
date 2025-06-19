require("dotenv").config();

const express = require("express");

var cors = require("cors");

const app = express();

app.use(cors()); // allowing all domains to hit your endpoints

// Middleware
app.use(express.static("public"));

const axios = require("axios");

const homepage = require("./routes/home");
const postRoute = require("./routes/posts");

app.use("/", homepage);
app.use("/test", postRoute);

// Routing

app.get("/about", (req, res) => {
  res.send("about us page!");
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  res.send(`You searched for ${query}`);
});

var whitelist = [
  "https://oxz-os.space/",
  "https://course-explorer.oxz-os.space/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found <a href='/'>Get back home</a>");
});

//-----------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
