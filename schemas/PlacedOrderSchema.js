const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlacedOrderSchema  = new Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    timestamp: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    }
}, {
    //timestamps: true
});

const PlacedOrder = mongoose.model('PlacedOrder', PlacedOrderSchema );
module.exports = PlacedOrder