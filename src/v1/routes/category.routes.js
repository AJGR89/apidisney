import { Router } from "express";
import {
  getCategories,
  deleteByIdCategory,
  updateByIdCategory,
  createCategory,
} from "../../controllers/category.controller";
import { validateCategory } from "../../middlewares/verifyRegister";

const router = Router();

router.get("/", getCategories);
router.post("/", validateCategory, createCategory);
router.put("/:id", validateCategory, updateByIdCategory);
router.delete("/:id", deleteByIdCategory);

export default router;
