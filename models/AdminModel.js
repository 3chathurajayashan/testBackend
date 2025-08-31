
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
  validate: {
    validator: function(v) {
      return /^\d{10}$/.test(v);  
    },
    message: props => `${props.value} is not a valid 10-digit mobile number!`
  }
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

 

