import React from 'react';
import { motion } from 'framer-motion';
import useStudentStore from '../../store/studentStore.js';
import { STREAMS, GRADE_9_10_SUBJECTS } from '../../data/cbse-subjects.js';

const streamList = Object.values(STREAMS);

export default function Step2StreamSelect() {
  const { profile, setProfile, nextStep, prevStep } = useStudentStore();
  const isSenior = profile.gradeLevel === '11-12';

  const handleStreamSelect = (streamId) => {
    const stream = STREAMS[streamId.toUpperCase()];
    const mandatorySubjects = stream?.coreSubjects
      .filter(s => s.mandatory)
      .map(s => s.id) || [];
    setProfile({ stream: streamId, selectedSubjects: mandatorySubjects });
    setTimeout(nextStep, 300);
  };

  // For Grade 9-10, auto-select subjects and proceed
  const handleGrade910Proceed = () => {
    const all = [...GRADE_9_10_SUBJECTS.compulsory.map(s => s.id)];
    setProfile({ selectedSubjects: all, stream: 'general_910' });
    nextStep();
  };

  if (!isSenior) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-1.5 rounded-full text-sm font-medium">
            📖 Step 2 of 6 — Subjects
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Class 9–10 Subjects</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            In Grades 9–10, all CBSE students share core subjects. Tell us your elective!
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 mb-3">📚 Compulsory Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GRADE_9_10_SUBJECTS.compulsory.map(sub => (
              <div key={sub.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-xl">{sub.icon}</span>
                <span className="text-sm font-medium text-blue-800">{sub.label}</span>
                <span className="ml-auto text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">Required</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 mt-4 mb-3">🎨 Skill/Elective Subject (choose 1)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GRADE_9_10_SUBJECTS.electives.map(sub => {
              const isSelected = profile.selectedSubjects.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    const others = GRADE_9_10_SUBJECTS.electives.map(e => e.id);
                    const base = GRADE_9_10_SUBJECTS.compulsory.map(s => s.id);
                    const updated = isSelected
                      ? base
                      : [...base, sub.id];
                    setProfile({ selectedSubjects: updated });
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-200'
                  }`}
                >
                  <span className="text-xl">{sub.icon}</span>
                  <span className="text-xs font-medium leading-tight">{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-center max-w-sm mx-auto">
          <button onClick={prevStep} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
            ← Back
          </button>
          <button
            onClick={handleGrade910Proceed}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-md transition-all"
          >
            Continue →
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-1.5 rounded-full text-sm font-medium">
          🎓 Step 2 of 6 — Choose Your Stream
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Your Stream</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Your stream unlocks specific career paths and subjects. Choose what excites you most!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {streamList.map(stream => {
          const isSelected = profile.stream === stream.id;
          return (
            <motion.button
              key={stream.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleStreamSelect(stream.id.toUpperCase())}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 card-hover ${
                isSelected
                  ? 'border-indigo-400 shadow-md ring-2 ring-indigo-100'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stream.gradient} flex items-center justify-center text-2xl mb-3 shadow-sm`}>
                {stream.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">{stream.label}</h3>
              <p className="text-xs text-gray-500 mb-3">{stream.description}</p>
              <div className="flex flex-wrap gap-1">
                {stream.coreSubjects.slice(0, 4).map(sub => (
                  <span key={sub.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {sub.label}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="max-w-sm mx-auto">
        <button onClick={prevStep} className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← Back
        </button>
      </div>
    </motion.div>
  );
}

