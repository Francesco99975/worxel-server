import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import Business from "../models/business";
import Department from "../models/department";
import Employee from "../models/employee";
import { AccountType, AccountCredentials, LoginAccountCredentials, ResetCredentials } from "../interfaces/auth";
import { HttpException } from "../interfaces/error";

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY!
    })
);

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, name} = req.body as AccountCredentials;
    
    try {
        const existingBusiness = await Business.findOne({email: email});
        if(existingBusiness) {
            throw new HttpException(401 ,"This email was already used for another business");
        }
        const hashedpassword = await bcrypt.hash(password, 12);
        const newBusiness = await new Business({name, email, password: hashedpassword}).save();
        const department = await new Department({name: "default", businessId: newBusiness._id}).save();
        newBusiness.set('departments', [department._id]);
        const business = await newBusiness.save();
        return res.status(201).json({message: "Business Account, successfully created!", businessId: business._id.toString()});
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
                {email: business.get('email'), id: business._id.toString()}, 
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
                {email: manager.get('email'), id: manager._id.toString()}, 
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
                {email: employee.get('email'), id: employee._id.toString()}, 
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

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, accountType } = req.body as {email: string, accountType: number};
    let user;
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if(err) throw new HttpException(500, "Crypto failed for an unknown reason!");

            const token = buffer.toString("hex");

            switch(accountType) {
                case 0:
                    user = await Business.findOne({email});
                    break;
                case 1:
                    user = await Employee.findOne({email, manager: true});
                    break;
                case 2:
                    user = await Employee.findOne({email, manager: false});
                    break;
                default:
                    throw new HttpException(401, "Invalid Account Type");
            }

            if(!user) {
                throw new HttpException(404, "User not found");
            }

            user.set('resetToken', token);
            user.set('resetTokenExpiration', Date.now() + 3600000);
            await user.save();
            res.status(200).json({message: "Reset Request Sent"});
            return transport.sendMail({
                to: user.get('email'),
                from: "francescobarranca@outlook.com",
                subject: "Password Reset",
                html: `<p>You requested a password reset</p>
                        <p>Click this <a href="http://localhost:5000/reset/${token}">link</a> to set a new password.</p>`,
              });
        });
    } catch (error) {
        return next(error);
    }
};

const confirmReset = async (req: Request, res: Response, next: NextFunction) => {
    const { password, password2, passwordToken, id, accountType } = req.body as ResetCredentials;

    let user;

    switch(accountType) {
        case 0:
            user = await Business.findOne({
                _id: id,
                resetToken: passwordToken,
                resetTokenExpiration: { $gt: Date.now() },
            });
            break;
        case 1 || 2:
            user = await Employee.findOne({
                _id: id,
                resetToken: passwordToken,
                resetTokenExpiration: { $gt: Date.now() },
            });
            break;
        default:
            throw new HttpException(401, "Invalid Account Type");
    }

    if(!user) {
        throw new HttpException(404, "User not found");
    }

    if (password !== password2) {
        throw new HttpException(422, "Passwords don't match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.set('password', hashedPassword);
    user.set('resetToken', undefined);
    user.set('resetTokenExpiration', undefined);
    await user.save();

    res.status(201).json({message: "password updated!"});
    return transport.sendMail({
        to: user.get('email'),
        from: "francescobarranca@outlook.com",
        subject: "Password Reset Success",
        html: `<h1>Your password was resetted successfully!</h1>`,
    });
};

export {signUp, login, resetPassword, confirmReset};