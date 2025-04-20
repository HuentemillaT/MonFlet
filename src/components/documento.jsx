import React, { useState, useRef } from 'react';

function Documentos() {
  const [documentosMerma, setDocumentosMerma] = useState([]);
  const [documentosFacturas, setDocumentosFacturas] = useState([]);
  const [documentosCerradas, setDocumentosCerradas] = useState([]);

  const [mensaje, setMensaje] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);

  // Referencias para limpiar el input file
  const inputMermaRef = useRef(null);
  const inputFacturasRef = useRef(null);
  const inputCerradasRef = useRef(null);

  const handleUpload = (e, tipo) => {
    const archivos = Array.from(e.target.files);
    const nuevosDocs = archivos.map((file) => ({
      nombre: file.name,
      url: URL.createObjectURL(file),
    }));

    if (tipo === 'merma') {
      setDocumentosMerma((prev) => [...prev, ...nuevosDocs]);
    } else if (tipo === 'facturas') {
      setDocumentosFacturas((prev) => [...prev, ...nuevosDocs]);
    } else if (tipo === 'cerradas') {
      setDocumentosCerradas((prev) => [...prev, ...nuevosDocs]);
    }
  };

  const handleEnviar = (tipo) => {
    if (tipo === 'merma') {
      setMensaje('Documentos de merma cargados correctamente');
      setDocumentosMerma([]);
      inputMermaRef.current.value = null;
    } else if (tipo === 'facturas') {
      setMensaje('Documentos de facturas cargados correctamente');
      setDocumentosFacturas([]);
      inputFacturasRef.current.value = null;
    } else if (tipo === 'cerradas') {
      setMensaje('Documentos de facturas cerradas cargados correctamente');
      setDocumentosCerradas([]);
      inputCerradasRef.current.value = null;
    }

    setMostrarToast(true);
    setTimeout(() => {
      setMostrarToast(false);
    }, 3000);
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/main
    <div className="fondo">
      {mostrarToast && (
        <div className="toast-flotante">
          {mensaje}
<<<<<<< HEAD
=======
=======
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
>>>>>>> origin/main
>>>>>>> origin/main
        </div>
      )}

      <div className="contenedores">
        {/* Contenedor Merma */}
        <div className="contenedor">
          <h3 className="text-lg font-semibold">Merma cliente</h3>
          <input
            type="file"
            multiple
            onChange={(e) => handleUpload(e, 'merma')}
            ref={inputMermaRef}
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
          <button
            onClick={() => handleEnviar('merma')}
            disabled={documentosMerma.length === 0}
            className={`mt-4 px-4 py-2 rounded text-white ${
              documentosMerma.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Enviar
          </button>
        </div>

        {/* Contenedor Facturas */}
        <div className="contenedor">
          <h3 className="text-lg font-semibold">Facturas con diferencia</h3>
          <input
            type="file"
            multiple
            onChange={(e) => handleUpload(e, 'facturas')}
            ref={inputFacturasRef}
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
          <button
            onClick={() => handleEnviar('facturas')}
            disabled={documentosFacturas.length === 0}
            className={`mt-4 px-4 py-2 rounded text-white ${
              documentosFacturas.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Enviar
          </button>
        </div>

        {/* Contenedor Cerradas */}
        <div className="contenedor">
          <h3 className="text-lg font-semibold">Facturas cerradas</h3>
          <input
            type="file"
            multiple
            onChange={(e) => handleUpload(e, 'cerradas')}
            ref={inputCerradasRef}
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
          <button
            onClick={() => handleEnviar('cerradas')}
            disabled={documentosCerradas.length === 0}
            className={`mt-4 px-4 py-2 rounded text-white ${
              documentosCerradas.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Documentos;
