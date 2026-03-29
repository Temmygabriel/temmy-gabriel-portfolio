'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080C14]/90 backdrop-blur-xl border-b border-[#1E2D3D]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-[#2E86AB]/20 border border-[#2E86AB]/40 flex items-center justify-center">
            <span className="font-mono text-xs text-[#38B2D8] font-bold">TG</span>
          </div>
          <span className="font-mono text-[#9DB4C8] text-sm group-hover:text-[#F0F4F8] transition-colors">
            temmy<span className="text-[#2E86AB]">.</span>gabriel
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#9DB4C8] text-sm hover:text-[#F0F4F8] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#2E86AB] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://github.com/Temmygabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-md border border-[#2E86AB]/50 text-[#38B2D8] text-sm hover:bg-[#2E86AB]/10 transition-all duration-200 font-mono"
          >
            GitHub →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#9DB4C8] hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1420]/95 backdrop-blur-xl border-t border-[#1E2D3D] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#9DB4C8] hover:text-white py-2 border-b border-[#1E2D3D] text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Temmygabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38B2D8] font-mono text-sm"
          >
            GitHub →
          </a>
        </div>
      )}
    </nav>
  );
}
