import { Request, Response, NextFunction } from "express";
import { HttpException } from "../interfaces/error";
import Business from "../models/business";
import Employee from "../models/employee";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user;
    try {
        let existingAdmin = await Business.findById(id);
        if(!existingAdmin) {
            existingAdmin = await Employee.findOne({_id: id, manager: true});
            if(!existingAdmin) {
                throw new HttpException(401, "Unauthorized Access to Admin Functions!");
            }
        }    
        return next();
    } catch (error) {
        return next(error);
    }
};