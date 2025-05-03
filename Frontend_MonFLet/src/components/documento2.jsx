import React, { useState, useEffect } from 'react';

function Documento2() {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    // Recuperar documentos guardados en el localStorage
    const documentosGuardadosMerma = JSON.parse(localStorage.getItem('documentosMerma')) || [];
    const documentosGuardadosFacturas = JSON.parse(localStorage.getItem('documentosFacturas')) || [];
    const documentosGuardadosCerradas = JSON.parse(localStorage.getItem('documentosCerradas')) || [];

    // Unir todos los documentos en un solo arreglo
    const todosLosDocumentos = [
      ...documentosGuardadosMerma,
      ...documentosGuardadosFacturas,
      ...documentosGuardadosCerradas
    ];

    setArchivos(todosLosDocumentos);
  }, []);

  const handleDescargar = (url, nombre) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="archivos-container">
      <h2>Archivos Subidos</h2>
      <div className="archivos-lista">
        {archivos.length > 0 ? (
          archivos.map((archivo, index) => (
            <div key={index} className="archivo-card">
              <h4>{archivo.nombre}</h4>
              <div className="acciones">
                <button
                  className="btn-ver"
                  onClick={() => window.open(archivo.url, '_blank')}
                >
                  Ver
                </button>
                <button
                  className="btn-descargar"
                  onClick={() => handleDescargar(archivo.url, archivo.nombre)}
                >
                  Descargar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay archivos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Documento2;
