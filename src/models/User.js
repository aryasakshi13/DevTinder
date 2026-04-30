const mongoose = require("mongoose");
const validator = require("validator");
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
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid Email address:" + value);
         }
      }
   },
   password: {
    type: String,
    minLength: 8 ,
    maxLength: 100,
    required: true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter Strong Password:" + value);
        }
    }
   },
    age: {
        type: String
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
        
       
    },
    about: {
        type: String,
        default: "We are motivated techie!",
    },
    skills:{
         type: [String],
    },

},{timestamps:true});

const User = mongoose.model("User", userSchema)
    module.exports = User ;