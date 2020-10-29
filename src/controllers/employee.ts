import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { EmployeeForm } from "../interfaces/employee";
import { HttpException } from "../interfaces/error";
import Employee from "../models/employee";
import Business from "../models/business";

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if(!employee) {
            throw new HttpException(404, "Could not find any employee with this id");
        }
        employee.set('password', null);
        return res.status(200).json({employee});
    } catch (error) {
        return next(error);
    }
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const businessId = res.locals.user.id;
    const { firstname, lastname, departments, color, priority, manager, email, password } = req.body as EmployeeForm;
    try {
        const business = await Business.findById(businessId);
        if(!business) {
            throw new HttpException(404, "Could not find any business with this id");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const employee = await new Employee({firstname, lastname, departments, color, priority, manager, email, password: hashedPassword, businessId}).save();
        let emps = business.get('employees') as Array<Types.ObjectId>;
        emps.push(employee._id);
        business.set('employees', emps);
        await business.save();
        return res.status(201).json({message: "Employee Created Successfully!", empId: employee._id.toString()});
    } catch (error) {
        return next(error);
    }
};

const createShift = async (req: Request, res: Response, next: NextFunction) => {};

const setFlags = async (req: Request, res: Response, next: NextFunction) => {};

const setDaysOff = async (req: Request, res: Response, next: NextFunction) => {};

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const businessId = res.locals.user.id;
    const { departments, color, priority, manager } = req.body as EmployeeForm;

    try {
        const employee = await Employee.findOne({_id: id, businessId});
        if(!employee) {
            throw new HttpException(404, "Could not find any employee with this id");
        }
        employee.set('departments', departments);
        employee.set('color', color);
        employee.set('priority', priority);
        employee.set('manager', manager);
        await employee.save();
        return res.status(200).json({message: "Employee Updated"});
    } catch (error) {
        return next(error);
    }
};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const businessId = res.locals.user.id;

    try {
        const employee = await Employee.findOne({_id: id, businessId});
        if(!employee) {
            throw new HttpException(404, "Could not find any employee with this id");
        }
        await Employee.findByIdAndDelete(id);
        return res.status(201).json({message: "Employee Deleted"});
    } catch (error) {
        return next(error);
    }
};

export { getEmployee, createEmployee, createShift, setFlags, setDaysOff, updateEmployee, deleteEmployee };