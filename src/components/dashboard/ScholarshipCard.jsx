import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ExternalLink, Calendar, FileText, IndianRupee, ChevronDown } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';

const typeColors = {
  'Central Government': 'bg-blue-100 text-blue-700',
  'Corporate CSR': 'bg-purple-100 text-purple-700',
  'State Government': 'bg-green-100 text-green-700',
  'Private Trust': 'bg-orange-100 text-orange-700',
};

function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function ScholarshipCard({ scholarship, index }) {
  const { savedScholarships, toggleSaveScholarship } = useStudentStore();
  const [showDocs, setShowDocs] = useState(false);

  const isSaved = savedScholarships.includes(scholarship.id);
  const days = daysUntil(scholarship.deadline);
  const isUrgent = days <= 30 && days > 0;
  const isExpired = days <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover"
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center text-xl flex-shrink-0">
              {scholarship.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[scholarship.type] || 'bg-gray-100 text-gray-600'}`}>
                  {scholarship.type}
                </span>
                {scholarship.renewable && (
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">🔄 Renewable</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-gray-900 leading-tight">{scholarship.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{scholarship.provider}</p>
            </div>
          </div>
          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {isSaved ? <BookmarkCheck size={16} className="text-indigo-500" /> : <Bookmark size={16} className="text-gray-400" />}
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-3 leading-relaxed">{scholarship.description}</p>
      </div>

      {/* Amount & Deadline */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-3 flex items-center gap-2">
          <IndianRupee size={14} className="text-green-500 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="text-sm font-bold text-green-700">{scholarship.amount}</div>
          </div>
        </div>
        <div className="p-3 flex items-center gap-2">
          <Calendar size={14} className={`flex-shrink-0 ${isUrgent ? 'text-orange-500' : isExpired ? 'text-red-400' : 'text-blue-500'}`} />
          <div>
            <div className="text-xs text-gray-500">Deadline</div>
            <div className={`text-sm font-bold ${isUrgent ? 'text-orange-600' : isExpired ? 'text-red-500' : 'text-blue-700'}`}>
              {isExpired ? 'Closed' : isUrgent ? `⚡ ${days} days left!` : new Date(scholarship.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility tags */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5 border-b border-gray-100">
        {scholarship.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
            {tag.replace(/-/g, ' ')}
          </span>
        ))}
      </div>

      {/* Documents Checklist */}
      <div>
        <button
          onClick={() => setShowDocs(!showDocs)}
          className="w-full px-5 py-3 flex items-center justify-between text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium flex items-center gap-1.5">
            <FileText size={14} className="text-indigo-500" />
            Required Documents ({scholarship.documents.length})
          </span>
          <ChevronDown size={16} className={`transition-transform ${showDocs ? 'rotate-180' : ''}`} />
        </button>

        {showDocs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-5 pb-4"
          >
            <ul className="space-y-1.5">
              {scholarship.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {doc}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Apply button */}
      <div className="px-5 pb-4">
        <a
          href={scholarship.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isExpired
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-md'
          }`}
        >
          <ExternalLink size={14} />
          {isExpired ? 'Applications Closed' : 'Apply Now →'}
        </a>
      </div>
    </motion.div>
  );
}

