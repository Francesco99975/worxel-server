import { Router } from "express";
import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department";

const router = Router();

router
.get('/', getDepartments)
.get('/:id', getDepartment)
.post('/add', createDepartment)
.put('/update/:id', updateDepartment)
.delete('/delete/:id', deleteDepartment);

export default router;