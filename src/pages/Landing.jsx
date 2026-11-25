import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Award, Compass, ArrowRight, Star, ChevronRight } from 'lucide-react';

const features = [
  { icon: GraduationCap, emoji: '🎓', title: 'CBSE Stream Mapping', desc: 'Science, Commerce, and Humanities — with individual subject selection down to your electives.', color: 'from-blue-500 to-cyan-500' },
  { icon: Compass, emoji: '🧭', title: 'AI-Powered Career Matching', desc: 'Cross-reference your subjects, marks, and passions to unlock personalized career roadmaps.', color: 'from-violet-500 to-purple-500' },
  { icon: Award, emoji: '💰', title: 'Scholarship Matchmaker', desc: '15+ active Central & CSR scholarships matched to your profile, category, and financial background.', color: 'from-green-500 to-emerald-500' },
];

const stats = [
  { number: '15+', label: 'Active Scholarships' },
  { number: '12+', label: 'Career Clusters' },
  { number: '4', label: 'CBSE Streams' },
  { number: '100%', label: 'Free to Use' },
];

const testimonials = [
  { name: 'Priya S.', grade: 'Class 11, PCB', text: 'Found 3 scholarships I had no idea existed! The NEET roadmap is super clear.', avatar: '👩‍🔬' },
  { name: 'Arjun M.', grade: 'Class 12, Commerce', text: 'Helped me choose between CA and MBA. The career match score was spot on.', avatar: '👨‍💼' },
  { name: 'Nandini K.', grade: 'Class 10, General', text: 'Even before choosing a stream, this helped me understand what I really like!', avatar: '👧' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4">
        <div className="max-w-5xl mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-base">PathFinder <span className="text-indigo-500">India</span></span>
          </div>
          <button
            onClick={() => navigate('/wizard')}
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all"
          >
            Get Started Free →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 text-center">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={14} className="fill-current" />
            Designed specifically for CBSE Grade 9–12 Students
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Your Career &{' '}
            <span className="gradient-text">Scholarship</span>
            <br />Roadmap Starts Here
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Answer a few questions about your CBSE subjects, interests, and background — 
            get matched to <strong className="text-gray-700">personalized career paths</strong> and 
            <strong className="text-gray-700"> active Indian scholarships</strong> in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/wizard')}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all text-base"
            >
              Start My Journey <ArrowRight size={18} />
            </motion.button>
            <p className="text-sm text-gray-400">Free · No registration · 5 minutes</p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative max-w-2xl mx-auto mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black gradient-text">{stat.number}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stream Preview */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">Built Around the CBSE Curriculum</h2>
          <p className="text-gray-500 text-center mb-8">Every CBSE stream and subject combination — mapped to real careers.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji: '⚡', label: 'Science PCM', desc: 'Engineering, Tech, Data Science', color: 'from-blue-400 to-cyan-400' },
              { emoji: '🧬', label: 'Science PCB', desc: 'Medicine, Biotech, Pharma', color: 'from-green-400 to-emerald-400' },
              { emoji: '📈', label: 'Commerce', desc: 'CA, Finance, Business', color: 'from-orange-400 to-amber-400' },
              { emoji: '🎭', label: 'Humanities', desc: 'Law, Civil Services, Arts', color: 'from-purple-400 to-pink-400' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-3`}>
                  {item.emoji}
                </div>
                <div className="font-bold text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">Everything You Need in One Place</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-md`}>
                  {feature.emoji}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships highlight */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-14 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">💰</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Don't Miss Free Money!</h2>
          <p className="text-white/80 mb-6">
            Thousands of crores in scholarships go unclaimed every year. We match you to Central Government, state, and corporate scholarships based on your exact profile.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['NSP (Central Govt)', 'HDFC Pankh', 'Tata Capital', 'Reliance Foundation', 'CBSE Merit', 'INSPIRE DST'].map(s => (
              <span key={s} className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">{s}</span>
            ))}
          </div>
          <button
            onClick={() => navigate('/wizard')}
            className="bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-2xl hover:shadow-lg transition-all"
          >
            Check My Eligibility Now →
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Students Love It</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-3xl mb-3">{t.avatar}</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.grade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready to Find Your Path? 🚀</h2>
          <p className="text-gray-500 mb-6">It's free, takes 5 minutes, and could change your future.</p>
          <button
            onClick={() => navigate('/wizard')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all text-base"
          >
            Get My Free Report <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-4 text-center">
        <p className="text-xs text-gray-400">
          PathFinder India — Helping CBSE students (Grades 9–12) discover their future since 2024.
          <br />Scholarship data is for reference. Always verify on official portals.
        </p>
      </footer>
    </div>
  );
}

