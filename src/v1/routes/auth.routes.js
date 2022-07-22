import { Router } from "express";
import { login,register } from "../../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../../middlewares/verifyRegister";

const router = Router();

router.post('/login',login);
router.post('/register',[checkDuplicateUsernameOrEmail],register);

export default router;