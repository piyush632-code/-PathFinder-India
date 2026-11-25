import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Home } from 'lucide-react';
import useStudentStore from '../store/studentStore.js';
import Step1GradeSelect from '../components/wizard/Step1GradeSelect.jsx';
import Step2StreamSelect from '../components/wizard/Step2StreamSelect.jsx';
import Step3SubjectSelect from '../components/wizard/Step3SubjectSelect.jsx';
import Step4AcademicInput from '../components/wizard/Step4AcademicInput.jsx';
import Step5InterestTags from '../components/wizard/Step5InterestTags.jsx';
import Step6ProfileSummary from '../components/wizard/Step6ProfileSummary.jsx';

const WIZARD_STEPS = [
  Step1GradeSelect,
  Step2StreamSelect,
  Step3SubjectSelect,
  Step4AcademicInput,
  Step5InterestTags,
  Step6ProfileSummary,
];

const STEP_LABELS = ['Grade', 'Stream', 'Subjects', 'Profile', 'Interests', 'Review'];

export default function WizardPage() {
  const { wizardStep, isDashboardReady } = useStudentStore();
  const navigate = useNavigate();

  // If wizard is complete (step 7), redirect to dashboard
  if (wizardStep >= WIZARD_STEPS.length && isDashboardReady) {
    navigate('/dashboard');
    return null;
  }

  const StepComponent = WIZARD_STEPS[Math.min(wizardStep, WIZARD_STEPS.length - 1)];
  const progress = ((wizardStep) / (WIZARD_STEPS.length)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4">
        <div className="max-w-2xl mx-auto h-14 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Home size={18} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">PathFinder India</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Step {Math.min(wizardStep + 1, WIZARD_STEPS.length)} of {WIZARD_STEPS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto pb-3">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-2">
            {STEP_LABELS.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full transition-all ${
                  i < wizardStep ? 'bg-indigo-500' :
                  i === wizardStep ? 'bg-indigo-400 ring-2 ring-indigo-200' :
                  'bg-gray-200'
                }`} />
                <span className={`text-[9px] mt-1 hidden sm:block ${i === wizardStep ? 'text-indigo-600 font-semibold' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={wizardStep}>
            {StepComponent && <StepComponent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

