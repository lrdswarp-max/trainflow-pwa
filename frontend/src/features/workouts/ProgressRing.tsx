

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({ progress, size = 120, strokeWidth = 8, className = '' }: ProgressRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg 
      width={size} 
      height={size} 
      className={`transform -rotate-90 ${className}`}
      data-testid="progress-ring-svg"
    >
      <circle
        className="text-gray-800"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="text-blue-500 transition-all duration-300 ease-in-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
        data-testid="progress-ring-circle"
      />
    </svg>
  );
}
