import { Schema, model, Types } from "mongoose";

const managerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: {
        type: [Types.ObjectId],
        ref: "Department"
    },
    employees: {
        type: [Types.ObjectId],
        ref: "Employee"
    },
    color: String,
    priority: {
        type: Number,
        required: true
    },
    shifts: [Object],
    flags: [Object],
    daysOff: [Object],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model('Manager', managerSchema);