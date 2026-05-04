import epamLogo from "@/assests/epam-logo.webp";

const EpamLogo = ({ className = "" }: { className?: string }) => {
  return (
    <img
      src={epamLogo}
      alt="EPAM Systems"
      className={`h-10 w-auto ${className}`}
      style={{
        filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
      }}
    />
  );
};

export default EpamLogo;
