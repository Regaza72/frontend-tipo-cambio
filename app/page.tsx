import Image from "next/image";
"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  // page.tsx
const [tipoCambio, setTipoCambio] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Llamada al backend para obtener el tipo de cambio
  useEffect(() => {
    const fetchTipoCambio = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/obtener-tipo-cambio');
        const data = await response.json();
        setTipoCambio(data.tipoCambio);
        setLastUpdated(data.fechaSolicitud);
      } catch (error) {
        console.error("Error fetching tipo de cambio:", error);
      }
    };

    fetchTipoCambio();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Tipo de Cambio Actual</h2>
      {tipoCambio !== null ? (
        <div className="mb-4">
          <p className="text-3xl font-bold text-green-600">{tipoCambio} GTQ</p>
          <p className="text-gray-500">Última actualización: {lastUpdated}</p>
        </div>
      ) : (
        <p className="text-gray-500">Cargando tipo de cambio...</p>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Actualizar
      </button>
    </div>
  );
}


