import { Request, Response, NextFunction } from "express";
import Employee from "../models/employee";

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {

};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {};

const createShift = async (req: Request, res: Response, next: NextFunction) => {};

const setFlags = async (req: Request, res: Response, next: NextFunction) => {};

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {};

export { getEmployee, createEmployee, createShift, setFlags, updateEmployee, deleteEmployee };