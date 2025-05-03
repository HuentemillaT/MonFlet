import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // Importa solo las rutas

// Componentes
import MenuNavegacion from './components/MenuNavegacion';
import MapaNavegacionCliente from './components/MapaNavegacionCliente';
import Inicio from './components/Inicio';
import Vehiculos from './components/Vehiculos'; 
import Vehiculos2 from './components/vehiculos2';
import Doc from './components/documento';
import Doc2 from './components/documento2';
import Perfil from './components/Perfil';
import Login from './components/login';
import Registro from './components/registro';
import Logout from './components/logout'; 
import MantencionVehiculos from './components/mantencion';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail('');
    window.location.href = '/dashboard/inicio';
  };

  return (
    <>
      <MenuNavegacion isAuthenticated={isAuthenticated} handleLogout={handleLogout} userEmail={userEmail} />
      <Routes>
        <Route path="/dashboard/inicio" element={<Inicio />} />
        <Route path="/dashboard/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />
        <Route path="/dashboard/registro" element={<Registro setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/dashboard/login" />} />
        <Route path="/dashboard/mantencion" element={isAuthenticated ? <MantencionVehiculos /> : <Navigate to="/dashboard/login" />} />
        
        {/* Rutas para MapaNavegacionCliente */}
        <Route path="/dashboard/mapa" element={isAuthenticated && (userEmail?.toLowerCase().includes('conductorav.cl') || userEmail?.toLowerCase().includes('adminlog.cl')) ? <MapaNavegacionCliente /> : <Navigate to="/dashboard/login" />} />
        
        {/* Rutas para Vehiculos */}
        <Route path="/dashboard/vehiculos" element={isAuthenticated ? (userEmail?.toLowerCase().includes('adminlog.cl') ? <Vehiculos /> : <Navigate to="/dashboard/inicio" />) : <Navigate to="/dashboard/login" />} />
        <Route path="/dashboard/vehiculos2" element={isAuthenticated ? (userEmail?.toLowerCase().includes('conductord.cl') ? <Vehiculos2 /> : <Navigate to="/dashboard/inicio" />) : <Navigate to="/dashboard/login" />} />
        
        {/* Rutas para Documentos */}
        <Route path="/dashboard/documento2" element={userEmail ? (userEmail.includes('adminlog.cl') ? <Doc2 /> : <Navigate to="/dashboard/inicio" />) : <Navigate to="/dashboard/login" />} />
        <Route path="/dashboard/documento" element={userEmail ? (userEmail.includes('conductord.cl') || userEmail.includes('conductorav.cl') ? <Doc /> : <Navigate to="/dashboard/inicio" />) : <Navigate to="/dashboard/login" />} />
        
        {/* Ruta de Logout */}
        <Route path="/dashboard/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
