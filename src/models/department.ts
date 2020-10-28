import { Schema, model, Types } from "mongoose";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    businessId: {
        type: Types.ObjectId,
        ref: 'Business'
    }
}, {timestamps: true});

export default model('Department', departmentSchema);