import { useState } from 'react';
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  StatusBadge, 
  SkeletonList,
  Alert,
  Card
} from '../../../components';
import { useEnrollmentsByActivity, useReviewEnrollment } from '../hooks/useEnrollments';
import { Check, X, User, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export const ReviewEnrollments = () => {
  const { activityCode } = useParams();
  const navigate = useNavigate();
  const { data: enrollments, loading, error, refresh } = useEnrollmentsByActivity(activityCode);
  const { reviewEnrollment, isLoading: isReviewing } = useReviewEnrollment();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleReview = async (uvaCode: string, approved: boolean) => {
    setActionError(null);
    try {
      await reviewEnrollment(uvaCode, { approved });
      refresh();
    } catch (err) {
      // Error is handled by hook but we can capture it for local display if needed
    }
  };

  if (loading) return (
    <div className="p-10 max-w-7xl mx-auto">
      <SkeletonList count={5} />
    </div>
  );

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 text-sm transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Activity
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Review Requests</h1>
        <p className="text-zinc-400">Manage volunteer enrollment requests for this activity.</p>
      </div>

      {(error || actionError) && (
        <Alert variant="error" className="mb-8">
          {error || actionError}
        </Alert>
      )}

      {!enrollments || enrollments.length === 0 ? (
        <Card className="p-20 border-2 border-dashed border-zinc-900 bg-transparent text-center">
          <div className="max-w-xs mx-auto">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No pending requests</h3>
            <p className="text-zinc-500 text-sm">There are no enrollment requests for this activity at the moment.</p>
          </div>
        </Card>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Volunteer</Th>
              <Th>Requested Group</Th>
              <Th>Date</Th>
              <Th>Current Status</Th>
              <Th className="text-right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {enrollments.map((enrollment) => (
              <Tr key={enrollment.uvaCode}>
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 font-bold text-xs">
                      {enrollment.enrolledProfileName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white">{enrollment.enrolledProfileName}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Ref: {enrollment.enrolledProfileCode}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <span className="text-xs text-zinc-400">
                    {enrollment.activityGroupCode || 'General'}
                  </span>
                </Td>
                <Td>
                  <span className="text-xs">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </span>
                </Td>
                <Td>
                  <StatusBadge text={enrollment.state} type="default" />
                </Td>
                <Td className="text-right">
                  {enrollment.stateCode === 'stage-1' ? ( // Assuming stage-1 is PENDING
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleReview(enrollment.uvaCode, true)}
                        disabled={isReviewing}
                        className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-500 transition-colors disabled:opacity-50"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleReview(enrollment.uvaCode, false)}
                        disabled={isReviewing}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors disabled:opacity-50"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Processed</span>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
};
