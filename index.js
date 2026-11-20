const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//server
const app = express();
// port
const port = 4000;

//connect to db
mongoose.connect(process.env.MONGO_DB);

//check possible events / monitor db connection
let db = mongoose.connection;
db.on("error", () => console.error("Connection Error!"));
db.once("open", () => console.log("We're connected to the MongoDB!"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routes
const userRoutes = require("./routes/User");
app.use("/users", userRoutes);

//movie routes
const movieRoutes = require("./routes/Movie");
app.use("/movies", movieRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };
