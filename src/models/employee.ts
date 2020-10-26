import { Schema, model, Types } from "mongoose";

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: Types.ObjectId,
        ref: "Department"
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

export default model('Employee', employeeSchema);