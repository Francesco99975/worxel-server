import { Schema, model, Types } from "mongoose";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    businessId: {
        type: Types.ObjectId,
        required: true
    }
}, {timestamps: true});

export default model('Department', departmentSchema);