const mongoose = require('mongoose');

const watchSensorDataSchema = new mongoose.Schema({
    ritmoCardiaco: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WatchSensorData', watchSensorDataSchema, 'watchSensorData');
