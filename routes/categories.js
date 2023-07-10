const express = require('express');
const router = express.Router();
const Category = require('./../schemas/CategorySchema');

router.get('/', async function (req, res, next) {
    try {
        const dbItems = await Category.find();
        res.render('categories', {title: 'Categories', items: dbItems });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        const {categoryName} = req.body;
        const newCategory = new Category({categoryName});
        await newCategory.save();
        res.redirect('/categories');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/delete', async function (req, res, next) {
    try {
        const { categoryId } = req.body;
        await Category.findByIdAndRemove(categoryId);
        res.redirect('/categories');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;