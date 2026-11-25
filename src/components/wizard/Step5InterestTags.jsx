import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { INTEREST_TAGS } from '../../data/cbse-subjects.js';

export default function Step5InterestTags() {
  const { profile, toggleInterest, nextStep, prevStep } = useStudentStore();

  const selectedCount = profile.interests.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <Zap size={14} />
          Step 5 of 6 — Interests & Aptitude
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Gets You Excited? 🚀</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Pick at least 3 areas you're passionate about. This powers your personalized career recommendations.
        </p>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedCount >= 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          {selectedCount >= 3 ? '✓' : '○'} {selectedCount} selected {selectedCount >= 3 ? '— great!' : '(min. 3)'}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {INTEREST_TAGS.map(tag => {
            const isSelected = profile.interests.includes(tag.id);
            return (
              <motion.button
                key={tag.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleInterest(tag.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? `${tag.color} border-current shadow-sm scale-105`
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-base">{tag.icon}</span>
                {tag.label}
                {isSelected && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-current/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedCount >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 text-center"
        >
          <p className="text-sm text-green-700 font-medium">
            🎯 Great choices! Ready to see your personalized roadmap?
          </p>
        </motion.div>
      )}

      <div className="flex gap-3 justify-center max-w-sm mx-auto">
        <button onClick={prevStep} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <button
          onClick={nextStep}
          disabled={selectedCount < 3}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </motion.div>
  );
}

