const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();

const config = require("./config/db.config");

const app = express();

app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
  const err = createError.B;
  res.status(status).json({
    message: message,
  });
});

mongoose
  .connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
