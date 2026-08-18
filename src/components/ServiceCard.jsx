function getRelevanceClass(relevance) {
  if (relevance === 'High relevance') return 'relevance-high';
  if (relevance === 'Medium relevance') return 'relevance-medium';
  return 'relevance-low';
}

export default function ServiceCard({ service, index }) {
  return (
    <div className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="service-card-header">
        <div>
          <h4>{service.name}</h4>
          <div className="name-az">{service.nameAz}</div>
        </div>
        <span className={`relevance-badge ${getRelevanceClass(service.relevance)}`}>
          {service.relevance}
        </span>
      </div>

      <div className="why-box">
        <div className="why-box-title">
          💡 Why am I seeing this?
        </div>
        <p>{service.explanation}</p>
      </div>

      <p className="service-description">{service.description}</p>

      <div className="service-details">
        <div className="detail-block">
          <h5>Requirements</h5>
          <ul>
            {service.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="detail-block">
          <h5>Documents Needed</h5>
          <ul>
            {service.documents.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="apply-block">
        <h5>How to Apply</h5>
        <p>{service.howToApply}</p>
      </div>

      <a
        href={service.officialLink}
        target="_blank"
        rel="noopener noreferrer"
        className="official-link"
      >
        🔗 Official Application →
      </a>
    </div>
  );
}
