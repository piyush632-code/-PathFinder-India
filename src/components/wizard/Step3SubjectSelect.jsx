import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { STREAMS } from '../../data/cbse-subjects.js';

export default function Step3SubjectSelect() {
  const { profile, toggleSubject, nextStep, prevStep } = useStudentStore();

  const streamKey = profile.stream?.toUpperCase();
  const streamData = STREAMS[streamKey];

  if (!streamData || profile.gradeLevel === '9-10') {
    nextStep();
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${streamData.gradient} text-white`}>
          {streamData.icon} Step 3 of 6 — Subjects
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Subject Selection</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Mandatory subjects are auto-selected. Pick your optional/elective subject.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Core/Mandatory Subjects */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📌</span>
            <h3 className="font-semibold text-gray-800">Core / Mandatory Subjects</h3>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auto-selected</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {streamData.coreSubjects.map(sub => (
              <div key={sub.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-800">{sub.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Subjects */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold text-gray-800">Optional / Elective Subjects</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            CBSE allows 1 optional subject. Select the one you're taking (or interested in).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {streamData.optionalSubjects.map(sub => {
              const isSelected = profile.selectedSubjects.includes(sub.id);
              return (
                <motion.button
                  key={sub.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Allow toggle, but only one optional at a time
                    const optionalIds = streamData.optionalSubjects.map(o => o.id);
                    const mandatoryIds = streamData.coreSubjects.map(c => c.id);
                    if (isSelected) {
                      toggleSubject(sub.id);
                    } else {
                      // Remove any other optional, add this one
                      const newSubs = [...mandatoryIds, sub.id];
                      useStudentStore.setState(state => ({
                        profile: { ...state.profile, selectedSubjects: newSubs }
                      }));
                    }
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/30'
                  }`}
                >
                  <span className="text-2xl">{sub.icon}</span>
                  <span className="text-xs font-medium leading-tight">{sub.label}</span>
                  {isSelected && (
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Selected ✓</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center max-w-sm mx-auto">
        <button onClick={prevStep} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-md transition-all"
        >
          Continue →
        </button>
      </div>
    </motion.div>
  );
}

