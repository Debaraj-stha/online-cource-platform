import  { type ReactNode } from 'react';



interface ErrorCardProps {
  error: string | ReactNode;
  title?: string;
  variant?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  className?: string;
}

const ErrorCard = ({
  error,
  title = 'Error',
  variant = 'error',
  onRetry,
  className = ''
}: ErrorCardProps) => {
  // Determine styles based on variant
  const variantStyles = {
    error: {
      container: 'border-red-200 bg-red-50',
      title: 'text-red-700',
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      container: 'border-amber-200 bg-amber-50',
      title: 'text-amber-700',
      text: 'text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700'
    },
    info: {
      container: 'border-blue-200 bg-blue-50',
      title: 'text-blue-700',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`p-4 max-w-2xl mx-auto rounded-lg border ${styles.container} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <h3 className={`font-semibold text-lg mb-2 ${styles.title}`}>{title}</h3>
      <div className={`text-sm ${styles.text}`}>{error}</div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className={`mt-4 px-4 py-2 text-white rounded-md transition-colors ${styles.button}`}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorCard