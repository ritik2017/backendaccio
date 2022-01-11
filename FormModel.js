const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    grade: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('FormDetails', formSchema);