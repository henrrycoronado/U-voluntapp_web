import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  StatusBadge,
  Button,
  Card,
  SkeletonList,
  Alert,
} from '../../../components';
import { useMyEnrollments, useCancelEnrollment } from '../hooks/useEnrollments';
import { Calendar, Trash2, ExternalLink, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyEnrollments = () => {
  const navigate = useNavigate();
  const { data: enrollments, loading, error, refresh } = useMyEnrollments();
  const { cancelEnrollment, isLoading: isCancelling } = useCancelEnrollment();

  const handleCancel = async (uvaCode: string) => {
    if (!window.confirm('Are you sure you want to cancel this enrollment?')) return;
    try {
      await cancelEnrollment(uvaCode);
      refresh();
    } catch {
      // Error handled by hook
    }
  };

  if (loading)
    return (
      <div className="p-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Participations</h1>
        <SkeletonList count={5} />
      </div>
    );

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">My Participations</h1>
        <p className="text-zinc-400">Track your volunteering activities and enrollment status.</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-8">
          {error}
        </Alert>
      )}

      {!enrollments || enrollments.length === 0 ? (
        <Card className="p-20 border-2 border-dashed border-zinc-900 bg-transparent text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No active enrollments</h3>
            <p className="text-zinc-500 mb-8 text-sm">
              You haven't joined any activities yet. Start exploring programs to make an impact!
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/programs')}
              className="!w-auto px-8"
            >
              Explore Programs
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Table>
            <Thead>
              <Tr>
                <Th>Activity</Th>
                <Th>Group</Th>
                <Th>Enrolled Date</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {enrollments.map((enrollment) => (
                <Tr key={enrollment.uvaCode}>
                  <Td>
                    <div>
                      <p className="font-bold text-white">{enrollment.activityName}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                        Code: {enrollment.activityCode}
                      </p>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs text-zinc-400">
                      {enrollment.activityGroupCode || 'General Participation'}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} className="text-yellow-500" />
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge text={enrollment.state} type="default" />
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/activities/${enrollment.activityCode}`)}
                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <ExternalLink size={18} />
                      </button>
                      {enrollment.stateCode === 'stage-1' && ( // Assuming stage-1 is PENDING/ACTIVE
                        <button
                          onClick={() => handleCancel(enrollment.uvaCode)}
                          disabled={isCancelling}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Cancel Enrollment"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Card className="p-6 bg-yellow-500/5 border-yellow-500/10">
            <div className="flex gap-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg h-fit">
                <Info size={18} className="text-yellow-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Participation Notes</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Please remember to attend your scheduled shifts. If you cannot attend, cancel your
                  enrollment at least 24 hours in advance so other volunteers can take your place.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
