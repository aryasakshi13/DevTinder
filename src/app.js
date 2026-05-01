  const express = require('express');
  const app = express();
  const connectdb = require("./config/database");
  const User = require('./models/User');
  const { model } = require('mongoose');
  const ValidationUser = require("./utills/Validation");
  const bcrypt = require('bcrypt');
  const cookieparser = require("cookie-parser");
  const cookieParser = require('cookie-parser');
  const jwt = require("jsonwebtoken");
  const authUser = require("./middleware/auth");

   

//    app.use("/user", (req, res)=>{
//     res.send("helloooooooo");
//  })
  
// //   This will only handle et call to user  
//  app.get("/user", (req,res) =>{
//     res.send({fistName:"Sakshi", lastName:"Arya"})
//  })
  
//   app.post("/user", (req, res)=>{
//     // firstly write the logic of Saving data to db  
//        res.send("Successfully save the data to db");
    
//   })

//    app.delete("/user", (req, res) =>{
//      res.send("deleted user Successfully");
//    })
//    // This will match all the http method API calls to /test
//      app.use("/hello", (req, res)=>{
//     res.send("hello from hello path");
//  })



app.use(express.json());
app.use(cookieParser());


app.post('/signup', async (req, res) =>{
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

app.post("/login", async(req, res) =>{
    const{emailId, password} = req.body ;

    const user = await User.findOne({emailId :emailId})

    if(!user){
        throw new Error("Invalid User");
    }

    const passwordMatch  = await bcrypt.compare(password, user.password)
    if(passwordMatch){
        // jwt Token 
       const token =  await jwt.sign({_id: user._id}, "DevTinder@3112", {
         expiresIn: "1d" 
       })

   
        res.cookie("token", token , {
            expires : new Date(Date.now() + 8 * 3600000)
        })
        res.send("User login Successully")

    }
    else{
        throw new Error("Invalid Credential");
    }
})

app.get("/profile", authUser, async(req, res) =>{
        try{
            const User = req.user ;
            res.send(user) ; 
      }
      catch(err){
        res.status(400).send("ERROR: " + err.message)
      }

    
})

// app.get("/user", async(req, res) =>{

//     const userEmail = req.body.emailId ;
//    try{
//         const users = await User.find({emailId : userEmail})
//         if(users.length === 0){
//          res.status(400).send("User not found")
//         }
//         else{
//          res.send(users)
//         }
//    }
//    catch(err){
//        res.status(400).send("Something went wrong ")
//    } 
// })

//  app.get("/feed", async(req, res) =>{
//    const useGet = await User.find({});
//    try{
//     if(!user){
//         res.status(400).send("User not found")
//     }
//      res.send(useGet);
//    }
//    catch(err){
//       res.status(400).send("Something has wrong")
//    }
// })

// app.delete("/user",async (req,res) =>{
//     const userId = req.body.userId ;

//     // const userDelelete = await User.findByIdAndDelete(userId);
    
//     const userDelelete = await User.findByIdAndDelete({_Id:userId});

//     try{
//         res.send("Successfully user has deleted")
//     }
//     catch(err){
//         res.status(400).send("Something has Wrong ")
//     }
// })
// app.patch("/user/:userId",async (req, res) =>{
//     const userId = req.params?.userId; 
//     const data = req.body ; 
//     try{
//         const allowed_update = [
//             "skills",
//             "age",
//              "about",
//              "gender",
//              "password"
//         ]

//         const isAllowedUpdate = Object.keys(data).every((k)=>
//         allowed_update.includes(k)
//     );
//      if(!isAllowedUpdate){
//         throw new Error("Update not allowed");
//      }
//         const userUpdate = await User.findByIdAndUpdate(userId, data,{
//         returnDocument:'after', 
//         runValidators : true,
//     } );
//        console.log(userUpdate);
//        res.send("User updated Successfully");

//     } catch(err){
//         res.send(400).send(err.message)
//     }
    
// });
   

app.get("/sendconnectionreq" , (req, res) =>{
    console.log("Sending connection req");
    res.send("Sending connection req ");
})

 connectdb()
 .then(()=>{
   console.log('Databseis successfully connected');
    app.listen(7777, ()=> {
     console.log("Server is Successfully listening on port 7777");
  })
 }) 
 .catch((err) =>{
     console.log("Database cannot be connected");
 })
  
   
 
   