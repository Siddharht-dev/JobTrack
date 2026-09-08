const express = require("express");
require("dotenv").config();

const app = express();

const mongoose = require("mongoose");

const Job = require("./Models/Jobs")

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected...");
    })
    .catch((err)=>{
        console.log("MongoDB connection failed: ",err);
    })

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello from jobTrack Backend");
})

app.post("/jobs", async (req, res)=>{
    const job = await Job.create(req.body);
    res.send("Job received");
})

app.get("/jobs", async (req, res)=>{
    const jobs = await Job.find();
    res.json(jobs);
})

app.put("/jobs/:id", async (req, res)=>{
    const job = await Job.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.json(job);
})

app.delete("/jobs/:id", async (req, res) => {

    const job = await Job.findByIdAndDelete(req.params.id);

    res.json(job);

});


app.listen(3001, () => {
    console.log("Server is running in port 3001");
})
