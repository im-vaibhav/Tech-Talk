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
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      // Don't hijack when user is typing
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (el as any)?.isContentEditable) return;

      // Prevent other components (e.g., Carousel) from consuming arrows
      // Debug: log key presses to verify event reaches SlideNav
      // eslint-disable-next-line no-console
      console.debug("SlideNav keydown:", e.key);
      e.preventDefault();
      e.stopPropagation();

      if (e.key === "ArrowRight" && next) navigate(next);
      if (e.key === "ArrowLeft" && prev) navigate(prev);
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true } as any);
  }, [navigate, prev, next]);

  // No visible UI — navigation is keyboard-only (arrow keys)
  return null;
};

export default SlideNav;
