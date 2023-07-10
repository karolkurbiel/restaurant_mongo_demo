const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema  = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, {
    //timestamps: true
});

const Customer = mongoose.model('Customer', CustomerSchema );
module.exports = Customer