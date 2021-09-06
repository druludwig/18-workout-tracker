const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 1337;
const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(require("./routes/backEnd.js"));
app.use(require("./routes/frontEnd.js"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start
app.listen(PORT, function () { console.log(`Server running on Port ${PORT}!`) });