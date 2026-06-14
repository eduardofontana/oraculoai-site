type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-10 w-auto" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 400 100"
      className={className}
      role="img"
      aria-label="OráculoAI"
    >
      <text
        x="12" y="72"
        fill="#e11937"
        fontFamily="Nunito Sans, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-2"
      >
        O
      </text>
      <text
        x="74" y="72"
        className="fill-primary"
        fontFamily="Nunito Sans, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-2"
      >
        ráculo
      </text>
      <text
        x="256" y="72"
        fill="#e11937"
        fontFamily="Nunito Sans, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-2"
      >
        A
      </text>
      <text
        x="310" y="72"
        className="fill-primary"
        fontFamily="Nunito Sans, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-2"
      >
        I
      </text>
    </svg>
  );
}
