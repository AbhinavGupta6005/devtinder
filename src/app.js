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
