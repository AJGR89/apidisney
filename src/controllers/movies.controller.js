import Character from "../models/character";
import Movie from "../models/Movie";
import Category from "../models/Category";
import { DEBUG } from "../utils/loggers";

/** GET MOVIES */
export const getMovies = async (req, res) => {
  try {
    const { name, genre, order, full } = req.query;
    if (name) {
      const movieByName = await Movie.findOne({ title: name })
        .populate("characters", { movies: 0 })
        .populate("updatedBy", { username: 1, _id: 0 });
      return res.status(200).json(movieByName);
    }
    if (genre) {
      const moviesIds = await Category.find(
        { name: genre },
        { movies: 1, _id: 0 }
      );
      const moviesArr = moviesIds[0].movies;
      if (order === "ASC") {
        const moviesASC = await Movie.find({ _id: { $in: moviesArr } }, null, {
          sort: { release: 1 },
        })
          .populate("characters", { movies: 0 })
          .populate("updatedBy", { username: 1, _id: 0 });
        return res.status(200).json(moviesASC);
      } else if (order === "DESC") {
        const moviesDESC = await Movie.find({ _id: { $in: moviesArr } }, null, {
          sort: { release: -1 },
        })
          .populate("characters", { movies: 0 })
          .populate("updatedBy", { username: 1, _id: 0 });
        return res.status(200).json(moviesDESC);
      } else {
        const movies = await Movie.find({ _id: { $in: moviesArr } })
          .populate("characters", { movies: 0 })
          .populate("updatedBy", { username: 1, _id: 0 });
        return res.status(200).json(movies);
      }
    }
    if (order === "ASC") {
      const allMoviesASC = await Movie.find(
        {},
        { _id: 0 },
        { sort: { release: 1 } }
      ).populate("characters", { movies: 0 });
      res.status(200).json(allMoviesASC);
      return;
    }
    if (order === "DESC") {
      const allMoviesDESC = await Movie.find(
        {},
        { _id: 0 },
        { sort: { release: -1 } }
      ).populate("characters", { movies: 0 });
      res.status(200).json(allMoviesDESC);
      return;
    }
    if (full === "FULL") {
      const allMoviesFull = await Movie.find({});
      res.status(200).json(allMoviesFull);
    }
    const allMovies = await Movie.find(
      {},
      { title: 1, imgUrl: 1, release: 1, _id: 0 }
    );
    res.status(200).json(allMovies);
    return;
  } catch (error) {
    DEBUG(`[getMovies]: ${error}`);
    res.status(500).json({ error: "Failed getting movies" });
    return;
  }
};

export const createMovie = async (req, res) => {
  try {
    const userId = req.userId;
    const movie = await Movie.findOne({ title: req.body.title });
    if (movie)
      return res.status(400).json({ message: "The movie already exists" });
    const { imgUrl, title, release, score, characters } = req.body;
    let newMovie = {
      imgUrl: imgUrl,
      title: title,
      release: release,
      score: score,
    };
    if (characters) {
      const foundCharacters = await Character.find({
        name: { $in: characters },
      });
      newMovie.characters = foundCharacters.map((character) => character._id);
    } else {
      newMovie.characters = [];
    }
    newMovie.createdBy = userId;
    newMovie.updatedBy = userId;
    const movieC = await Movie.create(newMovie);
    res.status(201).json(movieC);
  } catch (error) {
    DEBUG(`[createMovies]: ${error}`);
    res.status(500).json({ error: "Failed creating movie" });
  }
};

export const updateByIdMovie = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    let movie = req.body;
    movie.updatedBy = userId;
    const movieU = await Movie.findByIdAndUpdate(id, movie);
    res.status(200).json({ message: `movie id:${id} updated` });
  } catch (error) {
    res.status(500).json({ error: "Failed updating movie" });
  }
};

export const deleteByIdMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movieD = await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: `caharacter id deleted` });
  } catch (error) {}
};
