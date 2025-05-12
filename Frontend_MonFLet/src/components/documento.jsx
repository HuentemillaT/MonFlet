import React, { useState, useRef, useEffect } from 'react';
import { subirDocumento } from '../services/userService';

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

  useEffect(() => {
    // Recuperar documentos previos desde el almacenamiento local
    const documentosGuardadosMerma = JSON.parse(localStorage.getItem('documentosMerma')) || [];
    const documentosGuardadosFacturas = JSON.parse(localStorage.getItem('documentosFacturas')) || [];
    const documentosGuardadosCerradas = JSON.parse(localStorage.getItem('documentosCerradas')) || [];

    setDocumentosMerma(documentosGuardadosMerma);
    setDocumentosFacturas(documentosGuardadosFacturas);
    setDocumentosCerradas(documentosGuardadosCerradas);
  }, []);

  useEffect(() => {
    // Guardar documentos en el almacenamiento local cada vez que cambien
    localStorage.setItem('documentosMerma', JSON.stringify(documentosMerma));
    localStorage.setItem('documentosFacturas', JSON.stringify(documentosFacturas));
    localStorage.setItem('documentosCerradas', JSON.stringify(documentosCerradas));
  }, [documentosMerma, documentosFacturas, documentosCerradas]);

  const handleEnviar = async (tipo) => {
    const token = localStorage.getItem('authToken');
  
    let documentos = [];
    let setDocumentos;
    let inputRef;
  
    if (tipo === 'merma') {
      documentos = documentosMerma;
      setDocumentos = setDocumentosMerma;
      inputRef = inputMermaRef;
    } else if (tipo === 'facturas') {
      documentos = documentosFacturas;
      setDocumentos = setDocumentosFacturas;
      inputRef = inputFacturasRef;
    } else if (tipo === 'cerradas') {
      documentos = documentosCerradas;
      setDocumentos = setDocumentosCerradas;
      inputRef = inputCerradasRef;
    }

    try {
      // Subir cada documento
      for (const doc of documentos) {
        const formData = new FormData();
        formData.append('archivo', doc.file);  // Usamos el archivo real
        formData.append('tipo', tipo);
        console.log('Subiendo archivo:', formData);  // Asegúrate de ver el archivo que estás enviando

        await subirDocumento(formData, token); // Uso del servicio centralizado
      }
  
      setMensaje(`Documentos de ${tipo} cargados correctamente`);
      setDocumentos([]);
      if (inputRef.current) inputRef.current.value = null;
    } catch (error) {
      setMensaje('Error al subir documentos: ' + (error.response?.data?.message || error.message));
    }
  
    setMostrarToast(true);
    setTimeout(() => {
      setMostrarToast(false);
    }, 3000);
  };

  const handleUpload = (event, tipo) => {
    const archivos = Array.from(event.target.files);
    const nuevosDocs = archivos.map((file) => ({
      nombre: file.name,
      url: URL.createObjectURL(file),
      file,  // Guardamos el archivo real
    }));
    
  
    if (tipo === 'merma') {
      setDocumentosMerma([...documentosMerma, ...nuevosDocs]);
    } else if (tipo === 'facturas') {
      setDocumentosFacturas([...documentosFacturas, ...nuevosDocs]);
    } else if (tipo === 'cerradas') {
      setDocumentosCerradas([...documentosCerradas, ...nuevosDocs]);
    }
  };
  
  return (
    <div className="fondo">
      {mostrarToast && (
        <div className="toast-flotante">
          {mensaje}
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
