const express = require('express');
const router = express.Router();
const Customer = require('./../schemas/CustomerSchema');

// GET all customers
router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.render('customers', { title: 'Customers', customers });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST add new customer
router.post('/add', async (req, res, next) => {
    try {
        const { name, address, email } = req.body;
        const newCustomer = new Customer({ name, address, email });
        await newCustomer.save();
        res.redirect('/customers');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST delete customer
router.post('/delete', async (req, res, next) => {
    try {
        const { customerId } = req.body;
        await Customer.findByIdAndRemove(customerId);
        res.redirect('/customers');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;