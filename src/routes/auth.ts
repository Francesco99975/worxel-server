import { Router } from "express";
import { signUp, login } from "../controllers/auth";

const router = Router();

router.post('/signup', signUp).post('/login', login);

export default router;