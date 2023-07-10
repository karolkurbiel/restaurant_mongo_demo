const express = require('express');
const router = express.Router();
const OrderItems = require('./../schemas/OrderItemsSchema');
const MenuItem = require('./../schemas/MenuItemSchema');
const Category = require('./../schemas/CategorySchema');
const Customer = require('./../schemas/CustomerSchema')

// GET all order items
router.get('/', async (req, res, next) => {
    try {
        const orderItems = await OrderItems.find()
            .populate('customer')
            .populate('menuItems');
        const menuItems = await MenuItem.find().populate('category');
        const categories = await Category.find();
        const customers = await Customer.find();

        res.render('orderitems', { title: 'Order Items', orderItems, menuItems, categories, customers });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST create a new order item
router.post('/create', async (req, res, next) => {
    try {
        const { menuItems, customer } = req.body;
        const menuItemIds = Array.isArray(menuItems) ? menuItems : [menuItems];
        const selectedMenuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

        const newOrderItems = new OrderItems({customer, menuItems: selectedMenuItems });
        await newOrderItems.save();
        res.redirect('/orderitems');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST delete an order item
router.post('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await OrderItems.findByIdAndRemove(id);
        res.redirect('/orderitems');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;