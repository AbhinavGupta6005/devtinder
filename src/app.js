const express = require("express");

const app = express();

const {adminAuth} = require("./middlewares/auth.js")

// Handle Auth Middleware for all Get Post,... request
app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
    res.send("User data sent");
})

app.get("/admin/getAllData", (req,res) => {
    res.send("All Data sent")
})
app.get("/admin/deleteuser", (req,res) => {
    res.send("Delete a user")
})

app.listen(3000, ()=> {
    console.log("server is successfully listening on port 3000...")
});