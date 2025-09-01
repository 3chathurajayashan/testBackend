
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({


    name:{
        type : String,
        required :true,
        trim:true,
    },
      gmail:{
        type : String,
        required :true,
        trim:true,
    },
    mobile: {
  type: String,
  required: true,
   
},
  password:{
        type : String,
        required :true,
        trim:true,
    },
      homeTown:{
        type : String,
        required :true,
        trim:true,
    },

 
});

module.exports = mongoose.model(
    "adminModel",
    adminSchema
)

 

