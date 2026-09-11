const jobRoutes = require("./Routes/JobRoutes");
const userRoutes = require("./Routes/UserRoutes");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected...");
    })
    .catch((err)=>{
        console.log("MongoDB connection failed: ",err);
    })

app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/", userRoutes)



app.listen(3001, () => {
    console.log("Server is running in port 3001");
})
