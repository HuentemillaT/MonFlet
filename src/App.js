import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuNavegacion from './components/MenuNavegacion';
import MapaNavegacionCliente from './components/MapaNavegacionCliente';
import Inicio from './components/Inicio';
import Vehiculos from './components/Vehiculos';
import Doc from './components/documento';
import Perfil from './components/Perfil';
import Login from './components/login';
import Registro from './components/registro';
import Logout from './components/logout'; 
import MantencionVehiculos from './components/mantencion'; 

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('usuarioRegistrado');
    setIsAuthenticated(false);

    window.location.href = '/dashboard/inicio';  //redirige a la pantalla inicio
  };

  return (
    <Router>
      <MenuNavegacion isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/dashboard/mantencion" element={<MantencionVehiculos />} />
        <Route path="/dashboard/mapa" element={<MapaNavegacionCliente setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/dashboard/vehiculos" element={<Vehiculos setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/dashboard/documento" element={<Doc />} />
        <Route path="/dashboard/perfil" element={<Perfil />} />
        <Route path="/dashboard/inicio" element={<Inicio />} />
        <Route path="/dashboard/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard/registro" element={<Registro setIsAuthenticated={setIsAuthenticated} />} /> 
        <Route path="/dashboard/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
