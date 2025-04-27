import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const MapaRuta = () => {
  const [directions, setDirections] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState('');  // Estado para el tiempo estimado
  const [origin] = useState({ lat: -38.73965, lng: -72.58948 });  // Punto de origen
  const [destination] = useState({ lat: -38.73559, lng: -72.59386 });  // Punto de destino

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCcF0vvhLLmuLAJcnh2ElM9aLcIwtiiwMo',
  });

  const [center] = useState({
    lat: (origin.lat + destination.lat) / 2,  // Centro entre origen y destino
    lng: (origin.lng + destination.lng) / 2,
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      // Solicitar dirección entre el origen y el destino
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            
            // Extraer el tiempo estimado de la respuesta
            const duration = result.routes[0].legs[0].duration.text;
            setEstimatedTime(duration);  // Actualizar el tiempo estimado
          } else {
            console.error('Error al obtener la dirección: ', result);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Estilos del mapa
  const containerStyle = {
    width: '100%',
    height: '830px',
  };  

  return (
    <div className="mapa-ruta">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* Mostrar la ruta si la tenemos */}
        {directions && <DirectionsRenderer directions={directions} />}
        
        {/* Cuadro flotante para el tiempo estimado */}
        <div className="cuadro-flotante">
          <span>Tiempo estimado: {estimatedTime}</span>
        </div>
      </GoogleMap>
    </div>
  );
};

export default MapaRuta;
