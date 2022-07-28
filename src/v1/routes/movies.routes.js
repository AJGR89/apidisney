import { Router } from "express";
import {
  getMovies,
  deleteByIdMovie,
  updateByIdMovie,
  createMovie,
} from "../../controllers/movies.controller";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateByIdMovie);
router.delete("/:id", deleteByIdMovie);

export default router;
