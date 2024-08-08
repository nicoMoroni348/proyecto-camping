const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campamento = require('./models/camping')

mongoose.connect('mongodb://127.0.0.1:27017/proyecto-camping');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'))
db.once('open', () => {
    console.log("Base de datos conectada!")
})

const app = express();
const port = 3000;

// METHOD OVERRIDE
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

// Prevent Views error
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Implement static files (bootstrap files)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON from a Form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campamentos', async (req, res) => {
    const campamentos = await Campamento.find({});
    res.render('campamentos/index', { campamentos })
});

app.get('/campamentos/new', (req, res) => {
    res.render('campamentos/new')
});

app.post('/campamentos', async (req, res) => {
    const campamento = new Campamento(req.body.campamento);
    await campamento.save();
    res.redirect(`/campamentos/${campamento._id}`)
});

app.get('/campamentos/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campamento = await Campamento.findById(id);
    res.render('campamentos/edit', { campamento })
});

app.put('/campamentos/:id', async (req, res) => {
    const { id } = req.params;
    const campamento = await Campamento.findByIdAndUpdate(id, { ...req.body.campamento }); 
    // usando el spread operator para no perder los datos que no se estan modificando en el body
    res.redirect(`/campamentos/${campamento._id}`)
});

app.get('/campamentos/:id', async (req, res) => {
    const { id } = req.params;
    const campamento = await Campamento.findById(id);
    res.render('campamentos/show', { campamento })
});

app.delete('/campamentos/:id', async (req, res) => {
    const { id } = req.params;
    await Campamento.findByIdAndDelete(id);
    res.redirect('/campamentos')
});


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})