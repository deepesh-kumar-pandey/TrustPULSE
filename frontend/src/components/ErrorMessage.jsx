/**
 * components/ErrorMessage.jsx — Styled error alert component
 *
 * Displays API errors, validation failures, or general messages
 * with icon, message, and optional retry action.
 */

// ── Icons ─────────────────────────────────────────────────────────────────────
const AlertIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5C2.3 17.333 3.262 19 4.8 19z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

/**
 * ErrorMessage
 * @param {string} message — The error message to display
 * @param {Function} onRetry — Optional retry callback
 * @param {string} retryLabel — Label for the retry button
 */
const ErrorMessage = ({ message, onRetry, retryLabel = 'Try Again' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Error icon circle */}
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5C2.3 17.333 3.262 19 4.8 19z" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>

      {/* Error message box */}
      <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 max-w-lg w-full">
        <AlertIcon className="text-red-400 mt-0.5" />
        <p className="text-red-300 text-sm leading-relaxed">{message}</p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 btn-secondary flex items-center gap-2"
        >
          <RefreshIcon />
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
