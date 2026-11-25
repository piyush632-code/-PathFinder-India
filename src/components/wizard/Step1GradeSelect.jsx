import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { GRADES } from '../../data/cbse-subjects.js';

const gradeCards = [
  {
    grade: GRADES.SECONDARY,
    icon: BookOpen,
    emoji: '📖',
    color: 'from-sky-400 to-blue-500',
    bgLight: 'bg-sky-50 border-sky-200',
    bgSelected: 'bg-gradient-to-br from-sky-50 to-blue-50 border-blue-400',
    textColor: 'text-blue-700',
    description: 'Foundational years — explore your strengths',
    benefits: ['General subjects mapped', 'Class 9 & 10 specific scholarships', 'Early career awareness'],
  },
  {
    grade: GRADES.SENIOR,
    icon: GraduationCap,
    emoji: '🎓',
    color: 'from-violet-400 to-purple-500',
    bgLight: 'bg-violet-50 border-violet-200',
    bgSelected: 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-400',
    textColor: 'text-violet-700',
    description: 'Stream specialization — chart your future path',
    benefits: ['Stream-based career mapping', 'College entrance exam guidance', 'Major scholarship access'],
  },
];

export default function Step1GradeSelect() {
  const { profile, setProfile, nextStep } = useStudentStore();

  const handleSelect = (gradeValue) => {
    setProfile({ gradeLevel: gradeValue, stream: '', selectedSubjects: [] });
    setTimeout(nextStep, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <Sparkles size={14} />
          Step 1 of 6 — Getting Started
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Which grade are you in? 🏫
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Your grade determines the right subjects, streams, and scholarships for you.
        </p>
      </div>

      {/* Name Input */}
      <div className="max-w-sm mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Your First Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ name: e.target.value })}
          placeholder="e.g. Priya"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-gray-800 bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {gradeCards.map(({ grade, icon: Icon, emoji, color, bgLight, bgSelected, textColor, description, benefits }) => {
          const isSelected = profile.gradeLevel === grade.value;
          return (
            <motion.button
              key={grade.value}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(grade.value)}
              className={`
                relative text-left p-6 rounded-2xl border-2 transition-all duration-200 card-hover
                ${isSelected ? bgSelected + ' shadow-md ring-2 ring-offset-2 ring-indigo-300' : bgLight + ' hover:shadow-md'}
              `}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                {emoji}
              </div>
              <h3 className={`text-xl font-bold mb-1 ${textColor}`}>{grade.label}</h3>
              <p className="text-gray-500 text-sm mb-3">{description}</p>
              <ul className="space-y-1">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

