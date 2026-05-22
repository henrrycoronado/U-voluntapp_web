import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';
import { Button, Card, StatusBadge, Alert } from '../../../shared/components';
import apiClient from '../../../shared/services/client';

export const ProgramDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [program, setProgram] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        // RUTA CORREGIDA:
        const response = await apiClient.get(`/api/v1/programs/${id}`);
        setProgram(response.data.data || response.data);
      } catch (error) {
        console.error('Error al obtener detalles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProgramDetails();
  }, [id]);

  const handleEnroll = async () => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/api/v1/enrollments', { programCode: id });
      setIsEnrolled(true);
    } catch (error) {
      alert('Error al procesar la inscripción.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-zinc-500 text-center py-20 text-white">Cargando información...</div>;
  if (!program) return <div className="text-zinc-500 text-center py-20 text-white">Programa no encontrado.</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-5xl mx-auto text-white">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 text-sm transition-colors">
        <ArrowLeft size={16} /> Volver a programas
      </button>

      {isEnrolled && (
        <Alert variant="success" className="mb-8">
          <CheckCircle size={20} className="mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm">¡Inscripción exitosa!</span>
            <span className="text-xs text-[#4ade80]/80">Tu registro quedó grabado en la base de datos.</span>
          </div>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <StatusBadge text={program.state || "ACTIVO"} type="default" />
          <h1 className="text-3xl font-bold mt-4 mb-3">{program.name}</h1>
          <p className="text-zinc-400 text-sm mb-10 max-w-2xl leading-relaxed">
            {program.description || 'Sin descripción detallada.'}
          </p>
        </div>

        <div className="w-full lg:w-[320px] flex-shrink-0">
          <Card className="p-8 text-center flex flex-col items-center bg-[#18181b]">
            <div className="w-14 h-14 rounded-full border border-yellow-500/20 bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500">
              <Users size={24} />
            </div>
            {isEnrolled ? (
               <Button variant="disabled" disabled className="w-full">
                 <CheckCircle size={16} className="text-[#4ade80] mr-2" /> Ya estás inscrito
               </Button>
            ) : (
              <Button variant="primary" onClick={handleEnroll} disabled={isSubmitting} className="w-full text-black bg-yellow-500 font-bold">
                {isSubmitting ? 'Procesando...' : 'Inscribirme ahora'}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
