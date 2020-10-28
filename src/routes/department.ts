import { Router } from "express";
import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department";
import isAuth from "../middlewares/isAuth";

const router = Router();

router
.get('/', isAuth, getDepartments)
.get('/:id', isAuth, getDepartment)
.post('/add', isAuth, createDepartment)
.put('/update/:id', isAuth, updateDepartment)
.delete('/delete/:id', isAuth, deleteDepartment);

export default router;