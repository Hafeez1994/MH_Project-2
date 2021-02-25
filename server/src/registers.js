const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    password : {
        type: Number,
        required: true,
        unique: true
    },
    confirmpassword : {
        type: Number,
        required: true,
        unique: true
    }

})

//now we need to create collections

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;