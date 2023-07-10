const express = require('express');
const router = express.Router();
const Restaurant = require('./../schemas/RestaurantSchema');

// GET all restaurants
router.get('/', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.render('restaurants', { title: 'Restaurants', restaurants });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST create a new restaurant
router.post('/create', async (req, res, next) => {
    try {
        const { name, address } = req.body;
        const newRestaurant = new Restaurant({ name, address });
        await newRestaurant.save();
        res.redirect('/restaurants');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST delete a restaurant
router.post('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Restaurant.findByIdAndRemove(id);
        res.redirect('/restaurants');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;