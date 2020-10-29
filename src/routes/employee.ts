import { Router } from "express";
import { getEmployee, createEmployee, createShift, setFlags, setDaysOff, updateEmployee, deleteEmployee } from "../controllers/employee";
import isAuth from "../middlewares/isAuth";
import isBusiness from "../middlewares/isBusiness";
import isEmployee from "../middlewares/isEmployee";
import isManager from "../middlewares/isManager";


const router = Router();

router
.get('/:id', isAuth, getEmployee)
.post('/add', isAuth, isBusiness, createEmployee)
.post('/shift', isAuth, isManager, createShift)
.post('flags', isAuth, isEmployee, setFlags)
.post("/daysoff", isAuth, isEmployee, setDaysOff)
.put('/update/:id', isAuth, isBusiness, updateEmployee)
.delete('/delete/:id', isAuth, isBusiness, deleteEmployee);

export default router;