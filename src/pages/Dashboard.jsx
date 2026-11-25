import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Home, ArrowLeft } from 'lucide-react';
import useStudentStore from '../store/studentStore.js';
import StudentDashboard from '../components/dashboard/StudentDashboard.jsx';
import ParentDashboard from '../components/dashboard/ParentDashboard.jsx';

export default function DashboardPage() {
  const { isDashboardReady, activeView, setActiveView } = useStudentStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDashboardReady) {
      navigate('/wizard');
    }
  }, [isDashboardReady, navigate]);

  if (!isDashboardReady) return null;

  return (
    <div className="min-h-screen">
      {/* Top nav with view toggle */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4">
        <div className="max-w-4xl mx-auto h-14 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Home size={18} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:inline">PathFinder India</span>
          </div>

          {/* View toggle */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'student' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
              }`}
            >
              <GraduationCap size={13} />
              Student
            </button>
            <button
              onClick={() => setActiveView('parent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'parent' ? 'bg-white shadow-sm text-slate-700' : 'text-gray-500'
              }`}
            >
              <Users size={13} />
              Parent
            </button>
          </div>
        </div>
      </div>

      {activeView === 'student' ? <StudentDashboard /> : <ParentDashboard />}
    </div>
  );
}

