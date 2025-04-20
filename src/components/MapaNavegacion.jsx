import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '900px',
  };
  
  const center = {
    lat: -38.73965, // Ejemplo: Temuco
    lng: -72.59842,
  };
  
  function MapaNavegacion() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyCcF0vvhLLmuLAJcnh2ElM9aLcIwtiiwMo', // 🔑 pega aquí tu clave
    });
  
    if (!isLoaded) return <div>Cargando mapa...</div>;
  
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Aquí puedes agregar marcadores o rutas si quieres */}
      </GoogleMap>
    );
  }
export default MapaNavegacion;
