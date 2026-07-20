const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
    //  try {
       
    // } catch (error) {
        
    // }
    throw new Error("hsdfhjsd");
    res.send("User Data sent")
})

app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(500).send("somthing went wrong")
    }
})

app.listen(3000, ()=> {
    console.log("server is successfully listening on port 3000...")
});