import { Router } from "express";
import {
  getCharacters,
  deleteByIdCharacter,
  updateByIdCharacter,
  createCharacter,
} from "../../controllers/characters.controller";
import { validateCharacter } from "../../middlewares/verifyRegister";

const router = Router();

router.get("/", getCharacters);
router.post("/", validateCharacter ,createCharacter);
router.put("/:id", validateCharacter,updateByIdCharacter);
router.delete("/:id", deleteByIdCharacter);

export default router;
