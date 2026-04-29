  const express = require('express');
   const app = express();
  const connectdb = require("./config/database");
   const User = require('./models/User');
const { model } = require('mongoose');
   

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
app.post('/signup', async (req, res) =>{
   // const user = new User(
   //    {
   //       firstName: "Sakshi ",
   //       lastName: " Arya",
   //       email: "sakshi22@gmail.com",
   //       parssword: "Sakshi@1223",

   //    });

   const user = new User(req.body);
      try{
          await user.save();
         res.send("User Successfully saved the data!")
      }
      catch(err){
            res.status(400).send("Error saving the user:"  + err.meesage);
      }
      
})

app.get("/user", async(req, res) =>{

    const userEmail = req.body.emailId ;
   try{
        const users = await User.find({emailId : userEmail})
        if(users.length=== 0){
         res.status(400).send("User not found")
        }
        else{
         res.send(users)
        }
   }
   catch(err){
       res.status(400).send("Something went wrong ")
   } 
})

 app.get("/feed", async(req, res) =>{
   const useGet = await User.find({});
   try{
    if(!user){
        res.status(400).send("User not found")
    }
     res.send(useGet);
   }
   catch(err){
      res.status(400).send("Something has wrong")
   }
})

app.delete("/user",async (req,res) =>{
    const userId = req.body.userId ;

    // const userDelelete = await User.findByIdAndDelete(userId);
    
    const userDelelete = await User.findByIdAndDelete({_Id:userId});

    try{
        res.send("Successfully user has deleted")
    }
    catch(err){
        res.status(400).send("Something has Wrong ")
    }
})
app.patch("/user",async (req, res) =>{
    const userId = req.body.userId; 
    const data = req.body ; 
    try{
        const userUpdate = await User.findByIdAndUpdate(userId, data,{
        returnDocument:'after', 
        runValidators : true,
    } );
       consosle.log(userUpdate);
       res.send("User updated Successfully");

    } catch(err){
        res.send(400).send("Something went wrong")
    }
    
});
   

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
  
   
 
   