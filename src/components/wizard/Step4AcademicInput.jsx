import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, IndianRupee, Users, ChevronDown } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { EXTRACURRICULARS } from '../../data/cbse-subjects.js';

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'sc', label: 'SC (Scheduled Caste)' },
  { value: 'st', label: 'ST (Scheduled Tribe)' },
  { value: 'obc', label: 'OBC (Other Backward Class)' },
  { value: 'ews', label: 'EWS (Economically Weaker Section)' },
  { value: 'minority', label: 'Minority Community' },
];

const INCOME_RANGES = [
  { value: 0, label: 'Below ₹1 Lakh/year' },
  { value: 100000, label: '₹1–2.5 Lakh/year' },
  { value: 250000, label: '₹2.5–4.5 Lakh/year' },
  { value: 450000, label: '₹4.5–8 Lakh/year' },
  { value: 800000, label: 'Above ₹8 Lakh/year' },
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export default function Step4AcademicInput() {
  const { profile, setProfile, toggleExtracurricular, nextStep, prevStep } = useStudentStore();
  const [showExtraCurr, setShowExtraCurr] = useState(false);

  const handlePercentageChange = (val) => {
    const p = Math.min(100, Math.max(0, Number(val)));
    setProfile({ percentage: p });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium">
          📋 Step 4 of 6 — Academic & Profile Details
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Tell Us More About You</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          This helps us find the most accurate scholarships and career matches for your profile.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-4">

        {/* Academic Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-orange-500" />
            <h3 className="font-semibold text-gray-800">Academic Performance</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Percentage / CGPA
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={profile.percentage || ''}
                onChange={(e) => handlePercentageChange(e.target.value)}
                placeholder="e.g. 78"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-gray-800 transition-all text-lg font-semibold"
              />
              <span className="text-2xl font-bold text-gray-400">%</span>
            </div>
            {profile.percentage > 0 && (
              <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.percentage}%` }}
                  className={`h-2 rounded-full ${
                    profile.percentage >= 90 ? 'bg-green-500' :
                    profile.percentage >= 75 ? 'bg-blue-500' :
                    profile.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-400'
                  }`}
                />
              </div>
            )}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span className={profile.percentage >= 90 ? 'text-green-600 font-semibold' : ''}>
                {profile.percentage >= 90 ? '🏆 Excellent!' : profile.percentage >= 75 ? '✨ Very Good' : profile.percentage >= 60 ? '👍 Good' : ''}
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Category & Gender */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-blue-500" />
            <h3 className="font-semibold text-gray-800">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={profile.category}
                onChange={(e) => {
                  setProfile({
                    category: e.target.value,
                    isMinority: e.target.value === 'minority'
                  });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 outline-none text-gray-800 bg-white text-sm"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
              <div className="flex gap-2">
                {['male', 'female', 'other'].map(g => (
                  <button
                    key={g}
                    onClick={() => setProfile({ gender: g })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 capitalize transition-all ${
                      profile.gender === g
                        ? 'border-blue-400 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-200'
                    }`}
                  >
                    {g === 'male' ? '👦' : g === 'female' ? '👧' : '🧒'} {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {profile.gender === 'female' && (
            <label className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.isSingleGirlChild}
                onChange={(e) => setProfile({ isSingleGirlChild: e.target.checked })}
                className="w-4 h-4 text-pink-500"
              />
              <span className="text-sm font-medium text-pink-800">
                👧 I am the only girl child in my family
              </span>
            </label>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">State of Domicile</label>
            <select
              value={profile.state}
              onChange={(e) => setProfile({ state: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 outline-none text-gray-800 bg-white text-sm"
            >
              <option value="">Select State</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Family Income */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <IndianRupee size={18} className="text-green-500" />
            <h3 className="font-semibold text-gray-800">Annual Family Income</h3>
            <span className="ml-auto text-xs text-gray-400">(for need-based scholarships)</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {INCOME_RANGES.map(range => (
              <button
                key={range.value}
                onClick={() => setProfile({ annualIncome: range.value })}
                className={`text-left px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  profile.annualIncome === range.value
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : 'border-gray-100 text-gray-600 hover:border-green-200 hover:bg-green-50/30'
                }`}
              >
                {profile.annualIncome === range.value ? '✓ ' : ''}{range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Extracurriculars */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <button
            onClick={() => setShowExtraCurr(!showExtraCurr)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <h3 className="font-semibold text-gray-800">Achievements & Extracurriculars</h3>
            </div>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${showExtraCurr ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-xs text-gray-500 mt-1">Optional — but boosts career match accuracy!</p>

          {showExtraCurr && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 grid grid-cols-2 gap-2"
            >
              {EXTRACURRICULARS.map(e => {
                const isSelected = profile.extracurriculars.includes(e.id);
                return (
                  <button
                    key={e.id}
                    onClick={() => toggleExtracurricular(e.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-100 text-gray-600 hover:border-indigo-200'
                    }`}
                  >
                    <span className="text-base">{e.icon}</span>
                    <span className="leading-tight">{e.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-center max-w-sm mx-auto">
        <button onClick={prevStep} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <button
          onClick={nextStep}
          disabled={!profile.percentage}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </motion.div>
  );
}

