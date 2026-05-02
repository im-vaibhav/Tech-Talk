const EpamLogo = ({ className = "" }: { className?: string }) => {
  // Teal brackets + white "epam" — official EPAM treatment for dark backgrounds.
  return (
    <svg
      viewBox="0 0 360 110"
      className={`h-14 w-auto ${className}`}
      role="img"
      aria-label="EPAM Systems"
    >
      <text
        x="20"
        y="82"
        fill="#1BB6CE"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={700}
        fontSize="86"
      >
        &lt;
      </text>
      <text
        x="78"
        y="82"
        fill="#FFFFFF"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={800}
        fontSize="86"
        letterSpacing="-3"
      >
        epam
      </text>
      <text
        x="298"
        y="82"
        fill="#1BB6CE"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={700}
        fontSize="86"
      >
        &gt;
      </text>
    </svg>
  );
};

export default EpamLogo;
