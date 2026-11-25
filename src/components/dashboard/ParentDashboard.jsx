import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, GraduationCap, Shield, TrendingUp, ExternalLink, ChevronRight, Info } from 'lucide-react';
import useStudentStore from '../../store/studentStore.js';
import { STREAMS } from '../../data/cbse-subjects.js';

function InfoCard({ icon: Icon, iconColor, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor} flex-shrink-0`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-bold text-gray-900 text-base">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  const { profile, careerMatches, scholarshipMatches } = useStudentStore();

  const stream = profile.stream && profile.stream !== 'general_910'
    ? STREAMS[profile.stream.toUpperCase()]
    : null;

  const topCareer = careerMatches[0]?.career;
  const topScholarship = scholarshipMatches[0];

  const totalPotentialAid = scholarshipMatches.reduce((acc, s) => acc + (s.amountValue || 0), 0);

  // Cost estimate based on stream
  const costEstimates = {
    science_pcm: { govt: '₹1–5 Lakh (NIT/IIT)', private: '₹8–15 Lakh/yr (Private Engg)', coaching: '₹1–2 Lakh (JEE coaching)' },
    science_pcb: { govt: '₹25,000–1 Lakh (Govt Medical)', private: '₹10–25 Lakh/yr (Private MBBS)', coaching: '₹1.5–3 Lakh (NEET coaching)' },
    commerce: { govt: '₹20,000–1 Lakh (Govt College)', private: '₹2–8 Lakh/yr (Private BBA/BCom)', coaching: '₹50,000–1 Lakh (CA Foundation)' },
    humanities: { govt: '₹15,000–50,000 (Govt College)', private: '₹1–5 Lakh/yr (Private BA/LLB)', coaching: '₹1–2 Lakh (CLAT/UPSC coaching)' },
  };
  const costs = costEstimates[profile.stream] || costEstimates.humanities;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-4">
        <div className="max-w-3xl mx-auto py-6">
          <p className="text-white/60 text-xs mb-1">Parent / Guardian View</p>
          <h1 className="text-xl font-bold">
            {profile.name ? `${profile.name}'s Future Roadmap` : "Your Child's Future Roadmap"}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            A simplified overview of career options, costs, and financial aid available for your child.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Student Snapshot */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <GraduationCap size={18} className="text-indigo-500" />
            Student Snapshot
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Grade', value: profile.gradeLevel },
              { label: 'Stream', value: stream?.label?.split(' ')[0] || 'General' },
              { label: 'Score', value: `${profile.percentage}%` },
              { label: 'Category', value: profile.category.toUpperCase() },
            ].map(item => (
              <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="font-bold text-gray-900 mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Career Path */}
        {topCareer && (
          <div className={`rounded-2xl bg-gradient-to-br ${topCareer.gradient} text-white p-5`}>
            <p className="text-white/70 text-xs mb-1">🏆 Best Career Match</p>
            <div className="flex items-start gap-3">
              <div className="text-3xl">{topCareer.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{topCareer.title}</h3>
                <p className="text-white/80 text-sm mt-1">{topCareer.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    💰 {topCareer.avgSalary}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    📈 {topCareer.jobOutlook} Outlook
                  </span>
                </div>
              </div>
            </div>

            {/* Required exams */}
            <div className="mt-4 bg-white/15 rounded-xl p-3">
              <p className="text-white/80 text-xs font-medium mb-2">Key Entrance Exams Required:</p>
              <div className="flex flex-wrap gap-1.5">
                {topCareer.entranceExams.map(exam => (
                  <span key={exam.name} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {exam.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cost Estimates */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <IndianRupee size={18} className="text-green-500" />
            Estimated Education Costs
          </h2>
          <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
            <Info size={11} />
            Approximate figures — varies by college and category.
          </p>
          <div className="space-y-3">
            {[
              { label: '🏛️ Government College (Total Course)', value: costs.govt },
              { label: '🏫 Private College (Per Year)', value: costs.private },
              { label: '📚 Entrance Exam Coaching', value: costs.coaching },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900 text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Aid Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <Shield size={18} className="text-blue-500" />
            Financial Aid Available
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
            <p className="text-xs text-green-700 font-medium">Total potential scholarship aid:</p>
            <p className="text-2xl font-black text-green-800 mt-0.5">
              ₹{(totalPotentialAid).toLocaleString('en-IN')}+/year
            </p>
            <p className="text-xs text-green-600 mt-0.5">across {scholarshipMatches.length} matched scholarships</p>
          </div>

          <div className="space-y-3">
            {scholarshipMatches.slice(0, 4).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.type}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-700 flex-shrink-0">{s.amount}</span>
              </motion.div>
            ))}
            {scholarshipMatches.length > 4 && (
              <p className="text-xs text-gray-400 text-center pt-1">+{scholarshipMatches.length - 4} more scholarships on student's dashboard</p>
            )}
          </div>
        </div>

        {/* Action Checklist for Parents */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-500" />
            What You Can Do Now
          </h2>
          <ul className="space-y-3">
            {[
              { action: 'Start a dedicated education savings fund (SSY / PPF / RD)', urgent: false },
              { action: `Apply for ${topScholarship?.name || 'government scholarships'} before the deadline`, urgent: true },
              { action: `Explore coaching options for ${topCareer?.entranceExams?.[0]?.name || 'entrance exams'}`, urgent: false },
              { action: 'Gather documents: Aadhaar, income certificate, caste certificate (if applicable)', urgent: false },
              { action: 'Register on National Scholarship Portal (scholarships.gov.in)', urgent: true },
            ].map((item, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${item.urgent ? 'text-indigo-900 font-medium' : 'text-indigo-700'}`}>
                <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-indigo-400" />
                {item.action}
                {item.urgent && (
                  <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full whitespace-nowrap">Urgent</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* NSP link */}
        <a
          href="https://scholarships.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-md transition-all"
        >
          <ExternalLink size={16} />
          Visit National Scholarship Portal (NSP)
        </a>
      </div>
    </div>
  );
}

