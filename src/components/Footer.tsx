import type { Page } from "./Navbar";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer = ({ onNavigate }: FooterProps) => (
  <footer className="border-t border-border/20 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <button
        data-interactive
        onClick={() => onNavigate("HOME")}
        className="font-orbitron text-sm tracking-[0.3em] text-foreground"
      >
        ART SOFTWARES
      </button>

      <div className="flex items-center gap-6">
        {(["HOME", "BOTS", "RESULTS", "CONTACT"] as const).map((p) => (
          <button
            key={p}
            data-interactive
            onClick={() => onNavigate(p)}
            className="font-orbitron text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground text-xs">
        © {new Date().getFullYear()} ART SOFTWARES
      </p>
    </div>
  </footer>
);

export default Footer;
