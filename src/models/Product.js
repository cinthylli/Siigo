const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = new Schema({
    id: Number,
    tenant_id: Number,
    name: String,
    description: String,
    list_price: Number
});

module.exports = mongoose.model('Product', Product);