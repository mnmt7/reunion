const express = require("express");
const cors = require("cors");

const propertyRouter = require("./routes/propertyRoutes");
const propertyController = require("./controllers/propertyController");

const app = express();

app.use(cors());

app.use(express.json());

app.use("api/property", propertyRouter);

app.get("api/list-properties", propertyController.getAllProperty);
app.post("api/login");
app.post("api/signup");

module.exports = app;
