import ServiceCard from './ServiceCard';

export default function ServiceResults({ aiResponse, recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div>
      {aiResponse && (
        <div className="ai-response">
          <div className="ai-avatar">🤖</div>
          <p>{aiResponse}</p>
        </div>
      )}

      <div className="results-header">
        <h3>Potentially Relevant Services</h3>
        <span className="results-count">{recommendations.length} found</span>
      </div>

      <div className="services-list">
        {recommendations.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
