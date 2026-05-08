const express = require("express");
const authRouter = express.Router();
const  {ValidationUser} = require("../utills/Validation");
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


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


// authRouter.post("/forgotPassword",(req, res) =>{

//    try{ 

//             const {emailId} = req.body ;
//             const user = await User.findOne({emailId :emailId});
            
//             if(!user){
//                 return res.status(400).json({message: "There is no user that email address."});
//             }
//             const token = user.createPasswordResetToken();
            
//             await user.save({validateBeforeSave: false});

//             const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`

//             console.log("Reset Link:" , resetURL);

//             res.status(200).json({
//                 status:"Success",
//                 message: "Token sent to email!(check your console for the link)",
//             });

//     }catch(err){            
//          res.status(400).send("ERROR:" + err.message);
//     }
  

//  });


 module.exports = authRouter;

