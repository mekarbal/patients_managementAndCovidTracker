const mongoose = require('mongoose');
const { router } = require('../app');

const patientSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    cin : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
})



module.exports = mongoose.model('Patient', patientSchema)