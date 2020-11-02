import { Schema, model, Types } from "mongoose";

const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: [{
        type: Types.ObjectId,
        ref: "Department"
    }],
    employees: [{
        type: Types.ObjectId,
        ref: "Employee"
    }],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date
}, {timestamps: true});

export default model('Business', businessSchema);