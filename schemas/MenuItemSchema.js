const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    price: {
        type: Number,
        require: true
    },
}, {
    //timestamps: true
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem