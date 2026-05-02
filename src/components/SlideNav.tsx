import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
      {prev ? (
        <Link
          to={prev}
          aria-label="Previous slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground/80 backdrop-blur-md transition hover:border-[hsl(var(--teal-glow))] hover:text-[hsl(var(--teal-glow))]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <span className="h-10 w-10" />
      )}
      {next ? (
        <Link
          to={next}
          aria-label="Next slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground/80 backdrop-blur-md transition hover:border-[hsl(var(--teal-glow))] hover:text-[hsl(var(--teal-glow))]"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <span className="h-10 w-10" />
      )}
    </div>
  );
};

export default SlideNav;
