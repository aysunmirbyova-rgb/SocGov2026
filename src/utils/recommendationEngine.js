import { SERVICES } from '../data/services';

const RELEVANCE = {
  HIGH: 'High relevance',
  MEDIUM: 'Medium relevance',
  LOW: 'Low relevance',
};

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u0400-\u04FF]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreService(service, tokens, selectedCategories, fullText) {
  let score = 0;
  const matchedKeywords = [];
  const matchedCategories = [];

  for (const keyword of service.keywords) {
    const kw = keyword.toLowerCase();
    if (fullText.includes(kw) || tokens.some((t) => t.includes(kw) || kw.includes(t))) {
      score += 3;
      matchedKeywords.push(keyword);
    }
  }

  if (selectedCategories.includes(service.category)) {
    score += 5;
    matchedCategories.push(service.category);
  }

  for (const tag of service.tags) {
    if (tokens.some((t) => tag.includes(t) || t.includes(tag))) {
      score += 1;
    }
  }

  return { score, matchedKeywords, matchedCategories };
}

function buildExplanation(service, matchedKeywords, matchedCategories, fullText, selectedCategories) {
  const reasons = [];

  if (matchedCategories.length > 0) {
    const catLabels = matchedCategories.map((c) => {
      const labels = {
        employment: 'employment support',
        financial: 'financial assistance',
        disability: 'disability support',
        elderly: 'elderly care',
        family: 'child and family support',
        education: 'education assistance',
        housing: 'housing support',
        other: 'general social services',
      };
      return labels[c] || c;
    });
    reasons.push(`you selected ${catLabels.join(' and ')} as areas of need`);
  }

  const situationClues = [];
  if (/unemploy|jobless|işsiz|lost job|no job/i.test(fullText)) {
    situationClues.push('you indicated that you are unemployed or seeking work');
  }
  if (/child|children|uşaq|baby|family of \d|dependents?/i.test(fullText)) {
    situationClues.push('you mentioned having dependent children or family members');
  }
  if (/disab|wheelchair|blind|əlil|injury|injured/i.test(fullText)) {
    situationClues.push('you indicated a disability or health-related need');
  }
  if (/elderly|old age|\b7[0-9]\b|\b8[0-9]\b|pension|yaşlı|retired/i.test(fullText)) {
    situationClues.push('you mentioned being elderly or needing age-related support');
  }
  if (/low income|poor|poverty|struggling|cannot afford|aşağı gəlir|kasıb/i.test(fullText)) {
    situationClues.push('you described financial hardship or low income');
  }
  if (/single parent|single mother|single father|tək valideyn|widow/i.test(fullText)) {
    situationClues.push('you indicated being a single parent');
  }
  if (/student|university|tələbə|təhsil|school/i.test(fullText)) {
    situationClues.push('you mentioned being a student or needing education support');
  }
  if (/housing|rent|homeless|mənzil|ev|apartment|accommodation/i.test(fullText)) {
    situationClues.push('you described housing-related difficulties');
  }
  if (/training|skills|retrain|vocational|peşə|kurs/i.test(fullText)) {
    situationClues.push('you expressed interest in vocational training or skill development');
  }

  if (situationClues.length > 0) {
    reasons.push(...situationClues);
  }

  if (matchedKeywords.length > 0 && reasons.length === 0) {
    reasons.push(`your description matched key terms related to ${service.name}`);
  }

  if (reasons.length === 0 && selectedCategories.includes(service.category)) {
    reasons.push(`this service falls under the ${service.category} category you selected`);
  }

  const reasonText =
    reasons.length > 0
      ? reasons.slice(0, 3).join('; ')
      : 'this service may be relevant based on your general inquiry';

  return `This service was recommended because ${reasonText}. Final eligibility is determined by ${service.authority}.`;
}

function getRelevanceLevel(score) {
  if (score >= 8) return RELEVANCE.HIGH;
  if (score >= 4) return RELEVANCE.MEDIUM;
  return RELEVANCE.LOW;
}

export function getRecommendations(situationText, selectedCategories = []) {
  const fullText = situationText.toLowerCase();
  const tokens = tokenize(situationText);

  const results = SERVICES.map((service) => {
    const { score, matchedKeywords, matchedCategories } = scoreService(
      service,
      tokens,
      selectedCategories,
      fullText
    );

    return {
      ...service,
      score,
      relevance: getRelevanceLevel(score),
      explanation: buildExplanation(
        service,
        matchedKeywords,
        matchedCategories,
        fullText,
        selectedCategories
      ),
      matchedKeywords,
    };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (results.length === 0) {
    return SERVICES.slice(0, 3).map((service) => ({
      ...service,
      score: 1,
      relevance: RELEVANCE.LOW,
      explanation: `This is a commonly accessed social service in Azerbaijan that may be relevant to your situation. We recommend exploring it further or providing more details about your needs. Final eligibility is determined by ${service.authority}.`,
      matchedKeywords: [],
    }));
  }

  return results.slice(0, 6);
}

export function generateAIResponse(situationText, selectedCategories, recommendations) {
  const hasHigh = recommendations.some((r) => r.relevance === RELEVANCE.HIGH);
  const count = recommendations.length;

  let greeting = 'Based on your situation, I found ';
  greeting += count === 1 ? '1 potentially relevant service' : `${count} potentially relevant services`;
  greeting += ' for you.';

  if (hasHigh) {
    greeting += ' Some of these are highly relevant matches.';
  }

  if (selectedCategories.length > 0) {
    greeting += ' I prioritized services in the categories you selected.';
  }

  greeting += ' Each recommendation includes a transparent explanation of why it was suggested. Remember, final eligibility is always determined by the relevant government authority.';

  return greeting;
}
