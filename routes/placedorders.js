const express = require('express');
const router = express.Router();
const PlacedOrder = require('./../schemas/PlacedOrderSchema');
const Customer = require('./../schemas/CustomerSchema');
const OrderItem = require('./../schemas/OrderItemsSchema');
const Status = require('./../schemas/StatusSchema');
const Restaurant = require('./../schemas/RestaurantSchema');
const MenuItem = require('./../schemas/MenuItemSchema');

// GET all placed orders
router.get('/', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        const menuItems = await MenuItem.find();
        const customers = await Customer.find();
        const placedOrders = await PlacedOrder.find()
            .populate('restaurant')
            .populate('customer')
            .populate('orderItems')
            .populate('orderStatus');
        const orderItems = await OrderItem.find()
            .populate('customer')
            .populate('menuItems');
        const statuses = await Status.find();

        res.render('placedorders', { title: 'Placed Orders', placedOrders, statuses, orderItems, customers, restaurants, menuItems });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST create a new placed order
router.post('/create', async (req, res, next) => {
    try {
        const { restaurant, customer, orderItems, orderStatus } = req.body;

        const selectedCustomer = await Customer.findById(customer);
        const deliveryAddress = selectedCustomer.address;

        const selectedOrderItems = await OrderItem.find({ _id: { $in: orderItems } })
            .populate('menuItems');

        const finalPrice = selectedOrderItems.reduce((sum, orderItems) => {
            return sum + orderItems.menuItems.reduce((itemSum, menuItem) => {
                return itemSum + menuItem.price;
            }, 0);
        }, 0);

        const newPlacedOrder = new PlacedOrder({
            restaurant,
            customer,
            orderItems,
            orderStatus,
            finalPrice,
            deliveryAddress,
        });

        await newPlacedOrder.save();
        res.redirect('/placedorders');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//POST update the order status
router.post('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        await PlacedOrder.findByIdAndUpdate(id, { orderStatus });

        res.redirect('/placedorders');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST delete a placed order
router.post('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await PlacedOrder.findByIdAndRemove(id);
        res.redirect('/placedorders');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;