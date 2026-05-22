import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  Button, 
  Card, 
  StatusBadge, 
  Alert, 
  Tabs, 
  SkeletonList 
} from '../../../components';
import { useActivityByCode } from '../hooks/useActivities';
import { useCreateEnrollment } from '../../enrollments/hooks/useEnrollments';
import { useAuthStore } from '../../../app/store/authStore';

export const ActivityDetails = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { role } = useAuthStore();
  const { data: activity, loading, error, refresh } = useActivityByCode(code);
  const { createEnrollment, isLoading: isEnrolling } = useCreateEnrollment();
  const [activeTab, setActiveTab] = useState('Details');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEnroll = async (groupCode?: string) => {
    if (!code) return;
    try {
      await createEnrollment({ 
        activityCode: code,
        activityGroupCode: groupCode 
      });
      setSuccessMessage('Successfully enrolled in this activity!');
      refresh();
    } catch (err) {
      // Error handled by hook
    }
  };

  const isCoordinator = role === 'Coordinator' || role === 'Admin' || role === 'SuperUser';

  if (loading) return (
    <div className="p-10 max-w-5xl mx-auto">
      <SkeletonList count={5} />
    </div>
  );

  if (!activity || error) return (
    <div className="p-20 text-center text-white">
      <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
      <h2 className="text-2xl font-bold mb-2">Activity Not Found</h2>
      <p className="text-zinc-500 mb-8">The activity you are looking for does not exist or has been removed.</p>
      <Button onClick={() => navigate(-1)} variant="outline" className="!w-auto">Go Back</Button>
    </div>
  );

  return (
    <div className="p-4 md:p-10 w-full max-w-6xl mx-auto text-white animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Program
        </button>

        {isCoordinator && (
          <Button 
            variant="outline" 
            className="!w-auto px-6 py-2"
            onClick={() => navigate(`/activities/${code}/review`)}
          >
            Review Requests
          </Button>
        )}
      </div>

      {successMessage && (
        <Alert variant="success" className="mb-8">
          {successMessage}
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge text={activity.state} type="default" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
              {activity.programName}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6 tracking-tight">{activity.name}</h1>

          <div className="flex flex-wrap gap-6 mb-10 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-yellow-500" />
              <span>{new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-yellow-500" />
              <span>{new Date(activity.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {activity.locationLatitude && (
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-yellow-500" />
                <span>Map Location Available</span>
              </div>
            )}
          </div>

          <Tabs 
            tabs={['Details', 'Groups & Shifts', 'Rules']} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <div className="mt-10">
            {activeTab === 'Details' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {activity.description || 'No detailed description provided for this activity.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 bg-[#121214] border-zinc-800/50">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-yellow-500" />
                      Requirements
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={12} className="text-green-500" /> 
                        Requires Enrollment: {activity.requiresEnrollment ? 'Yes' : 'No'}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={12} className="text-green-500" /> 
                        Approval Required: {activity.rule?.requiresApproval ? 'Yes' : 'No'}
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-[#121214] border-zinc-800/50">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Info size={14} className="text-yellow-500" />
                      Participation
                    </h4>
                    <div className="flex items-center gap-4">
                       <div className="flex-1">
                          <p className="text-2xl font-bold text-white">{activity.rule?.totalCapacity || 'Unlimited'}</p>
                          <p className="text-[10px] text-zinc-500 uppercase font-bold">Total Capacity</p>
                       </div>
                       <div className="w-px h-10 bg-zinc-800" />
                       <div className="flex-1">
                          <p className="text-2xl font-bold text-yellow-500">Active</p>
                          <p className="text-[10px] text-zinc-500 uppercase font-bold">Status</p>
                       </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'Groups & Shifts' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {!activity.rule?.groups || activity.rule.groups.length === 0 ? (
                  <div className="p-16 border border-dashed border-zinc-800 rounded-3xl text-center">
                    <p className="text-zinc-500">No specific groups or shifts defined for this activity.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {activity.rule.groups.map((group) => (
                      <Card key={group.uvaCode} className="p-6 bg-[#121214] border-zinc-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{group.name}</h4>
                          <p className="text-xs text-zinc-500 mb-4">{group.details || 'No additional details.'}</p>
                          <div className="flex gap-4 text-xs font-medium text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(group.startDate).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(group.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleEnroll(group.uvaCode)} 
                          disabled={isEnrolling}
                          variant="outline" 
                          className="!w-auto px-8"
                        >
                          Join Group
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Rules' && (
              <Card className="p-8 bg-[#121214] border-zinc-800/50 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-yellow-500" />
                  Activity Rules
                </h3>
                <div className="space-y-6 text-sm text-zinc-400">
                  <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                    <span>Registration Radius</span>
                    <span className="text-white font-mono">{activity.rule?.registrationRadiusMeters || 0} meters</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                    <span>Enrollment Deadline</span>
                    <span className="text-white">
                      {activity.rule?.enrollmentDeadline ? new Date(activity.rule.enrollmentDeadline).toLocaleString() : 'No deadline'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                    <span>Requires Coordinator Approval</span>
                    <span className={`font-bold ${activity.rule?.requiresApproval ? 'text-yellow-500' : 'text-green-500'}`}>
                      {activity.rule?.requiresApproval ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            <Card className="p-8 bg-yellow-500 text-black border-none shadow-xl shadow-yellow-500/10">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Join Activity</h3>
              <p className="text-sm font-medium mb-8 opacity-80">
                Participate in this event to help your community and log your volunteer hours.
              </p>
              
              <Button 
                onClick={() => handleEnroll()} 
                disabled={isEnrolling}
                className="w-full bg-black text-white hover:bg-zinc-900 py-4 font-bold border-none"
              >
                {isEnrolling ? 'Processing...' : 'Register Now'}
              </Button>

              <div className="mt-6 pt-6 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                 <span>Volunteering</span>
                 <Users size={14} />
                 <span>Community</span>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/30 border-zinc-800/50">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Location Info</h4>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-yellow-500 mt-0.5" />
                <div>
                   <p className="text-sm font-bold text-white">Main Campus / On-site</p>
                   <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                     Please ensure you are within the allowed radius for check-in.
                   </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
