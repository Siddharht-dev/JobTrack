const express = require("express");
const router = express.Router();
import auth from "../Middleware/Authentication";
router.get("/", auth, async (req, res) => {
    try {
        const jobs = await Job.find({userId : req.userId});
        res.json(jobs);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


router.post("/",auth, async (req, res)=>{
    try{

        const job = await Job.create({
            ...req.body,
            userId:req.userId
        });
        res.send("Job received");
    }
    catch(err){
        res.status(500).send("Something went wrong");
    }
})


router.put("/:id", auth, async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate({
            userId:req.userId,
            _id: req.params.id
        },
        req.body);

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


router.delete("/:id", auth, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

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

module.exports = router;