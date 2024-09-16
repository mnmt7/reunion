require("dotenv").config();
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connected successfully"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log("server started"));

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
