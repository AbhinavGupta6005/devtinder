const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const dns = require("dns");
const User = require("./models/user.js");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added succesfully!!");
  } catch (error) {
    res.status(400).send("Error saving the user: " + err.message)
  }
});

// Get user by email
app.get("/user", async(req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({emailId: userEmail});
    if(users.length === 0){
      res.status(404).send("User not found")
    }
    else{
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong")
  }
})

// Feed API - GET /feed - get all the the users from the database
app.get("/feed", async(req, res) => {


  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong")
  }
})

app.delete("/user", async(req,res)=> {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId})
    const user = await User.findByIdAndDelete(userId)
    res.send("User Deleted Succesfully")
  } catch (error) {
    res.status(400).send("Somthing went wrong!")
  }
})

app.patch("/user", async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  console.log(data)
  try {
    await User.findByIdAndUpdate({_id: userId}, data)
    res.send("User updated Succesfully")
  } catch (error) {
    res.status(400).send("Somthing went Wrong")
  }
})

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
