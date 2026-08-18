import { DEMO_SCENARIOS } from '../data/services';

export default function DemoScenarios({ onSelect, disabled }) {
  return (
    <div className="demo-section">
      <h3 className="section-title">🎯 Try a demo scenario:</h3>
      <div className="demo-grid">
        {DEMO_SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            className="demo-btn"
            onClick={() => onSelect(scenario)}
            disabled={disabled}
            type="button"
          >
            <strong>{scenario.title}</strong>
            <span>{scenario.titleAz}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
