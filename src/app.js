  const express = require('express');

  const app = express();
  
 app.use("/test", (req,res) =>{
    res.send("hello server")
 })

 app.use("/hello", (req, res)=>{
    res.send("hello from hello path");
 })
 
   
  app.listen(7777, ()=> {
     console.log("Server is Successfully listening on port 7777");
  })
   