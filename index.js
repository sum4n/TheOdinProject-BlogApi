// Load dotenv in development and testing environments
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
// const mongoose = require("mongoose");
require("./config/db"); // Dependency injection of db connection.

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import routes
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
