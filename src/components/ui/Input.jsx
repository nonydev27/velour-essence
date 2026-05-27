export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent transition-all ${
          error ? 'border-error' : 'border-border'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
