const mongoose = require('mongoose');

// Esquema definido en el RA3
const taskSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    descripcion: {
        type: String,
        required: false
    },
    tecnologia: { 
        type: String, 
        enum: ['Java', 'JS', 'Python', 'PHP', 'Otro'], // Un extra de validación
        default: 'JS'
    },
    estado: { 
        type: String, 
        enum: ['pending', 'done'],
        default: 'pending'
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Task', taskSchema);