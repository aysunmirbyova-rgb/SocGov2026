import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySelector from './components/CategorySelector';
import SituationInput from './components/SituationInput';
import DemoScenarios from './components/DemoScenarios';
import ServiceResults from './components/ServiceResults';
import { getRecommendations, generateAIResponse } from './utils/recommendationEngine';

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (text, categories) => {
    const situationText = text || situation;
    const cats = categories || selectedCategories;

    if (!situationText.trim()) return;

    setLoading(true);
    setRecommendations(null);
    setAiResponse(null);

    await new Promise((r) => setTimeout(r, 1200));

    const results = getRecommendations(situationText, cats);
    const response = generateAIResponse(situationText, cats, results);

    setRecommendations(results);
    setAiResponse(response);
    setLoading(false);

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDemoSelect = (scenario) => {
    setSituation(scenario.description);
    setSelectedCategories(scenario.categories);
    handleSubmit(scenario.description, scenario.categories);
  };

  return (
    <>
      <Header />
      <Hero />

      <section className="app-section">
        <div className="container">
          <div className="main-card">
            <CategorySelector
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
            <SituationInput
              value={situation}
              onChange={setSituation}
              onSubmit={() => handleSubmit()}
              loading={loading}
            />
            <DemoScenarios onSelect={handleDemoSelect} disabled={loading} />
          </div>

          <div id="results" style={{ marginTop: '32px' }}>
            {recommendations && (
              <ServiceResults
                aiResponse={aiResponse}
                recommendations={recommendations}
              />
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>SosialYol — AI Social Service Navigator for Azerbaijan</p>
          <p className="disclaimer">
            This is an MVP demonstration tool. Service information is for guidance only.
            Final eligibility is determined by the relevant government authority.
            Always verify details through official channels.
          </p>
        </div>
      </footer>
    </>
  );
}
