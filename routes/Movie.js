const express = require("express");
const router = express.Router();

const movieController = require("../controllers/MovieController");

const { verify, verifyAdmin } = require("../auth.js");

//add movie
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

//get all movies
router.get("/getMovies", verify, movieController.getMovies);

//get specific movie
router.get("/getMovie/:id", verify, movieController.getSpecificMovie);

module.exports = router;
