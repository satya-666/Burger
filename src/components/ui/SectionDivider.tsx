interface SectionDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export default function SectionDivider({
  flip = false,
  color = "#E8DCCB",
  className,
}: SectionDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className ?? ""}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`wavy-divider ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
