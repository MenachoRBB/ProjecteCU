import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [sensorData, setSensorData] = useState({
    temperatura: "--",
    humedad: "--",
    ultimaActualizacion: "--",
  });

  const [ppmData, setPpmData] = useState({
    ritmoCardiaco: "--",
    ultimaActualizacion: "--",
  });

  // Función para obtener el último dato de temperatura y humedad
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

  // Función para obtener el último dato de ritmo cardíaco
  const fetchLastPpmData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.100:5000/api/sensores/ritmo-cardiaco/ultimo"
      );
      if (response.data) {
        const { ritmoCardiaco, timestamp } = response.data;
        setPpmData({
          ritmoCardiaco: ritmoCardiaco || "--",
          ultimaActualizacion: timestamp
            ? new Date(timestamp).toLocaleString()
            : "--",
        });
      } else {
        setPpmData({
          ritmoCardiaco: "--",
          ultimaActualizacion: "--",
        });
      }
    } catch (error) {
      console.error("Error al obtener el último dato de ritmo cardíaco:", error);
      setPpmData({
        ritmoCardiaco: "--",
        ultimaActualizacion: "--",
      });
    }
  };

  // useEffect para actualizar los datos periódicamente
  useEffect(() => {
    fetchLastSensorData(); // Carga inicial de temperatura y humedad
    fetchLastPpmData(); // Carga inicial de ritmo cardíaco
    const interval = setInterval(() => {
      fetchLastSensorData();
      fetchLastPpmData();
    }, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

// Determina si hay alerta para cambiar el fondo
const isAlert = () => {
  const { temperatura, humedad } = sensorData;
  const { ritmoCardiaco } = ppmData;
  return temperatura > 40 || humedad > 60 || ritmoCardiaco > 170;
};


  return (
    <div className={`app ${isAlert() ? "alert" : ""}`}>
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
            <p><strong>PPM:</strong> {ppmData.ritmoCardiaco}</p>
            <p>
              <strong>Última Actualización:</strong> {ppmData.ultimaActualizacion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
