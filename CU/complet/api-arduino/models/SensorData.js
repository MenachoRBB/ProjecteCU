const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  temperatura: { type: Number, required: true },
  humedad: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
