import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { matchCareers } from '../engine/careerMatcher.js';
import { matchScholarships } from '../data/scholarships.js';

const useStudentStore = create(
  persist(
    (set, get) => ({
      // Profile
      profile: {
        name: '',
        gradeLevel: '',           // '9-10' or '11-12'
        stream: '',               // stream id
        selectedSubjects: [],     // array of subject ids
        percentage: 0,
        subjectMarks: {},         // { subject_id: marks }
        interests: [],            // interest tag ids
        extracurriculars: [],     // extracurricular ids
        category: 'general',      // general/sc/st/obc/ews/minority
        gender: '',               // male/female/other
        annualIncome: 0,
        isSingleGirlChild: false,
        isMinority: false,
        minorityCommunity: '',
        state: '',
      },

      // Wizard state
      wizardStep: 0,

      // Results
      careerMatches: [],
      scholarshipMatches: [],
      isDashboardReady: false,

      // Actions
      setProfile: (updates) => set(state => ({
        profile: { ...state.profile, ...updates }
      })),

      nextStep: () => set(state => ({ wizardStep: state.wizardStep + 1 })),
      prevStep: () => set(state => ({ wizardStep: Math.max(0, state.wizardStep - 1) })),
      goToStep: (step) => set({ wizardStep: step }),

      toggleSubject: (subjectId) => set(state => {
        const subjects = state.profile.selectedSubjects;
        const updated = subjects.includes(subjectId)
          ? subjects.filter(s => s !== subjectId)
          : [...subjects, subjectId];
        return { profile: { ...state.profile, selectedSubjects: updated } };
      }),

      toggleInterest: (interestId) => set(state => {
        const interests = state.profile.interests;
        const updated = interests.includes(interestId)
          ? interests.filter(i => i !== interestId)
          : [...interests, interestId];
        return { profile: { ...state.profile, interests: updated } };
      }),

      toggleExtracurricular: (id) => set(state => {
        const list = state.profile.extracurriculars;
        const updated = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
        return { profile: { ...state.profile, extracurriculars: updated } };
      }),

      computeResults: () => {
        const { profile } = get();
        const careers = matchCareers(profile);
        const scholarships = matchScholarships(profile);
        set({ careerMatches: careers, scholarshipMatches: scholarships, isDashboardReady: true });
      },

      resetAll: () => set({
        profile: {
          name: '', gradeLevel: '', stream: '', selectedSubjects: [],
          percentage: 0, subjectMarks: {}, interests: [], extracurriculars: [],
          category: 'general', gender: '', annualIncome: 0,
          isSingleGirlChild: false, isMinority: false, minorityCommunity: '', state: '',
        },
        wizardStep: 0,
        careerMatches: [],
        scholarshipMatches: [],
        isDashboardReady: false,
      }),

      // Saved items
      savedCareers: [],
      savedScholarships: [],

      toggleSaveCareer: (careerId) => set(state => {
        const list = state.savedCareers;
        return { savedCareers: list.includes(careerId) ? list.filter(i => i !== careerId) : [...list, careerId] };
      }),

      toggleSaveScholarship: (schId) => set(state => {
        const list = state.savedScholarships;
        return { savedScholarships: list.includes(schId) ? list.filter(i => i !== schId) : [...list, schId] };
      }),

      // View toggle
      activeView: 'student', // 'student' | 'parent'
      setActiveView: (view) => set({ activeView: view }),
    }),
    {
      name: 'cbse-student-profile',
      partialize: (state) => ({
        profile: state.profile,
        savedCareers: state.savedCareers,
        savedScholarships: state.savedScholarships,
        isDashboardReady: state.isDashboardReady,
        careerMatches: state.careerMatches,
        scholarshipMatches: state.scholarshipMatches,
      }),
    }
  )
);

export default useStudentStore;

