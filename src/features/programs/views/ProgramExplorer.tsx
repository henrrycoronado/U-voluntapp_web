import { useState } from 'react';
import { usePrograms } from '../hooks/usePrograms';
import { useActivitiesByProgram } from '../../activities/hooks/useActivities';
import { useCreateEnrollment } from '../../enrollments/hooks/useEnrollments';
import type { Program } from '../services/programsApi';
import { Card, Button, StatusBadge, Alert, SkeletonList } from '../../../components';
import { Calendar, ArrowLeft, ChevronRight } from 'lucide-react';

export const ProgramExplorer = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const { createEnrollment, error: enrollError } = useCreateEnrollment();
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const { data: programs, loading, error } = usePrograms();
  const { data: activities, loading: activitiesLoading } = useActivitiesByProgram(
    selectedProgram?.uvaCode
  );

  const handleSelectProgram = (program: Program | null) => {
    setSelectedProgram(program);
  };

  const handleEnroll = async (activityCode: string) => {
    if (!selectedProgram) return;
    setEnrollingId(activityCode);

    try {
      await createEnrollment({ activityCode });
    } catch {
      // Error handled by hook
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-white">Exploring Programs...</h2>
      <SkeletonList count={6} />
    </div>
  );

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white transition-all">
      {error && <Alert variant="error" className="mb-6">{error}</Alert>}
      {enrollError && <Alert variant="error" className="mb-6">{enrollError}</Alert>}

      {!selectedProgram ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Volunteer Catalog</h2>
            <p className="text-zinc-400">Discover programs where you can make a difference today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!programs || programs.length === 0 ? (
              <div className="col-span-full p-20 border border-dashed border-zinc-800 rounded-3xl text-center">
                <p className="text-zinc-500">No active programs available at the moment.</p>
              </div>
            ) : (
              programs.map((program) => (
                <Card 
                  key={program.uvaCode}
                  className="group p-8 hover:border-yellow-500/40 transition-all cursor-pointer bg-[#121214] flex flex-col justify-between"
                  onClick={() => handleSelectProgram(program)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                       <StatusBadge text={program.state || 'ACTIVE'} type="default" />
                       <ChevronRight className="text-zinc-600 group-hover:text-yellow-500 transition-colors" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-3 mb-8 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Details</span>
                    <span className="text-xs font-medium text-yellow-500">View Activities</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <button
            onClick={() => handleSelectProgram(null)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 text-sm font-medium transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </button>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              {selectedProgram.name}
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">{selectedProgram.description}</p>
          </div>

          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-yellow-500" />
            Scheduled Activities
          </h3>

          {activitiesLoading ? (
            <SkeletonList count={3} />
          ) : !activities || activities.length === 0 ? (
            <div className="p-16 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 text-center">
              <p className="text-zinc-500">No activities scheduled for this program yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activities.map((activity) => (
                <Card
                  key={activity.uvaCode}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-[#121214] border-zinc-800/50 hover:border-zinc-700 transition-colors"
                >

                  <div className="mb-6 sm:mb-0">
                    <h4 className="text-lg font-bold text-white mb-1">{activity.name}</h4>
                    <p className="text-sm text-zinc-400 mb-3 max-w-xl">
                      {activity.description}
                    </p>
                    <div className="flex gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-yellow-500" /> {new Date(activity.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEnroll(activity.uvaCode || '')}
                    disabled={enrollingId === activity.uvaCode}
                    variant={enrollingId === activity.uvaCode ? 'disabled' : 'primary'}
                    className="w-full sm:w-auto px-10 py-3"
                  >
                    {enrollingId === activity.uvaCode ? 'Processing...' : 'Enroll Now'}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
