import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronRight, ExternalLink, TrendingUp, GraduationCap } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';

const matchColors = {
  high: { bar: 'bg-green-500', badge: 'bg-green-100 text-green-700', label: 'Excellent Match' },
  good: { bar: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700', label: 'Good Match' },
  fair: { bar: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700', label: 'Fair Match' },
};

function getMatchLevel(score) {
  if (score >= 75) return 'high';
  if (score >= 50) return 'good';
  return 'fair';
}

export default function CareerCard({ result, index }) {
  const { career, matchPercentage, reasons } = result;
  const { savedCareers, toggleSaveCareer } = useStudentStore();
  const [expanded, setExpanded] = useState(false);

  const isSaved = savedCareers.includes(career.id);
  const level = getMatchLevel(matchPercentage);
  const colors = matchColors[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${career.gradient} p-5 text-white relative`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
              {career.icon}
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{career.title}</h3>
              <p className="text-white/80 text-xs mt-0.5 leading-relaxed">{career.description}</p>
            </div>
          </div>
          <button
            onClick={() => toggleSaveCareer(career.id)}
            className="ml-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>

        {/* Match bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/80">Match Score</span>
            <span className="text-sm font-bold">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
              className="h-2 rounded-full bg-white"
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Avg Salary</div>
          <div className="text-sm font-bold text-gray-800">{career.avgSalary}</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Outlook</div>
          <div className="text-sm font-bold text-gray-800">{career.jobOutlook}</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Top Exams</div>
          <div className="text-sm font-bold text-gray-800">{career.entranceExams.length}</div>
        </div>
      </div>

      {/* Entrance Exams quick row */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5 border-b border-gray-100">
        {career.entranceExams.slice(0, 3).map(exam => (
          <span key={exam.name} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
            {exam.name}
          </span>
        ))}
        {career.entranceExams.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
            +{career.entranceExams.length - 3} more
          </span>
        )}
      </div>

      {/* Expandable Roadmap */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-3 flex items-center justify-between text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium flex items-center gap-1.5">
            <TrendingUp size={14} className="text-indigo-500" />
            View Career Roadmap
          </span>
          <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 space-y-2">
                {career.roadmap.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${career.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {step.step}
                      </div>
                      {i < career.roadmap.length - 1 && (
                        <div className="w-0.5 bg-gray-200 flex-1 mt-1" style={{ minHeight: '16px' }} />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="text-xs font-semibold text-gray-700">{step.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{step.action}</div>
                    </div>
                  </div>
                ))}

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                    <GraduationCap size={12} />
                    Top Colleges
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.topColleges.map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

