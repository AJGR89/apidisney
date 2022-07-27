import { Router } from "express";
import {
  getCharacters,
  deleteByIdCharacter,
  updateByIdCharacter,
  createCharacter,
} from "../../controllers/characters.controller";

const router = Router();

router.get("/", getCharacters);
router.post("/", createCharacter);
router.put("/:id", updateByIdCharacter);
router.delete("/:id", deleteByIdCharacter);

export default router;
