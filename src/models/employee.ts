import { Schema, model, Types } from "mongoose";

const employeeSchema = new Schema({
    name: {
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
    }
}, {timestamps: true});

export default model('Employee', employeeSchema);