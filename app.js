const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/proyecto-camping');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'))
db.once('open', () => {
    console.log("Base de datos conectada!")
})

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
    res.render('home')
});


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})