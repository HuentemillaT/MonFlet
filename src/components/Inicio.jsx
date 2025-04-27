import React from 'react';

const Inicio = () => {
  return (
    <div className='inicio'>
      {/* Header */}
      <header className="header">
        <nav>
          <ul>
            <li><a href="#empresas-logisticas">Empresas Logísticas</a></li>
            <li><a href="#gestion-flotas">Gestión de Flotas</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Soluciones Innovadoras para el Transporte y la Logística</h1>
        <p>Optimiza tu flota, gestiona tus entregas y mejora la eficiencia de tu empresa con MonFlet.</p>
        <a href="#contacto" className="cta-button">Contáctanos para más información</a>
      </section>

      {/* Empresas Logísticas Section */}
      <section id="empresas-logisticas" className="section">
        <h2>Empresas Logísticas</h2>
        <p>MonFlet ayuda a empresas logísticas a mejorar la visibilidad de sus operaciones, optimizar rutas y reducir costos operativos.</p>
        <ul>
          <li>Seguimiento en tiempo real</li>
          <li>Automatización de procesos</li>
          <li>Optimización de rutas</li>
        </ul>
      </section>

      {/* Gestión de Flotas Section */}
      <section id="gestion-flotas" className="section">
        <h2>Gestión de Flotas de Transporte</h2>
        <p>Con MonFlet, gestionar tu flota nunca fue tan fácil. Ofrecemos herramientas avanzadas para monitorear vehículos, planificar rutas y gestionar el mantenimiento.</p>
        <ul>
          <li>Monitoreo en tiempo real</li>
          <li>Gestión de mantenimiento de vehículos</li>
          <li>Optimización de rutas y costos</li>
        </ul>
      </section>

      {/* Llamada a la Acción */}
      <section className="cta">
        <h2>Comienza a mejorar tu gestión logística hoy mismo</h2>
        <a href="#contacto" className="cta-button">Solicita una demostración</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 MonFlet. Todos los derechos reservados.</p>
        <div className="social-media">
          <a href="/facebook">Facebook</a> | 
          <a href="/twitter">Twitter</a> | 
          <a href="/linkedin">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
