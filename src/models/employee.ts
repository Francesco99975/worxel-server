import { Schema, model, Types } from "mongoose";
import { Shift, Flag } from "../interfaces/employee";

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    departments: [{
        type: Types.ObjectId,
        ref: "Department"
    }],
    color: String,
    priority: {
        type: Number,
        required: true
    },
    shifts: [Object],
    flags: [Object],
    daysOff: [Object],
    manager: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    businessId: {
        type: Types.ObjectId,
        ref: 'Business'
    },
    resetToken: String,
    resetTokenExpiration: Date
}, {timestamps: true});

export default model('Employee', employeeSchema);