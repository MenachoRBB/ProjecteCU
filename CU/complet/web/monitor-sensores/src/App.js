import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [sensorData, setSensorData] = useState({
    temperatura: "--",
    humedad: "--",
    ultimaActualizacion: "--",
  });

  const fetchLastSensorData = async () => {
    try {
      const response = await axios.get("http://192.168.0.100:5000/api/sensores/ultimos");
      if (response.data) {
        const { temperatura, humedad, timestamp } = response.data;
        setSensorData({
          temperatura: temperatura || "--",
          humedad: humedad || "--",
          ultimaActualizacion: timestamp
            ? new Date(timestamp).toLocaleString()
            : "--",
        });
      } else {
        setSensorData({
          temperatura: "--",
          humedad: "--",
          ultimaActualizacion: "--",
        });
      }
    } catch (error) {
      console.error("Error al obtener el último dato del sensor:", error);
      setSensorData({
        temperatura: "--",
        humedad: "--",
        ultimaActualizacion: "--",
      });
    }
  };

  useEffect(() => {
    fetchLastSensorData(); // Carga inicial
    const interval = setInterval(fetchLastSensorData, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Sensor de Salud</h1>
        <div className="cards">
          {/* Card de Últimos Datos */}
          <div className="card">
            <h2 className="card-title">Últimos Datos</h2>
            <p><strong>Temperatura:</strong> {sensorData.temperatura}°C</p>
            <p><strong>Humedad:</strong> {sensorData.humedad}%</p>
            <p>
              <strong>Última Actualización:</strong> {sensorData.ultimaActualizacion}
            </p>
          </div>
          {/* Card de PPM */}
          <div className="card">
            <h2 className="card-title">Datos de PPM</h2>
            <p><strong>PPM:</strong> --</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
