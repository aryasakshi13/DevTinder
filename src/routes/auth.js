const express = require("express");
const authRouter = express.Router();
const ValidationUser = require("../utills/Validation");
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");



authRouter.post('/signup', async (req, res) =>{
   // const user = new User(
   //    {
   //       firstName: "Sakshi ",
   //       lastName: " Arya",
   //       email: "sakshi22@gmail.com",
   //       parssword: "Sakshi@1223",

   //    });

   try{

    // Validate the data 
       ValidationUser(req);

       const {firstName, lastName, emailId, password} = req.body ;

    // Encrypt thr password
      

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashPassword
    });
      
          await user.save();
         res.send("User Successfully saved the data!")
      }
      catch(err){
            res.status(400).send("Error saving the user:"  + err.message);
      }
      
})

authRouter.post("/login", async(req, res) =>{
    const{emailId, password} = req.body ;

    const user = await User.findOne({emailId :emailId})

    if(!user){
        throw new Error("Invalid User");
    }

    const passwordMatch  = await user.validPassword(password);
    if(passwordMatch){
        // jwt Token 
       const token =  await user.getJwt();
   
        res.cookie("token", token , {
            expires : new Date(Date.now() + 8 * 3600000)
        })
        res.send("User login Successully")

    }
    else{
        throw new Error("Invalid Credential");
    }
})

authRouter.post("/logout", (req,res) =>{
    res.cookie("token", null,{
        expires: new Date(Date.now())
    });

    res.send("Logout Successsfully");
});


module.exports = authRouter;