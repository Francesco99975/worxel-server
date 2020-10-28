import { Request, Response, NextFunction } from "express";
import { HttpException } from "../interfaces/error";
import Employee from "../models/employee";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user;
    try {
        const existingManager = await Employee.findOne({_id: id, manager: true});
        if(!existingManager) {
            throw new HttpException(404, "Manager not found!");
        }
        return next();
    } catch (error) {
        return next(error);
    }
};