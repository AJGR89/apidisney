import { Router } from "express";
import {
  getCategories,
  deleteByIdCategory,
  updateByIdCategory,
  createCategory,
} from "../../controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateByIdCategory);
router.delete("/:id", deleteByIdCategory);

export default router;
