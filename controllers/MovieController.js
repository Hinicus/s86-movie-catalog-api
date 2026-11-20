const Movie = require("../models/Movie");
const { errorHandler } = require("../auth");

//add movie
module.exports.addMovie = (req, res) => {
  let title = req.body.title;
  let director = req.body.director;
  let year = req.body.year;
  let description = req.body.description;
  let genre = req.body.genre;
  let comment = req.body.comment;

  //validation
  if (
    [title, director, year, description, genre].every(
      (field) => field === undefined,
    )
  ) {
    return res.status(400).send({
      error: "All fields are required",
    });
  }

  if (typeof year !== "number") {
    return res.status(400).send({
      error: "year must be a number",
    });
  }

  const newMovie = new Movie({
    title,
    director,
    year,
    description,
    genre,
    comment,
  });

  return newMovie
    .save()
    .then((result) => res.status(201).send(result))
    .catch((error) => errorHandler(error, req, res));
};

//get all movies
module.exports.getMovies = (req, res) => {
  return Movie.find({})
    .then((movies) => {
      if (!movies) {
        return res.status(404).send({ message: "Movies catalogue is empty" });
      }

      return res.status(200).send({ movies: movies });
    })
    .catch((error) => errorHandler(error, req, res));
};

//get specific movie
module.exports.getSpecificMovie = (req, res) => {
  return Movie.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .send({ message: "Movie does not exist in the catalogue" });
      }

      return res.status(200).send(result);
    })
    .catch((error) => errorHandler(error, req, res));
};

//update specific movie
module.exports.updateMovie = (req, res) => {
  let title = req.body.title;
  let director = req.body.director;
  let year = req.body.year;
  let description = req.body.description;
  let genre = req.body.genre;

  const updateMovie = {
    title,
    director,
    year,
    description,
    genre,
  };

  return Movie.findByIdAndUpdate(req.params.id, updateMovie, {
    returnDocument: "after",
  })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .send({ message: "Movie does not exist in the catalogue" });
      }

      res.status(200).send({
        message: "Movie updated successfully",
        updatedMovie: result,
      });
    })
    .catch((error) => errorHandler(error, req, res));
};

//delete specific movie
module.exports.deleteMovie = (req, res) => {
  return Movie.findByIdAndDelete(req.params.id).then((result) => {
    if (!result) {
      return res
        .status(404)
        .send({ message: "Movie does not exist in the catalogue" });
    }

    res.status(200).send({ message: "Movie deleted successfully" });
  });
};

//add movie comment
module.exports.addMovieComment = (req, res) => {
  let userId = req.user.id;
  let comment = req.body.comment;

  return Movie.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: { userId, comment } },
    },
    { returnDocument: "after" },
  ).then((result) => {
    if (!result) {
      return res
        .status(404)
        .send({ message: "Movie does not exist in the catalogue" });
    }

    res
      .status(200)
      .send({ message: "comment added successfully", updatedMovie: result });
  });
};

//get movie comments
module.exports.getMovieComments = (req, res) => {
  return Movie.findById(req.params.id, { comments: 1, _id: 0 }).then(
    (result) => {
      if (!result) {
        return res
          .status(404)
          .send({ message: "Movie does not exist in the catalogue" });
      }

      res.status(200).send(result);
    },
  );
};
