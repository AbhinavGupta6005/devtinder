const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async(req, res, next) => {

    try {
        // Read the token from the req cookies
        const { token } = req.cookies;
        if(!token){
            throw new Error("Token not found");
        }

        const decodeObj = await jwt.verify(token, "devTinder$find");

        const { _id } = decodeObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found!");
        }
        req.user = user;

        // Validate the Token
        //Find the user
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
};

module.exports = {
    userAuth,
}