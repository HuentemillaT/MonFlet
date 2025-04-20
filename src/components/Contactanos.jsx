import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    flota: "",
    pais: "",
    cargo: "",
    industria: "",
    busqueda: "",
    aceptaComunicaciones: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Suscríbete a Drivin</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre*" required />
          <Input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido*" required />
        </div>
        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email*" type="email" required />
        <Input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono*" required />
        <Input name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Empresa*" required />
        <Input name="flota" value={formData.flota} onChange={handleChange} placeholder="Flota*" required />
        <Input name="pais" value={formData.pais} onChange={handleChange} placeholder="País*" required />
        <Input name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo*" required />
        <Input name="industria" value={formData.industria} onChange={handleChange} placeholder="Industria*" required />
        <Textarea name="busqueda" value={formData.busqueda} onChange={handleChange} placeholder="¿Qué estás buscando?*" required />

        <div className="text-sm text-gray-600">
          <p className="mb-4">
            Drivin respeta tu privacidad y solo usará tu información para fines específicos y no se compartirá con terceros sin tu autorización.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox id="aceptaComunicaciones" name="aceptaComunicaciones" checked={formData.aceptaComunicaciones} onChange={handleChange} required />
            <label htmlFor="aceptaComunicaciones" className="text-sm">
              Acepto recibir otras comunicaciones de Drivin.*
            </label>
          </div>
          <p className="mt-4 text-xs">
            Al hacer clic a continuación, aceptas que Drivin almacene y procese tu información personal.
          </p>
        </div>

        <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700">
          Suscribirme
        </Button>
      </form>
    </div>
  );
}
