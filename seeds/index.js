const mongoose = require('mongoose');
const Camping = require('../models/camping')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/proyecto-camping');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
    console.log("Base de datos conectada!")
});

const getRndElement = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Camping.deleteMany({});

    // Creación de 50 campings
    for (let i = 0; i < 50; i++) {
        const rndCiudad = Math.floor(Math.random() * 1000); // Random entre 0 y 999
    
        const camp = new Camping({
            titulo: `${getRndElement(places)} ${getRndElement(descriptors)}`,
            ubicacion: `${cities[rndCiudad].city}, ${cities[rndCiudad].state}`
        })
        await camp.save()
    }
    console.log('Datos creados!')
};

seedDB().then(() => {
    mongoose.connection.close();
})