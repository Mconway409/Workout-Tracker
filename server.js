const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiroutes.js");
const htmlRoutes = require("./routes/htmlroutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(require("./routes/apiroutes.js"));
app.use(require("./routes/htmlroutes.js"));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log("listening on port: ", PORT));