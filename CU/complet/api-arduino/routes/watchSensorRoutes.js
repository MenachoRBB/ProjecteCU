const express = require('express');
const router = express.Router();
const WatchSensorData = require('../models/watchSensorData');

// Ruta para recibir datos de ritmo cardiaco
router.post('/api/sensores/ritmo-cardiaco', async (req, res) => {
  try {
    const ritmoCardiaco = req.body;
    const newData = new WatchSensorData(ritmoCardiaco);
    await newData.save();
    res.status(201).send("Datos guardados correctamente");
  } catch (error) {
    console.error("Error al guardar los datos", error);
    res.status(500).send("Error al guardar los datos");
  }
});

// Ruta para obtener todos los datos de ritmo cardiaco
router.get('/api/sensores/ritmo-cardiaco', async (req, res) => {
  try {
    const data = await WatchSensorData.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener los datos", error);
    res.status(500).send("Error al obtener los datos");
  }
});

module.exports = router;