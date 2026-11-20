const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Movie field is required"],
  },
  director: {
    type: String,
    required: [true, "director field is required"],
  },
  year: {
    type: Number,
    required: [true, "year field is required"],
  },
  description: {
    type: String,
    required: [true, "description field is required"],
  },
  genre: {
    type: String,
    required: [true, "genre field is required"],
  },
  comments: [
    {
      userId: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
