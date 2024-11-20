import React, { useEffect, useState } from "react";
import axios from "axios";

const SensorCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensores");
        const lastEntry = response.data[response.data.length - 1]; // Obtener el último dato
        setData(lastEntry);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Cargando datos...</div>;
  }

  if (!data) {
    return <div className="text-center mt-10 text-xl">No hay datos disponibles.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Últimos Datos</h2>
        <div className="text-center">
          <p className="text-lg text-gray-600">
            <span className="font-bold">Temperatura:</span> {data.temperatura}°C
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <span className="font-bold">Humedad:</span> {data.humedad}%
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <span className="font-bold">Última Actualización:</span> {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
