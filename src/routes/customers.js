const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

router.get('/', async(req, res) => {
    const customer = await Customer.find();
    res.json(customer);
    res.send('API customer is goes here')
});

router.post('/', async (req, res) => {
    
})

module.exports = router;