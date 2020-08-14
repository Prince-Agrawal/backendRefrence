const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    //get auth header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        // get token from array
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, "secretkey", (err, verifiedJwt) => {
            if (err) {
                console.log("unauthorized");
                res.sendStatus(403);
            } else {
                req.token = bearerToken;
                next();
            }
        });

        //next middelware
    } else {
        //forbidden
        console.log("unauthorized");
        res.sendStatus(403);
    }
};

module.exports = verifyToken;
