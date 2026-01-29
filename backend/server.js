require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./Task'); // Importamos el modelo

const app = express();

// Middlewares
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // Permite leer JSONs entrantes

// Conexión a MongoDB (RA3.c)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
    .catch(err => console.error('🔴 Error conectando a Mongo:', err));

// --- API REST (RA2) ---

// GET /api/tasks: Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ fecha: -1 }); // Ordenadas por fecha
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// POST /api/tasks: Crear tarea
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar tarea' });
    }
});

// DELETE /api/tasks/:id: Borrar tarea
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});

// PUT /api/tasks/:id: Actualizar tarea (para marcarla como completada)
app.put('/api/tasks/:id', async (req, res) => {
    try {
        // Buscamos la tarea por ID y actualizamos lo que nos llegue (ej: estado)
        // { new: true } hace que nos devuelva la tarea ya cambiada
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});