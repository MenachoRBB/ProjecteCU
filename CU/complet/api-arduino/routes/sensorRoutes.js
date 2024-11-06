const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Ruta para recibir datos de temperatura y humedad
router.post('/api/sensores', async (req, res) => {
  try {
    const { temperatura, humedad } = req.body;
    const newData = new SensorData({ temperatura, humedad });
    await newData.save();
    res.status(201).send("Datos guardados correctamente");
  } catch (error) {
    console.error("Error al guardar los datos", error);
    res.status(500).send("Error al guardar los datos");
  }
});

// Ruta para obtener todos los datos de sensores
router.get('/api/sensores', async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener los datos", error);
    res.status(500).send("Error al obtener los datos");
  }
});

module.exports = router;
