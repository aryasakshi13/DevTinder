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
      unique: true,
      lowercase: true,
      trim: true
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
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
        required:true,
       
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