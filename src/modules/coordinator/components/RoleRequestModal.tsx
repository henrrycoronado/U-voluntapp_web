import { useState } from 'react';
import { Modal, TextArea, Button, Alert } from '../../../components';

interface RoleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
  userEmail?: string;
}

export function RoleRequestModal({ isOpen, onClose, onSubmit, userEmail }: RoleRequestModalProps) {
  const [roleRequest, setRoleRequest] = useState({ reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async () => {
    if (!roleRequest.reason.trim() || !userEmail) {
      setMessage({ type: 'error', text: 'Por favor explica tu motivo' });
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(roleRequest.reason);
      setMessage({
        type: 'success',
        text: '✓ Solicitud enviada exitosamente. Espera aprobación de SuperUser.',
      });
      setRoleRequest({ reason: '' });
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setMessage({
        type: 'error',
        text: `Error: ${err instanceof Error ? err.message : 'No se pudo enviar la solicitud'}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title="Solicitar ser Administrador">
      {message && <Alert type={message.type} message={message.text} />}
      <div className="space-y-4 mt-6">
        <TextArea
          label="Motivo de la solicitud"
          placeholder="Explica por qué quieres ser administrador..."
          value={roleRequest.reason}
          onChange={(e) => setRoleRequest({ reason: e.target.value })}
          rows={4}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
