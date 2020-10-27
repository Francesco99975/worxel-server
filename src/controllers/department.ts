import { Request, Response, NextFunction } from "express";
import Department from "../models/department";
import { HttpException } from "../interfaces/error";

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({departments});
    } catch (error) {
        return next(error);
    }
};

const getDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);
        if(!department) {
            throw new HttpException(404, "Could not find any department with this id");
        }
        return res.status(200).json({department});
    } catch (error) {
        return next(error);
    }
};

const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { name, businessId } = req.body as { name: string, businessId: string };
    try {
        const department = await new Department({name, businessId}).save();
        return res.status(201).json({message: 'Department Created Succesfully', department});
    } catch (error) {
        return next(error);
    }
};

const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body as { name: string };

    try {
        const department = await Department.findById(id);
        if(!department) {
            throw new HttpException(404, "Could not find any department with this id");
        }
        department.set('name', name);
        await department.save();
        return res.status(201).json({message: "Department Updated"});
    } catch (error) {
        return next(error);
    }
};

const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const department = await Department.findById(id);
        if(!department) {
            throw new HttpException(404, "Could not find any department with this id");
        }
        await Department.findByIdAndDelete(id);
        return res.status(201).json({message: "Department Deleted"});
    } catch (error) {
        return next(error);
    }
};

export { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment };