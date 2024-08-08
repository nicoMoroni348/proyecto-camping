const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campingSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    precio: String,
    descripcion: String,
    ubicacion: String
})

module.exports = mongoose.model('Campamento', campingSchema);