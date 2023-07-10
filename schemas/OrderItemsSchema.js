const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItemsSchema  = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    menuItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        require: true
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    // timestamps: true
});

const OrderItems = mongoose.model('OrderItem', OrderItemsSchema );
module.exports = OrderItems