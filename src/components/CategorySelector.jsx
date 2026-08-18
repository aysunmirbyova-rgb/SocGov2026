import { CATEGORIES } from '../data/services';

export default function CategorySelector({ selected, onToggle }) {
  return (
    <div>
      <h3 className="section-title">📱 Tell us what you need:</h3>
      <div className="categories-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selected.includes(cat.id) ? 'active' : ''}`}
            onClick={() => onToggle(cat.id)}
            type="button"
          >
            <span className="icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
