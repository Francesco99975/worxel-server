import { Router } from "express";
import { getBusiness, updateBusiness, deleteBusiness } from "../controllers/business";
import isAuth from "../middlewares/isAuth";

const router = Router();

router
.get('/:id', isAuth, getBusiness)
.put('/update/:id', isAuth, updateBusiness)
.delete('/delete/:id', isAuth, deleteBusiness);

export default router;