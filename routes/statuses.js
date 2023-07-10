const express = require('express');
const router = express.Router();
const Status = require('./../schemas/StatusSchema');

// GET all status catalogs
router.get('/', async (req, res, next) => {
    try {
        const statuses = await Status.find();
        res.render('statuses', { title: 'Order Statuses', statuses: statuses });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST add new status catalog
router.post('/add', async (req, res, next) => {
    try {
        const { name } = req.body;
        const newStatus = new Status({ name });
        await newStatus.save();
        res.redirect('/statuses');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST delete status catalog
router.post('/delete', async (req, res, next) => {
    try {
        const { statusCatalogId } = req.body;
        await Status.findByIdAndRemove(statusId);
        res.redirect('/statuses');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;