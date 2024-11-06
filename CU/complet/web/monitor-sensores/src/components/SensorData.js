import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos del sensor
  const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensores'); // Verifica que esta URL sea correcta
      console.log("Datos recibidos:", response.data); // Agrega este console.log para ver los datos
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      setLoading(false);
    }
  };
  
  // Llamamos a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Datos de Sensores</h2>
      <table>
        <thead>
          <tr>
            <th>Temperatura (°C)</th>
            <th>Humedad (%)</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dato) => (
            <tr key={dato._id}>
              <td>{dato.temperatura}</td>
              <td>{dato.humedad}</td>
              <td>{new Date(dato.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorData;
