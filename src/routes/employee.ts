import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, createShift, setFlags, updateEmployee, deleteEmployee } from "../controllers/employee";
import isAuth from "../middlewares/isAuth";
import isBusiness from "../middlewares/isBusiness";
import isEmployee from "../middlewares/isEmployee";
import isBusinessOrManager from "../middlewares/isBusinessOrManager";


const router = Router();

router
.get('/deptId', isAuth, isBusinessOrManager, getEmployees)
.get('/:id', isAuth, getEmployee)
.post('/add', isAuth, isBusiness, createEmployee)
.post('/shift', isAuth, isBusinessOrManager, createShift)
.post('flags', isAuth, isEmployee, setFlags)
.put('/update/:id', isAuth, isBusiness, updateEmployee)
.delete('/delete/:id', isAuth, isBusiness, deleteEmployee);

export default router;