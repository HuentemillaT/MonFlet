import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow , useJsApiLoader} from '@react-google-maps/api';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoActivo, setVehiculoActivo] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCcF0vvhLLmuLAJcnh2ElM9aLcIwtiiwMo',
  });

  useEffect(() => {
    const vehiculosEnTiempoReal = [
      { id: 1, lat: -38.73965, lng: -72.58948, nombre: 'Patente 1', conductor:'Alfonso Martinez', estado: 'En ruta'},
      { id: 2, lat: -38.73559, lng: -72.59386, nombre: 'Patente 2' , conductor:'Josefa Alvarez', estado:'En mantención'},
      { id: 3, lat: -38.7388, lng: -72.5995, nombre: 'Patente 3', conductor:'Emilio Aravena' , estado:'Disponible'},
      { id: 3, lat: -38.73285, lng: -72.61691, nombre: 'Patente 4', conductor:'Jose Soto' , estado:'Disponible'},
    ];
    setVehiculos(vehiculosEnTiempoReal);
  }, []);
  const handleMouseOver = (vehiculo) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Cancela el cierre si el mouse vuelve rápidamente
      setTimeoutId(null);
    }
    setVehiculoActivo(vehiculo);
  };

  const handleMouseOut = () => {
    const id = setTimeout(() => {
      setVehiculoActivo(null);
    }, 1000); // Mostrar 1 segundo extra
    setTimeoutId(id);
  };

  //css container Maps
  const containerStyle = {
    width: '100%',
    height: '900px',
  };
  
  const center = {
    lat: -38.73965, // Ejemplo: Centrado en Temuco
    lng: -72.59842,
  };
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className='vehiculo'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} >
        {vehiculos.map((vehiculo) => (
          <Marker
            key={vehiculo.id}
            position={{ lat: vehiculo.lat, lng: vehiculo.lng }}
            label={{text:vehiculo.nombre,fontWeight: 'bold',}}
            icon={{
              url: '/icons/vehiculo1.png', // Ruta relativa desde /public
              scaledSize: new window.google.maps.Size(40, 40), // Ajusta el tamaño del ícono
              labelOrigin: new window.google.maps.Point(20, -10), // 👈 Este valor sube el texto
            }}
            onMouseOver={() => handleMouseOver(vehiculo)}
            onMouseOut={handleMouseOut}
          />
        ))}
        {vehiculoActivo && (
          <InfoWindow position={{ lat: vehiculoActivo.lat, lng: vehiculoActivo.lng }} onCloseClick={() => setVehiculoActivo(null)}
          options={{ disableAutoPan: true }}
          >
            <div className='info-window'>
              <h4 className='info-tittle'>{vehiculoActivo.nombre}</h4>
              <p className='info-estado'>Conductor: {vehiculoActivo.conductor}</p>
              <p className='info-estado'>Estado: {vehiculoActivo.estado}</p>
              {/* Aquí puedes agregar más información */}
            </div>
          </InfoWindow>
          
        )}
      </GoogleMap>
    </div>
  );
};

export default Vehiculos;
