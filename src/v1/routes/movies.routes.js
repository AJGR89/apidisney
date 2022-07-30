import { Router } from "express";
import {
  getMovies,
  deleteByIdMovie,
  updateByIdMovie,
  createMovie,
} from "../../controllers/movies.controller";
import { validateMovie } from "../../middlewares/verifyRegister";

const router = Router();

router.get("/", getMovies);
router.post("/", validateMovie, createMovie);
router.put("/:id", validateMovie ,updateByIdMovie);
router.delete("/:id", deleteByIdMovie);

export default router;
