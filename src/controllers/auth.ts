import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Business from "../models/business";
import Employee from "../models/employee";
import { AccountType, AccountCredentials, LoginAccountCredentials } from "../interfaces/auth";
import { HttpException } from "../interfaces/error";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, name} = req.body as AccountCredentials;
    
    try {
        const existingBusiness = await Business.findOne({email: email});
        if(existingBusiness) {
            throw new HttpException(401 ,"This email was already used for another business");
        }
        const hashedpassword = await bcrypt.hash(password, 12);
        const business = await new Business({name, email, password: hashedpassword}).save();
        return res.status(201).json({message: "Business Account, successfully created!", business});
    } catch (error) {
        return next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { type, email, password } = req.body as LoginAccountCredentials;

    try {
        if(type == AccountType.BUSINESS) {
            const business = await Business.findOne({email: email});
            if(!business) {
                throw new HttpException(404,"Could not find business using these credentials");
            }
            const authorized = await bcrypt.compare(password, business.get('password'));
            if(!authorized) {
                throw new HttpException(401, "Could not access this account! Wrong Password...");
            }
            const token = jwt.sign(
                {email: business.get('email'), businessId: business._id.toString()}, 
                process.env.JWT_SECRET!, 
                {expiresIn: '1h'}
            );
            return res.status(200).json({ token, userId: business._id.toString() });
        } else if(type == AccountType.MANAGER) {
            const manager = await Employee.findOne({email: email, manager: true});
            if(!manager) {
                throw new HttpException(404, "Could not find manager using these credentials");
            }
            const authorized = await bcrypt.compare(password, manager.get('password'));
            if(!authorized) {
                throw new HttpException(401, "Could not access this account! Wrong Password...");
            }
            const token = jwt.sign(
                {email: manager.get('email'), businessId: manager._id.toString()}, 
                process.env.JWT_SECRET!, 
                {expiresIn: '1h'}
            );
            return res.status(200).json({ token, userId: manager._id.toString() });
        } else if(type == AccountType.EMPLOYEE) {
            const employee = await Employee.findOne({email: email, manager: false});
            if(!employee) {
                throw new HttpException(404, "Could not find employee using these credentials");
            }
            const authorized = await bcrypt.compare(password, employee.get('password'));
            if(!authorized) {
                throw new HttpException(401, "Could not access this account! Wrong Password...");
            }
            const token = jwt.sign(
                {email: employee.get('email'), businessId: employee._id.toString()}, 
                process.env.JWT_SECRET!, 
                {expiresIn: '1h'}
            );
            return res.status(200).json({ token, userId: employee._id.toString() });
        } else {
            throw new HttpException(404, "Inexistent Account Type!");
        }
    } catch (error) {
        return next(error);
    }
};

export {signUp, login};