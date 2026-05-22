import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, Calendar, MapPin, Clock, Plus, ExternalLink } from 'lucide-react';
import { Button, Card, StatusBadge, Alert, Tabs } from '../../../components';
import { useProgramById } from '../hooks/usePrograms';
import { useCreateEnrollment } from '../../enrollments/hooks/useEnrollments';
import { useActivitiesByProgram } from '../../activities/hooks/useActivities';
import { useAuthStore } from '../../../app/store/authStore';
import { CreateActivityModal } from '../../activities/views/CreateActivityModal';

export const ProgramDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { role } = useAuthStore();
  const { data: program, loading: isLoading } = useProgramById(id);
  const { data: activities, loading: isLoadingActivities, refresh: refreshActivities } = useActivitiesByProgram(id);
  const { createEnrollment, isLoading: isSubmitting } = useCreateEnrollment();
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const handleEnroll = async () => {
    if (!id) return;
    try {
      await createEnrollment({ activityCode: id }); 
      setIsEnrolled(true);
    } catch {
      // Error handled by hook
    }
  };

  const isCoordinator = role === 'Coordinator' || role === 'Admin' || role === 'SuperUser';

  if (isLoading) return <div className="text-zinc-500 text-center py-20 text-white">Loading program details...</div>;
  if (!program) return <div className="text-zinc-500 text-center py-20 text-white">Program not found.</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 text-sm transition-colors">
        <ArrowLeft size={16} /> Back to programs
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge text={program.state || "ACTIVE"} type="default" />
            {program.acronym && <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{program.acronym}</span>}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <h1 className="text-4xl font-bold tracking-tight">{program.name}</h1>
            {isCoordinator && (
              <Button 
                variant="primary" 
                className="!w-auto px-6 py-2.5 h-fit"
                onClick={() => setIsActivityModalOpen(true)}
              >
                <Plus size={18} className="mr-2" /> Schedule Activity
              </Button>
            )}
          </div>
          
          <Tabs 
            tabs={['Overview', 'Activities', 'Requirements']} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <div className="mt-8">
            {activeTab === 'Overview' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                  {program.description || 'No detailed description available for this program.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 border-zinc-800/50 bg-[#121214]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Manager</p>
                        <p className="text-sm font-medium">U-VoluntApp Team</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 border-zinc-800/50 bg-[#121214]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Created</p>
                        <p className="text-sm font-medium">{program.createdAt ? new Date(program.createdAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'Activities' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-4">Available Activities</h3>
                {isLoadingActivities ? (
                  <p className="text-zinc-500">Loading activities...</p>
                ) : !activities || activities.length === 0 ? (
                  <div className="p-10 border border-dashed border-zinc-800 rounded-2xl text-center">
                    <p className="text-zinc-500">No activities scheduled for this program yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {activities.map((activity) => (
                      <Card 
                        key={activity.uvaCode} 
                        className="p-6 hover:border-yellow-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer group"
                        onClick={() => navigate(`/activities/${activity.uvaCode}`)}
                      >
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">{activity.name}</h4>
                          <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-yellow-500" /> {new Date(activity.startDate).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-yellow-500" /> {new Date(activity.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {activity.locationLatitude && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-yellow-500" /> Location Map</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                           <ExternalLink size={16} className="text-zinc-600 group-hover:text-yellow-500 transition-colors" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Requirements' && (
              <div className="prose prose-invert max-w-none animate-in fade-in duration-500">
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Active student status at UCB.</li>
                  <li>Commitment to complete minimum required hours.</li>
                  <li>Compliance with program-specific safety rules.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[350px] flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            <Card className="p-8 text-center flex flex-col items-center bg-[#18181b] border-yellow-500/10">
              <div className="w-16 h-14 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center mb-6 text-yellow-500">
                <Users size={32} />
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Program Participation</h3>
                <p className="text-xs text-zinc-500">Join this program to start contributing to your community and earning volunteer hours.</p>
              </div>

              {isEnrolled ? (
                 <Alert variant="success" className="w-full mb-4 !p-3">
                   <div className="flex items-center gap-2">
                     <CheckCircle size={16} />
                     <span className="text-xs font-bold">Successfully Enrolled</span>
                   </div>
                 </Alert>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={() => handleEnroll()} 
                  disabled={isSubmitting} 
                  className="w-full text-black bg-yellow-500 font-bold py-4 text-md"
                >
                  {isSubmitting ? 'Processing...' : 'Quick Enrollment'}
                </Button>
              )}
              
              <p className="mt-4 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                By enrolling you agree to the terms
              </p>
            </Card>

            <Card className="p-6 bg-zinc-900/30 border-zinc-800/50">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Clock size={16} className="text-yellow-500" />
                Next Steps
              </h4>
              <ol className="text-xs text-zinc-400 space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">1</span>
                  <span>Complete your basic profile details.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">2</span>
                  <span>Browse available activities in this program.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">3</span>
                  <span>Register for a specific shift or event.</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </div>

      <CreateActivityModal 
        isOpen={isActivityModalOpen} 
        onClose={() => setIsActivityModalOpen(false)} 
        programCode={id || ''}
        onSuccess={refreshActivities}
      />
    </div>
  );
};
