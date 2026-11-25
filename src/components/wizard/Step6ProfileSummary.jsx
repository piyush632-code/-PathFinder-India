import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Star, ChevronRight } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { STREAMS, INTEREST_TAGS } from '../../data/cbse-subjects.js';

export default function Step6ProfileSummary() {
  const { profile, computeResults, nextStep, prevStep } = useStudentStore();

  const stream = profile.stream && profile.stream !== 'general_910'
    ? STREAMS[profile.stream.toUpperCase()]
    : null;

  const selectedInterests = INTEREST_TAGS.filter(t => profile.interests.includes(t.id));

  const handleGenerate = () => {
    computeResults();
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <Star size={14} className="fill-current" />
          Step 6 of 6 — Confirm & Generate
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {profile.name ? `Looking great, ${profile.name}! 🎉` : 'Your Profile Summary 🎉'}
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Review your details below and generate your personalized career and scholarship report.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {/* Profile card */}
        <div className={`rounded-2xl p-5 text-white ${stream ? `bg-gradient-to-br ${stream.gradient}` : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Student Profile</p>
              <h3 className="text-xl font-bold mt-0.5">{profile.name || 'Student'}</h3>
            </div>
            <div className="text-3xl">{stream?.icon || '📖'}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              Grade {profile.gradeLevel}
            </span>
            {stream && (
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                {stream.label}
              </span>
            )}
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {profile.percentage}% Overall
            </span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full capitalize">
              {profile.category.toUpperCase()} · {profile.gender || 'N/A'}
            </span>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">📚 Selected Subjects</h4>
          <div className="flex flex-wrap gap-1.5">
            {profile.selectedSubjects.map(sub => (
              <span key={sub} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full capitalize">
                {sub.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">🎯 Your Interests</h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedInterests.map(tag => (
              <span key={tag.id} className={`text-xs px-2.5 py-1 rounded-full border ${tag.color}`}>
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* What you'll get */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4">
          <h4 className="text-sm font-semibold text-indigo-800 mb-3">🚀 What you'll receive:</h4>
          <ul className="space-y-2">
            {[
              'Top matching career paths with step-by-step roadmaps',
              'Required entrance exams (JEE, NEET, CLAT, CUET...)',
              'Matching scholarships with documents checklist',
              'Application deadlines & financial aid estimation',
              'Parent-friendly summary dashboard',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-indigo-700">
                <ChevronRight size={12} className="mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3 justify-center max-w-sm mx-auto">
        <button onClick={prevStep} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGenerate}
          className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Rocket size={18} />
          Generate My Report!
        </motion.button>
      </div>
    </motion.div>
  );
}

