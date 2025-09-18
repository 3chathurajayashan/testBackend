const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gmail: {  
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    homeTown: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "inventory", "sales"]  
    }
}, { timestamps: true });

module.exports = mongoose.model("employeeModel", employeeSchema);
