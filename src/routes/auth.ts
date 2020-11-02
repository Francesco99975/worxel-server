import { Router } from "express";
import { signUp, login, resetPassword, confirmReset } from "../controllers/auth";

const router = Router();

router
.post('/signup', signUp)
.post('/login', login)
.post('/reset', resetPassword)
.post('/confirm', confirmReset);

export default router;