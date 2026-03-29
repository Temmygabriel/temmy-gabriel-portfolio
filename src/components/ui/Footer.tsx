export default function Footer() {
  return (
    <footer className="bg-[#080C14] border-t border-[#1E2D3D] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2E86AB]/20 border border-[#2E86AB]/40 flex items-center justify-center">
            <span className="font-mono text-[10px] text-[#38B2D8] font-bold">TG</span>
          </div>
          <span className="font-mono text-xs text-[#5A7A94]">
            Temmy Gabriel — Data Analyst
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/Temmygabriel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#5A7A94] hover:text-[#9DB4C8] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/temmygabriel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#5A7A94] hover:text-[#9DB4C8] transition-colors">
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-xs text-[#5A7A94]">
          © {new Date().getFullYear()} · Temmy Gabriel · Data Analyst
        </p>
      </div>
    </footer>
  );
}
