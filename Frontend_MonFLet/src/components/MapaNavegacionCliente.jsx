import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '900px',
};

const center = {
  lat: -38.73965,
  lng: -72.59842,
};

function MapaNavegacionCliente() {
  const [clientes, setClientes] = useState([]);
  const [clienteActivo, setClienteActivo] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCcF0vvhLLmuLAJcnh2ElM9aLcIwtiiwMo',
  });

  useEffect(() => {
    const clientesMock = [
      { id: 1, lat: -38.7385, lng: -72.5980, nombre: 'Cliente A', direccion: 'Av. Alemania 1234' },
      { id: 2, lat: -38.7358, lng: -72.5934, nombre: 'Cliente B', direccion: 'Calle Balmaceda 567' },
      { id: 3, lat: -38.7412, lng: -72.6021, nombre: 'Cliente C', direccion: 'Manuel Montt 890' },
    ];
    setClientes(clientesMock);
  }, []);

  const handleMouseOver = (cliente) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setClienteActivo(cliente);
  };

  const handleMouseOut = () => {
    const id = setTimeout(() => {
      setClienteActivo(null);
    }, 1000);
    setTimeoutId(id);
  };

  if (loadError) return <div>Error al cargar el mapa. Intenta de nuevo más tarde.</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="vehiculo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {clientes.map((cliente) => (
          <Marker
            key={cliente.id}
            position={{ lat: cliente.lat, lng: cliente.lng }}
            label={{ text: cliente.nombre, fontWeight: 'bold' }}
            icon={{
              url: '/icons/logo1_22.png', // Ruta relativa desde /public
              scaledSize: new window.google.maps.Size(40, 40),
              labelOrigin: new window.google.maps.Point(20, -10),
            }}
            onMouseOver={() => handleMouseOver(cliente)}
            onMouseOut={handleMouseOut}
          />
        ))}

        {clienteActivo && (
          <InfoWindow
            position={{ lat: clienteActivo.lat, lng: clienteActivo.lng }}
            onCloseClick={() => setClienteActivo(null)}
            options={{ disableAutoPan: true }}
          >
            <div className="info-window" role="dialog" aria-labelledby="cliente-info-title" aria-describedby="cliente-info-description">
              <h4 id="cliente-info-title" className="info-tittle">{clienteActivo.nombre}</h4>
              <p id="cliente-info-description" className="info-estado">Dirección: {clienteActivo.direccion}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapaNavegacionCliente;
