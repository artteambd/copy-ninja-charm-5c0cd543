import { useState } from "react";
import { Menu, X } from "lucide-react";

const pages = ["HOME", "BOTS", "RESULTS", "DEVELOPER HISTORY", "CONTACT"] as const;
export type Page = (typeof pages)[number];

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          data-interactive
          onClick={() => onNavigate("HOME")}
          className="font-orbitron text-lg tracking-[0.3em] text-foreground"
        >
          ART
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {pages.map((p) => (
            <button
              key={p}
              data-interactive
              onClick={() => onNavigate(p)}
              className={`font-orbitron text-[11px] tracking-[0.2em] transition-colors ${
                activePage === p
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          data-interactive
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/20 px-6 pb-6">
          {pages.map((p) => (
            <button
              key={p}
              data-interactive
              onClick={() => {
                onNavigate(p);
                setMobileOpen(false);
              }}
              className={`block w-full text-left py-3 font-orbitron text-xs tracking-[0.2em] transition-colors ${
                activePage === p
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
