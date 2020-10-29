import { Request, Response, NextFunction } from "express";
import { HttpException } from "../interfaces/error";
import Employee from "../models/employee";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user;
    try {
        const existingEmp = await Employee.findById(id);
        if(!existingEmp) {
            throw new HttpException(401, "Unauthorized Access to Employee!");
        }
        return next();
    } catch (error) {
        return next(error);
    }
};