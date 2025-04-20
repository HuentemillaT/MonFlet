import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuNavegacion from './components/MenuNavegacion';
import MapaNavegacion from './components/MapaNavegacion';
import Inicio from './components/Inicio';
import Vehiculos from './components/Vehiculos';
import Doc from './components/documento';
import Perfil from './components/Perfil';
import Login from './components/login';
import Registro from './components/registro';


function App() {
    // Estado para manejar la autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar el estado de autenticación al cargar la aplicación
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
  
    // Función para hacer logout
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    };
  return (
    <div>
      <Router>
        <MenuNavegacion isAuthenticated={isAuthenticated} handleLogout={handleLogout} /> {/*Menú visible en todas las rutas */}
        <Routes>
          <Route path="/dashboard/mapa" element={<MapaNavegacion />} />
          <Route path="/dashboard/vehiculos" element={<Vehiculos />} />
          <Route path="/dashboard/documento" element={<Doc />} />
          <Route path="/dashboard/perfil" element={<Perfil />} />
          <Route path="/dashboard/inicio" element={<Inicio />} />
          <Route path="/dashboard/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard/registro" element={<Registro setIsAuthenticated={setIsAuthenticated} />} />
         
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;