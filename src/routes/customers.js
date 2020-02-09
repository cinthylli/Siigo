const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

//Obtener Cliente
router.get('/', async(req, res) => {
    const customer = await Customer.find();
    res.json(customer);
});

//Crear Cliente
router.post('/', async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    console.log(customer);
    res.json({
        status: 'Customer Created'
    });
})

//Actualizar tarea
router.put('/:id', async (req, res) => {
    await Customer.findByIdAndUpdate( req.params.id, req.body);
    res.json({
        status: 'Customer Updated'
    });
})

router.delete('/:id', async (req, res) => {
    await Customer.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Customer Deleted'
    });
})

module.exports = router;