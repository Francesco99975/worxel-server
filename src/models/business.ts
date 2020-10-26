import { Schema, model, Types } from "mongoose";

const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: {
        type: [Types.ObjectId],
        ref: "Department"
    },
    managers: {
        type: [Types.ObjectId],
        ref: "Manager"
    },
    employees: {
        type: [Types.ObjectId],
        ref: "Employee"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model('Business', businessSchema);