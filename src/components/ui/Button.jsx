import { cloneElement, Children } from 'react';

const variants = {
  primary: 'bg-burgundy hover:bg-burgundy-dark text-white',
  secondary: 'bg-cream hover:bg-border text-charcoal border border-border',
  ghost: 'bg-transparent hover:bg-cream text-charcoal',
  danger: 'bg-error hover:bg-red-700 text-white',
  gold: 'bg-gold hover:opacity-90 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  asChild = false,
  ...props
}) {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: `${baseClass} ${child.props.className || ''}`.trim(),
      ...props,
    });
  }

  return (
    <button
      className={baseClass}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
