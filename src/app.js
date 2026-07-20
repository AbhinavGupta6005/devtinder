const express = require("express");

const app = express();

app.use((req, res)=>{
    res.send("Hello fron the server!")
})
app.use("test", (req, res)=>{
    res.send("Hello fron the test to the server!")
})

app.listen(3000, ()=> {
    console.log("server is listen")
});