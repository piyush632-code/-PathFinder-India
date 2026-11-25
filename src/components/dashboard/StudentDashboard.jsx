import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Compass, Users, TrendingUp, Bookmark, ChevronRight, RefreshCw } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import CareerCard from './CareerCard.jsx';
import ScholarshipCard from './ScholarshipCard.jsx';
import { STREAMS, INTEREST_TAGS } from '../../data/cbse-subjects.js';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const TABS = [
  { id: 'careers', label: 'Career Paths', icon: Compass },
  { id: 'scholarships', label: 'Scholarships', icon: Award },
  { id: 'saved', label: 'Saved', icon: Bookmark },
];

function AptitudeRadar({ profile }) {
  const radarData = [
    { subject: 'Analytical', A: profile.interests.includes('maths') ? 90 : profile.interests.includes('finance') ? 75 : 50 },
    { subject: 'Creative', A: profile.interests.includes('creative_arts') ? 90 : profile.interests.includes('writing') ? 75 : 40 },
    { subject: 'Scientific', A: profile.interests.includes('research') ? 85 : profile.interests.includes('medicine') ? 80 : 45 },
    { subject: 'Social', A: profile.interests.includes('social_work') ? 90 : profile.interests.includes('teaching') ? 75 : 50 },
    { subject: 'Leadership', A: profile.interests.includes('civil_services') ? 85 : profile.interests.includes('business') ? 75 : 55 },
    { subject: 'Technical', A: profile.interests.includes('coding') ? 90 : profile.interests.includes('maths') ? 70 : 40 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
        <Radar name="Aptitude" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default function StudentDashboard() {
  const { profile, careerMatches, scholarshipMatches, savedCareers, savedScholarships, resetAll, wizardStep, goToStep } = useStudentStore();
  const [activeTab, setActiveTab] = useState('careers');

  const stream = profile.stream && profile.stream !== 'general_910'
    ? STREAMS[profile.stream.toUpperCase()]
    : null;

  const selectedInterests = INTEREST_TAGS.filter(t => profile.interests.includes(t.id));

  const savedCareerResults = careerMatches.filter(r => savedCareers.includes(r.career.id));
  const savedScholarshipResults = scholarshipMatches.filter(s => savedScholarships.includes(s.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Banner */}
      <div className={`bg-gradient-to-r ${stream?.gradient || 'from-indigo-500 to-violet-600'} text-white px-4 pt-safe`}>
        <div className="max-w-4xl mx-auto py-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">Your Personalized Report</p>
              <h1 className="text-xl font-bold">
                {profile.name ? `Hey ${profile.name}! 👋` : 'Your Career Dashboard 🚀'}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {stream && (
                  <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                    {stream.icon} {stream.label}
                  </span>
                )}
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                  Grade {profile.gradeLevel}
                </span>
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                  {profile.percentage}% Marks
                </span>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              title="Start Over"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pb-5">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{careerMatches.length}</div>
              <div className="text-white/80 text-xs">Career Paths</div>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{scholarshipMatches.length}</div>
              <div className="text-white/80 text-xs">Scholarships</div>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{savedCareers.length + savedScholarships.length}</div>
              <div className="text-white/80 text-xs">Saved Items</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-2">
        {/* Aptitude Radar + Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">🧠 Aptitude Profile</h3>
            <p className="text-xs text-gray-500 mb-2">Based on your interests & subjects</p>
            <AptitudeRadar profile={profile} />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">🎯 Your Interests</h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(tag => (
                <span key={tag.id} className={`text-xs px-2.5 py-1.5 rounded-full border font-medium ${tag.color}`}>
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>
            {profile.extracurriculars.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">🏆 Achievements</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.extracurriculars.map(id => (
                    <span key={id} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                      {id.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top scholarship highlight */}
        {scholarshipMatches.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl flex-shrink-0">
              💰
            </div>
            <div className="flex-1">
              <p className="text-xs text-green-600 font-medium">Top Scholarship Match</p>
              <p className="text-sm font-bold text-green-900">{scholarshipMatches[0].name}</p>
              <p className="text-xs text-green-700 mt-0.5">{scholarshipMatches[0].amount}</p>
            </div>
            <button
              onClick={() => setActiveTab('scholarships')}
              className="flex-shrink-0 p-2 bg-green-200 rounded-full hover:bg-green-300 transition-colors"
            >
              <ChevronRight size={16} className="text-green-700" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-5">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="pb-10">
          {activeTab === 'careers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerMatches.length > 0 ? (
                careerMatches.map((result, i) => (
                  <CareerCard key={result.career.id} result={result} index={i} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-gray-400">
                  <Compass size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No career matches found</p>
                  <p className="text-sm mt-1">Try updating your profile</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'scholarships' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scholarshipMatches.length > 0 ? (
                scholarshipMatches.map((s, i) => (
                  <ScholarshipCard key={s.id} scholarship={s} index={i} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-gray-400">
                  <Award size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No scholarships matched your profile</p>
                  <p className="text-sm mt-1">Update your income/category details to find more</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-6">
              {savedCareerResults.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Compass size={16} className="text-indigo-500" />
                    Saved Careers ({savedCareerResults.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedCareerResults.map((result, i) => (
                      <CareerCard key={result.career.id} result={result} index={i} />
                    ))}
                  </div>
                </div>
              )}
              {savedScholarshipResults.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Award size={16} className="text-green-500" />
                    Saved Scholarships ({savedScholarshipResults.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedScholarshipResults.map((s, i) => (
                      <ScholarshipCard key={s.id} scholarship={s} index={i} />
                    ))}
                  </div>
                </div>
              )}
              {savedCareerResults.length === 0 && savedScholarshipResults.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Bookmark size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Nothing saved yet</p>
                  <p className="text-sm mt-1">Bookmark careers and scholarships you like</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

