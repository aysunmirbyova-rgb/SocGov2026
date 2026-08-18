export default function SituationInput({ value, onChange, onSubmit, loading }) {
  return (
    <div>
      <h3 className="section-title">✍️ Or simply describe your situation:</h3>
      <div className="situation-input-wrapper">
        <textarea
          className="situation-input"
          placeholder="Describe your situation... For example: I am a single mother with two children and I recently lost my job. We are struggling to pay rent and buy food."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      </div>
      <button
        className="submit-btn"
        onClick={onSubmit}
        disabled={loading || (!value.trim())}
        type="button"
      >
        {loading ? (
          <>
            <span className="spinner" />
            Analyzing your situation...
          </>
        ) : (
          <>🔍 Find Relevant Services</>
        )}
      </button>
    </div>
  );
}
