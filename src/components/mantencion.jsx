import React, { useState, useEffect } from 'react';

// Función simulada para obtener los datos de próximas mantenciones (puedes reemplazarla con una API real)
const fetchProximasMantenciones = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulando un posible error en la API
      const isError = false;  // Cambiar a true para simular un error
      if (isError) {
        reject('Error al cargar las mantenciones');
      } else {
        resolve([
          { id: 1, vehiculo: "Patente 1", conductor: "Alonso Hernandez", fecha: "2025-05-15", tipo: "Cambio de aceite", kilometraje: 12000 },
          { id: 2, vehiculo: "Patente 2", conductor: "Monica Zuñiga", fecha: "2025-06-01", tipo: "Revisión de frenos", kilometraje: 15000 },
          { id: 3, vehiculo: "Patente 3", conductor: "Gustavo Seguel", fecha: "2025-07-10", tipo: "Reemplazo de bujías", kilometraje: 18000 },
          { id: 4, vehiculo: "Patente 4", conductor: "Patricio Ortega", fecha: "2025-08-30", tipo: "Balanceo y alineación de ruedas", kilometraje: 8000 },
        ]);
      }
    }, 200); // Simula un retraso 
  });
};

const ProximasMantenciones = () => {
  const [mantenciones, setMantenciones] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const obtenerMantenciones = async () => {
      try {
        const data = await fetchProximasMantenciones();
        setMantenciones(data);
      } catch (err) {
        setError(err); // Manejo del error
      } finally {
        setLoading(false); // Termina el proceso de carga
      }
    };

    obtenerMantenciones();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options); // Formatear la fecha de manera más legible
  };

  return (
    <div className="proximas-mantenciones">
      <h2>Próximas Mantenciones de Vehículos</h2>
      {loading ? (
        <div className="loading-spinner">Cargando...</div> // Indicador de carga
      ) : error ? (
        <div className="error-message">{error}</div> // Mensaje de error
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Conductor</th>
              <th>Fecha</th>
              <th>Tipo de Mantención</th>
              <th>Kilometraje</th>
            </tr>
          </thead>
          <tbody>
            {mantenciones.map((mantencion) => (
              <tr key={mantencion.id}>
                <td>{mantencion.vehiculo}</td>
                <td>{mantencion.conductor}</td>
                <td>{formatDate(mantencion.fecha)}</td> {/* Fecha formateada */}
                <td>{mantencion.tipo}</td>
                <td>{mantencion.kilometraje} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProximasMantenciones;
