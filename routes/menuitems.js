const express = require('express');
const router = express.Router();
const MenuItem = require('./../schemas/MenuItemSchema');
const Category = require('./../schemas/CategorySchema');

router.get('/', async function (req, res, next) {
    try {
        const menuItems = await MenuItem.find().populate('category');
        const categories = await Category.find();
        res.render('menuitems', { title: 'Menu Items', items: menuItems, categories });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        const { name, description, price, categoryId } = req.body;
        const newMenuItem = new MenuItem({ name, description, price, category: categoryId });
        await newMenuItem.save();
        res.redirect('/menuitems');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/delete', async function (req, res, next) {
    try {
        const { itemId } = req.body;
        await MenuItem.findByIdAndRemove(itemId);
        res.redirect('/menuitems');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;