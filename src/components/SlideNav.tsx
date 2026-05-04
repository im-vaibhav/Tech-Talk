import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SlideNavProps {
  prev?: string;
  next?: string;
}

const SlideNav = ({ prev, next }: SlideNavProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && next) {
        navigate(next);
      } else if (e.key === "ArrowLeft" && prev) {
        navigate(prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, prev, next]);

  // No visible UI — navigation is keyboard-only (arrow keys)
  return null;
};

export default SlideNav;
