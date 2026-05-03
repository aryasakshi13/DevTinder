const express = require("express");
const requestRouter = express.Router();
 const authUser = require("../middleware/auth");

requestRouter.get("/sendconnectionreq" , (req, res) =>{
    console.log("Sending connection req");
    res.send("Sending connection req ");
})

module.exports = requestRouter;