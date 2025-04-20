import React, { useState } from 'react';

function Documentos() {
  // Estados separados para cada contenedor
  const [documentosMerma, setDocumentosMerma] = useState([]);
  const [documentosFacturas, setDocumentosFacturas] = useState([]);
  const [documentosCerradas, setDocumentosCerradas] = useState([]);

  // Maneja el cambio de archivos para cada contenedor
  const handleUpload = (e, tipo) => {
    const archivos = Array.from(e.target.files);

    const nuevosDocs = archivos.map((file) => ({
      nombre: file.name,
      url: URL.createObjectURL(file), // para descargar
    }));

    // Actualiza el estado según el tipo de contenedor
    if (tipo === 'merma') {
      setDocumentosMerma((prev) => [...prev, ...nuevosDocs]);
    } else if (tipo === 'facturas') {
      setDocumentosFacturas((prev) => [...prev, ...nuevosDocs]);
    } else if (tipo === 'cerradas') {
      setDocumentosCerradas((prev) => [...prev, ...nuevosDocs]);
    }
  };

  return (
    <div className='fondo'> 
      <div className="contenedores">
      {/* Contenedor 1 */}
      <div className="contenedor">
        <h3 className="text-lg font-semibold">Merma cliente</h3>
        <input
          type="file"
          multiple
          onChange={(e) => handleUpload(e, 'merma')}
          className="border p-2"
        />
        <div>
          <h4>Documentos cargados:</h4>
          <ul>
            {documentosMerma.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} download={doc.nombre}>
                  {doc.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contenedor 2 */}
      <div className="contenedor flex-1 bg-white rounded shadow p-4 text-center">
        <h3 className="text-lg font-semibold">Facturas con diferencia</h3>
        <input
          type="file"
          multiple
          onChange={(e) => handleUpload(e, 'facturas')}
          className="border p-2"
        />
        <div>
          <h4>Documentos cargados:</h4>
          <ul>
            {documentosFacturas.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} download={doc.nombre}>
                  {doc.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contenedor 3 */}
      <div className="contenedor flex-1 bg-white rounded shadow p-4 text-center">
        <h3 className="text-lg font-semibold">Facturas cerradas</h3>
        <input
          type="file"
          multiple
          onChange={(e) => handleUpload(e, 'cerradas')}
          className="border p-2"
        />
        <div>
          <h4>Documentos cargados:</h4>
          <ul>
            {documentosCerradas.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} download={doc.nombre}>
                  {doc.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  
  );
}

export default Documentos;
