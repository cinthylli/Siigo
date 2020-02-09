const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

//Obtener Productos
router.get('/', async (req, res) => {
    const product = await Product.find();
    console.log(product);
    res.json(product);
});

//Obtener Producto por id
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.json({
        status: 'Product By Id'
    });
});


//Crear Producto
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.json({
        status: 'Product Created'
    });
})

//Actualizar Producto
router.put('/:id', async (req, res) => {
    await Product.findByIdAndUpdate( req.params.id,req.body);
    res.json({
        status: 'Product Updated'
     });
})

//Eliminar Producto
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Product Deleted'
    });
})

module.exports = router;