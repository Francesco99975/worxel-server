import { Request, Response, NextFunction } from "express";
import Business from "../models/business";
import { HttpException } from "../interfaces/error";

const getBusiness = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id).populate('Department').populate('Employee');
        if(!business) {
            throw new HttpException(404, "Business not found!");
        }
        return res.status(200).json({business: {
            name: business.get('name'),
            email: business.get('email'),
            departments: business.get('departments'),
            employees: business.get('employees')
        }});
    } catch (error) {
        return next(error);
    }
};

const updateBusiness = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, email } = req.body as BusinessUpdateOptions;
    try {
        const business = await Business.findById(id);
        if(!business) {
            throw new HttpException(404, "Business not found!");
        }
        business.set('name', name);
        business.set('email', email);
        await business.save();
        return res.status(201).json({message: "Business Updated!"});
    } catch (error) {
        return next(error);
    }
};

const deleteBusiness = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        if(!business) {
            throw new HttpException(404, "Business not found!");
        }
        await Business.findByIdAndDelete(id);
        return res.status(200).json({message: "Business Updated!"});
    } catch (error) {
        return next(error);
    }
};

export { getBusiness, updateBusiness, deleteBusiness };