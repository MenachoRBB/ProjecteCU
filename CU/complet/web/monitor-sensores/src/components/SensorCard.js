import React, { useEffect, useState } from "react";
import axios from "axios";

const SensorCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestData = async () => {
    try {
      // Añadir un parámetro único para evitar caché
      const response = await axios.get(`http://localhost:5000/api/sensores?timestamp=${new Date().getTime()}`);
      const lastEntry = response.data[response.data.length - 1]; // Obtener el último dato
      setData(lastEntry);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Obtener los datos al montar el componente
    fetchLatestData();

    // Configurar el intervalo para solicitar datos cada 30 segundos
    const interval = setInterval(() => {
      fetchLatestData();
    }, 30000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl text-gray-500">Cargando datos...</div>;
  }

  if (!data) {
    return <div className="text-center mt-10 text-xl text-red-500">No hay datos disponibles.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <h1 className="text-4xl font-extrabold text-white shadow-lg mb-10">Monitor de Salud</h1>
      <div
        className={`${
          data.temperatura > 40 || data.humedad > 80 ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-indigo-500"
        } shadow-lg rounded-lg p-8 w-96`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">Últimos Datos</h2>
        <div className="text-center">
          <p className={`text-xl ${data.temperatura > 40 ? "text-yellow-300" : "text-white"}`}>
            <span className="font-bold">Temperatura:</span> {data.temperatura}°C
          </p>
          <p className={`text-xl mt-4 ${data.humedad > 80 ? "text-yellow-300" : "text-white"}`}>
            <span className="font-bold">Humedad:</span> {data.humedad}%
          </p>
          <p className="text-sm text-gray-300 mt-6">
            <span className="font-bold">Última Actualización:</span> {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
