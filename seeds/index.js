const mongoose = require('mongoose');
const Campamento = require('../models/camping')
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
    await Campamento.deleteMany({});

    // Creación de 50 campings
    for (let i = 0; i < 50; i++) {
        const rndCiudad = Math.floor(Math.random() * 1000); // Random entre 0 y 999

        const camp = new Campamento({
            titulo: `${getRndElement(places)} ${getRndElement(descriptors)}`,
            ubicacion: `${cities[rndCiudad].city}, ${cities[rndCiudad].state}`,
            imagen: `https://picsum.photos/400?random=${Math.random()}`,
            descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, culpa tempora quo explicabo itaque quia neque voluptas dolorem quibusdam, aperiam maiores provident repellat. Fugit accusantium commodi ratione dolores ut saepe.',
            precio: Math.floor(Math.random() * 20) + 10
        })
        await camp.save()
    }
    console.log('Datos creados!')
};

seedDB().then(() => {
    mongoose.connection.close();
})