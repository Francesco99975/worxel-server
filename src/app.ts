import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.02l8p.azure.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
.catch((err) => console.log(err));
