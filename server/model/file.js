const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    cin:{
        type : String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    question : {
        type : [String]
    },
    result: {
        type: String
    }
})

module.exports = mongoose.model('File',fileSchema )