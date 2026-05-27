export default function Spinner({ size = 'md', className = '' }) {
  const s = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';
  return (
    <div className={`${s} border-2 border-border border-t-burgundy rounded-full animate-spin ${className}`} />
  );
}
