const validator = require('validator')
const ValidationUser = (req) =>{
    const{emailId, password, firstName, lastName} = req.body ;

   if(!firstName || !lastName ){
    throw new Error("Please ENter firstname or lastName ");
   }
    
   else if(!validator.isEmail(emailId)){
     throw new Error('Please Enter a valid Email');

   }
   else if(!validator.isStrongPassword(password)){
     throw new Error("Please Enter a Strong Password");
     
   }
 
};

const validateEditProfile = (req) =>{
  
   const AllowUpdate = [
    "firstName", 
    "lastName",
    "age", 
    "skills",
     "Gender", 
     "Profile"
    ]
    
    const updates = Object.keys(req.body)
    const isAllowed = update.every(field =>{
           AllowUpdate.includes(field);
    });

    return isAllowed ; 
}

module.exports ={
 ValidationUser ,
 validateEditProfile
};