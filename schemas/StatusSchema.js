const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatusSchema  = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    }
}, {
    //timestamps: true
});

const Status = mongoose.model('Status', StatusSchema );
module.exports = Status