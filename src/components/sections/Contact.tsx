'use client';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const EMAIL = 'temmygabriel@example.com'; // Temmy should replace this

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-[#0D1420] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#2E86AB]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="reveal mb-3">
          <span className="font-mono text-xs text-[#2E86AB] tracking-widest uppercase">Contact</span>
        </div>
        <h2
          className="reveal text-4xl lg:text-6xl leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Let&apos;s work on something
          <br />
          <span className="text-[#2E86AB] italic">that matters</span>
        </h2>
        <p className="reveal text-[#9DB4C8] text-lg mb-12 max-w-xl mx-auto">
          I&apos;m available for remote financial data analyst roles and freelance projects.
          If you have messy data and need answers — I&apos;m the right person.
        </p>

        {/* Primary CTA */}
        <div className="reveal mb-8">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#2E86AB] hover:bg-[#38B2D8] text-white font-semibold text-lg transition-all duration-200 shadow-xl shadow-[#2E86AB]/25 hover:shadow-[#2E86AB]/40 hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send me an email
          </a>
        </div>

        {/* Email copy */}
        <div className="reveal flex items-center justify-center gap-3 mb-12">
          <code className="font-mono text-[#9DB4C8] text-sm">{EMAIL}</code>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 text-xs font-mono text-[#5A7A94] hover:text-[#38B2D8] transition-colors px-2 py-1 rounded border border-[#1E2D3D] hover:border-[#2E86AB]/40"
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="reveal flex items-center gap-4 max-w-xs mx-auto mb-10">
          <div className="flex-1 h-px bg-[#1E2D3D]" />
          <span className="font-mono text-xs text-[#5A7A94]">or find me on</span>
          <div className="flex-1 h-px bg-[#1E2D3D]" />
        </div>

        {/* Social links */}
        <div className="reveal flex justify-center gap-4">
          <a
            href="https://github.com/Temmygabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#1E2D3D] hover:border-[#2E86AB]/40 text-[#9DB4C8] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/temmygabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#1E2D3D] hover:border-[#2E86AB]/40 text-[#9DB4C8] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
