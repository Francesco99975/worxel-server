import { Router } from "express";
import { getEmployee, createEmployee, createShift, setFlags, updateEmployee, deleteEmployee } from "../controllers/employee";
import isAuth from "../middlewares/isAuth";
import isManager from "../middlewares/isManager";

const router = Router();

router
.get('/:id', isAuth, getEmployee)
.post('/add', isAuth, createEmployee)
.post('/shift', isAuth, isManager, createShift)
.post('flags', isAuth, setFlags)
.put('/update/:id', isAuth, updateEmployee)
.delete('/delete/:id', isAuth, deleteEmployee);

export default router;