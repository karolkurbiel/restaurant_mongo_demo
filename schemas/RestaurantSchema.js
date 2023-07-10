const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema  = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    }
}, {
    //timestamps: true
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema );
module.exports = Restaurant