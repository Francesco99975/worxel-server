import { Request, Response, NextFunction } from "express";
import { HttpException } from "../interfaces/error";
import Business from "../models/business";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user;
    try {
        const existingBusiness = await Business.findById(id);
        if(!existingBusiness) {
            throw new HttpException(401, "Unauthorized Access to Business Functions!");
        }
        return next();
    } catch (error) {
        return next(error);
    }
};