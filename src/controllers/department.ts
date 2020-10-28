import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Department from "../models/department";
import Business from "../models/business"
import { HttpException } from "../interfaces/error";

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user;
    try {
        const departments = await Department.find({businessId: id});
        return res.status(200).json({departments});
    } catch (error) {
        return next(error);
    }
};

const getDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const department = await Department.findOne({_id: id, businessId: res.locals.user.id});
        if(!department) {
            throw new HttpException(404, "Could not find any department with this id");
        }
        return res.status(200).json({department});
    } catch (error) {
        return next(error);
    }
};

const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body as { name: string };
    const businessId = res.locals.user.id;
    try {
        const department = await new Department({name, businessId}).save();
        const business = await Business.findById(businessId);
        if(!business) {
            throw new HttpException(404, "Could not find any business with this id");
        }
        let depts = business.get('departments') as Array<Types.ObjectId>;
        depts.push(department._id);
        business.set('departments', depts);
        await business.save();
        return res.status(201).json({message: 'Department Created Succesfully', department});
    } catch (error) {
        return next(error);
    }
};

const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body as { name: string };
    const businessId = res.locals.user.id;

    try {
        const department = await Department.findOne({_id: id, businessId});
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
    const businessId = res.locals.user.id;

    try {
        const department = await Department.findOne({_id: id, businessId});
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