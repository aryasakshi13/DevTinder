const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   firstName: {
    type: String,
    minLength: 4,
    maxLength: 50,
    required: true 

   },
    lastName: {
      type: String

   },
   emailId: {
      type: String,
      required: true,
      unique: true 
   },
   password: {
    type: String,
    minLength: 8 ,
    maxLength: 20,
    required: true
   },
    age: {
        type: String
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "Female", "Other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
       
    },
    about: {
        default: "We are motivated techie!",
    },
    skills:{
         type: [string],
    },

});

const User = mongoose.model("User", userSchema)
    module.exports = User ;