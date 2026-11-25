// Career Matching Engine
import { CAREERS } from '../data/careers.js';

export function matchCareers(profile) {
  const { stream, selectedSubjects = [], interests = [], percentage = 0, extracurriculars = [] } = profile;

  if (!stream) return [];

  const scores = CAREERS.map(career => {
    let score = 0;
    let reasons = [];

    // Stream match (required)
    if (!career.streams.includes(stream)) return { career, score: -1, reasons: [] };

    // Base score for stream match
    score += 40;
    reasons.push(`Matches your ${stream} stream`);

    // Required subjects check
    const hasRequiredSubjects = career.requiredSubjects.every(sub =>
      selectedSubjects.includes(sub)
    );
    if (hasRequiredSubjects) {
      score += 30;
      reasons.push('All required subjects matched');
    } else {
      score -= 20;
    }

    // Boost subjects
    const boostCount = career.boostSubjects.filter(sub => selectedSubjects.includes(sub)).length;
    if (boostCount > 0) {
      score += boostCount * 10;
      reasons.push(`${boostCount} bonus subject(s) matched`);
    }

    // Interest matching
    const interestMatches = career.interests.filter(i => interests.includes(i)).length;
    if (interestMatches > 0) {
      score += interestMatches * 15;
      reasons.push(`${interestMatches} interest(s) aligned`);
    }

    // Percentage eligibility
    if (percentage >= career.minPercentage) {
      score += 10;
      if (percentage >= career.minPercentage + 15) {
        score += 5;
        reasons.push('Strong academic profile');
      }
    } else {
      score -= 15;
      reasons.push('Below minimum percentage threshold');
    }

    // Extracurricular boost
    if (extracurriculars.includes('olympiad_coding') && career.interests.includes('coding')) score += 10;
    if (extracurriculars.includes('olympiad_science') && (career.interests.includes('research') || career.interests.includes('medicine'))) score += 10;
    if (extracurriculars.includes('debate') && career.interests.includes('public_speaking')) score += 10;

    return {
      career,
      score: Math.min(100, Math.max(0, score)),
      reasons,
      matchPercentage: Math.round(Math.min(100, Math.max(0, score))),
    };
  });

  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

