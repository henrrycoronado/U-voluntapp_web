import React, { useState } from 'react';
import { Button, Input, Card, Alert } from '../../../shared/components';
// import { profileApi } from '../services/profileApi'; // Descomentar cuando la API esté lista

export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estado inicial simulado (luego vendrá de tu Zustand authStore o de un fetch)
  const [formData, setFormData] = useState({
     firstName: 'Usuario',
     lastName: 'Voluntario',
     phone: '77777777',
     housingLocation: '',
     careerCode: 'SIS'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    
    // Aquí irá: await profileApi.updateMe(formData)
    setTimeout(() => {
       setSuccessMessage('¡Perfil actualizado correctamente en la base de datos!');
       setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 md:p-10 w-full max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-8">Mi Perfil</h1>

      {successMessage && (
        <Alert variant="success" className="mb-6">
          {successMessage}
        </Alert>
      )}

      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-zinc-800/80">
          <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 text-3xl font-bold">
            {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
            <p className="text-sm text-zinc-400">Voluntario Activo de la UCB</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Nombres" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Apellidos" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Teléfono" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            <Input 
              label="Dirección / Zona" 
              name="housingLocation" 
              value={formData.housingLocation} 
              onChange={handleChange} 
              placeholder="Ej: Zona Sur, Obrajes"
            />
            <Input 
              label="Código de Carrera" 
              name="careerCode" 
              value={formData.careerCode} 
              onChange={handleChange} 
              placeholder="Ej: SIS, DER, ARQ" 
            />
          </div>

          <div className="flex justify-end mt-4 pt-6 border-t border-zinc-800/80">
            <Button variant="primary" type="submit" disabled={isLoading} className="!w-auto px-8">
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
