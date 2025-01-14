import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./Routes/userRoutes/userRoutes"
import supplierRoutes from "./Routes/supplierRoutes/supllierRoutes"
import clientRoutes from "./Routes/clientRoutes/clientRoutes"
import familyRoutes from "./Routes/familyRoutes/familyRoutes"
import storeRoutes from "./Routes/storeRoutes/storeRoutes"

import cors from "cors"
import bodyParser from "body-parser"
dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
}))

// use bodyParser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());

// use routes
app.use(supplierRoutes);
app.use(userRoutes);
app.use(clientRoutes);
app.use(familyRoutes);
app.use(storeRoutes);




app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.DB_CONNECTION as string).then((conn) => {
        console.log("mongo db connected");
    })
        .catch(err => {
            console.log(err?.message);
        })
})
