const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/siigo-db' , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

// Configuraciones
//Configuracion del puerto del servidor
app.set('port', process.env.PORT || 3000);

//MIddlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/customer', require('./routes/customers'));
app.use('/product', require('./routes/products'));

//Archivos estaticos
app.use(express.static(__dirname + '/public'));


// Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
});