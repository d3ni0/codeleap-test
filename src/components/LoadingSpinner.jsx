export default function LoadingSpinner({ size = 'md', message }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="text-center">
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-dark-yellow ${sizeClasses[size]}`}
      />
      {message && <p className="text-dark-yellow mt-2">{message}</p>}
    </div>
  );
}
