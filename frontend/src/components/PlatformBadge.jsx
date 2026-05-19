/**
 * components/PlatformBadge.jsx — Color-coded platform indicator
 *
 * Displays a styled badge for a review platform with distinctive color coding.
 * Supports: Google, Trustpilot, Glassdoor, Indeed
 */

// Platform configuration: color classes and emoji icons
const PLATFORM_CONFIG = {
  Google: {
    bg:   'bg-red-500/15',
    text: 'text-red-400',
    border: 'border-red-500/30',
    dot:  'bg-red-400',
    icon: '🔴',
    label: 'Google',
  },
  Trustpilot: {
    bg:   'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot:  'bg-emerald-400',
    icon: '⭐',
    label: 'Trustpilot',
  },
  Glassdoor: {
    bg:   'bg-green-500/15',
    text: 'text-green-400',
    border: 'border-green-500/30',
    dot:  'bg-green-400',
    icon: '🏢',
    label: 'Glassdoor',
  },
  Indeed: {
    bg:   'bg-violet-500/15',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    dot:  'bg-violet-400',
    icon: '💼',
    label: 'Indeed',
  },
};

// Fallback for unknown platforms
const DEFAULT_CONFIG = {
  bg:   'bg-slate-500/15',
  text: 'text-slate-400',
  border: 'border-slate-500/30',
  dot:  'bg-slate-400',
  icon: '📋',
  label: 'Unknown',
};

/**
 * PlatformBadge
 * @param {string} platform - Platform name
 * @param {boolean} showIcon - Whether to show the emoji icon
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const PlatformBadge = ({ platform, showIcon = true, size = 'md' }) => {
  const config = PLATFORM_CONFIG[platform] || DEFAULT_CONFIG;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {showIcon && <span className="text-xs">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export default PlatformBadge;
