const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({

   name:{
    type :String, //datatype
    required:true, //validate
   },
    age:{
    type :Number, //datatype
    required:true, //validate
   },
    email:{
    type :String, //datatype
    required:true, //validate
   },


});

module.exports = mongoose.model(
    "userModel", //filename
    userSchema //function name
)