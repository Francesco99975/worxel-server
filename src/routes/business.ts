import { Router } from "express";
import { getBusiness, updateBusiness, deleteBusiness } from "../controllers/business";

const router = Router();

router
.get('/:id', getBusiness)
.put('/update/:id', updateBusiness)
.delete('/delete/:id', deleteBusiness);

export default router;