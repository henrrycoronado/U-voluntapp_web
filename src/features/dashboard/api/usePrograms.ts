import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPrograms = async () => {
  const response = await fetch('http://localhost:3000/programs');
  if (!response.ok) throw new Error('Ocurrió un error al cargar los programas');
  return response.json();
};

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: fetchPrograms,
  });
};

const deleteProgram = async (id: string) => {
  const response = await fetch(`http://localhost:3000/programs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el programa');
  return response.json();
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
};
