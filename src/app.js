  const express = require('express');
   const app = express();
 

   app.use("/user", (req, res)=>{
    res.send("helloooooooo");
 })
  
//   This will only handle et call to user  
 app.get("/user", (req,res) =>{
    res.send({fistName:"Sakshi", lastName:"Arya"})
 })
  
  app.post("/user", (req, res)=>{
    // firstly write the logic of Saving data to db  
       res.send("Successfully save the data to db");
    
  })

   app.delete("/user", (req, res) =>{
     res.send("deleted user Successfully");
   })
   // This will match all the http method API calls to /test
     app.use("/hello", (req, res)=>{
    res.send("hello from hello path");
 })
  
   
  app.listen(7777, ()=> {
     console.log("Server is Successfully listening on port 7777");
  })
   