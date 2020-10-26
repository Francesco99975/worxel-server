import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import businessRoutes from "./routes/business";
import departmentRoutes from "./routes/department";
import employeeRoutes from "./routes/employee";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.02l8p.azure.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

app.use(morgan("combined"));

app.use('/auth', authRoutes);
app.use('/businesses', businessRoutes);
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);
app.use((req: any, res: any, next: Function) => {
    return res.status(404).json({message: "Content not found"});
});
app.use((error: any, req: any, res: any, next: Function) => {
    console.log(error);
    return res.status(500).json({message: "An error occurred on the server"});
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
.catch((err) => console.log(err));
