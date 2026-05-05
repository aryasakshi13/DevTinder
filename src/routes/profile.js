const express = require("express");
const profileRouter = express.Router();
const authUser = require("../middleware/auth");
const {validateEditProfile} = require('../utills/Validation')

profileRouter.get("/profile/view", authUser, async(req, res) =>{
        try{
            const user = req.user ;
            res.send(user) ; 
      }
      catch(err){
        res.status(400).send("ERROR: " + err.message)
      }
})

profileRouter.patch("/profile/edit", authUser, async(req, res)=>{
   
    try{

        if(!validateEditProfile(req)){
       throw new Error("Invalid Edit request");
     }
 
     const loggedInUser = req.user ;

      Object.keys(req.body).forEach(field =>{
        loggedInUser[field] = req.body[field];
      }) ;

      await loggedInUser.save();

      res.send(`${loggedInUser.firstName}, your profile updated successfully`);
    }
    catch(err){
        res.status(400).send("ERROR :"  + err.message);
    }
     

})





module.exports = profileRouter ;