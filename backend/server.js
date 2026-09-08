const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

const mongoose = require("mongoose");

const Job = require("./Models/Jobs")
const User = require("./Models/User")

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected...");
    })
    .catch((err)=>{
        console.log("MongoDB connection failed: ",err);
    })

app.use(express.json());

//This is for Jobs

app.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


app.post("/jobs", async (req, res)=>{
    try{
        const job = await Job.create(req.body);
        res.send("Job received");
    }
    catch(err){
        res.status(500).send("Something went wrong");
    }
})


app.put("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if(!job){
            return res.status(404).send("Job not found");
        }

        res.json(job);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


app.delete("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if(!job){
            return res.status(404).send("Job not found");
        }

        res.json(job);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

//This is for the User

app.post("/register", async (req, res)=>{ //Regiter
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            name : req.body.name,
            email : req.body.email,
            password : hashPassword
        }
        const user = await User.create(userData);
        res.send("User created");
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Something went wrong")
    }
})

app.post("/login", async (req, res)=>{ //Login
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if(!user){
            return res.status(404).send("User does not exist");
        }

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password,
        )

        if(!isPasswordCorrect) {
            return res.status(401).send("Password is wrong");
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
        )

        res.json({
            message: "User logged in",
            token: token,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
})


app.listen(3001, () => {
    console.log("Server is running in port 3001");
})
