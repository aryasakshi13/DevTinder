const express = require("express");
const profileRouter = express.Router();
const authUser = require("../middleware/auth");

profileRouter.get("/profile/view", authUser, async(req, res) =>{
        try{
            const user = req.user ;
            res.send(user) ; 
      }
      catch(err){
        res.status(400).send("ERROR: " + err.message)
      }
})

profileRouter.patch("/profile/edit",(req, res)=>{
    const AllowUpdate = [
    "firstName", 
    "lastName",
    "age", 
    "skills",
     "Gender", 
     "Profile"
    ]
    
    const updates = Object.keys(req.body)
    const isAlowed = update.every(field =>{
           AllowUpdate.includes(field);
    });

     if(!isAlowed){
       throw new Error("Invalid User");
     }

     const user = req.user ;

      updates.forEach(field =>{
        user[field] = req.body[field];
      }) ;

      await user.save();

      res.send("Profile Updated Succef")

})



module.exports = profileRouter ;