const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const {validateEditProfileDate} = require("../utils/validation.js")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // const { _id } = decodedMessage; 

    const user = req.user; 

    res.send(user);

    // res.send("reading Cookies");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
  try {
    if(!validateEditProfileDate(req)){
      throw new Error("Invalid Edit Request");
    };

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({message:`${loggedInUser.firstName}, Your Profile Updated Successfully...`,
    date: loggedInUser
    });
  } catch (error) {
    res.status(400).send("ErroR : " + error.message);
  }
})

module.exports = profileRouter;