import { Schema, model, Types } from "mongoose";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default model('Department', departmentSchema);