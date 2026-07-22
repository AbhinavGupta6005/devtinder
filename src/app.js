const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const dns = require("dns");
const User = require("./models/user.js");
const validatesignUpData = require("./utils/validation.js");
const bcrypt = require("bcrypt");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  //validation the data
  try {
    validatesignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)
    

    const user = new User({
      firstName,
      lastName,
      emailId, 
      password: passwordHash
    });

    await user.save();
    res.send("User added succesfully!!");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/login", async(req, res)=> {
  try {
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("Login Successful!!")
    }
    else{
      throw new Error("Invalid Credentials")
    }
  } catch (error) {
    res.status(400).send("Error: "+ error.message)
  }
})

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId})
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Succesfully");
  } catch (error) {
    res.status(400).send("Somthing went wrong!");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated Succesfully");
  } catch (error) {
    res.status(400).send("Somthing went Wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
