// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/arduinoDB')
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB", error));

// Importar rutas
const sensorRoutes = require('./routes/sensorRoutes');

// Usar las rutas en la aplicación
app.use(sensorRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
