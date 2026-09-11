const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try{
        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];

        const decodeed = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decodeed.userId;

        next();
    }
    catch(err){
        return res.status(401).send("Invalid token")
    }
}

module.exports = auth;