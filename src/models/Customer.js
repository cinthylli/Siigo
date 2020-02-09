const mongoose = require('mongoose');
const { Schema } = mongoose;

const Customer = new Schema({
    id: Number,
    tenant_id: Number,
    first_name: String,
    last_name: String
});


module.exports = mongoose.model('Customer', Customer);