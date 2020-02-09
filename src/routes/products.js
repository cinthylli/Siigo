const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const product = await Product.find();
    res.json(product);
    console.log(product);
});

module.exports = router;