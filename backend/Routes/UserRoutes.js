const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");


router.post("/register", async (req, res)=>{ //Regiter
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

router.post("/login", async (req, res)=>{ //Login
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

module.exports = router;