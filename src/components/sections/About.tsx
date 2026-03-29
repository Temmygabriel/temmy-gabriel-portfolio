'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0D1420] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <div className="reveal mb-3">
              <span className="font-mono text-xs text-[#2E86AB] tracking-widest uppercase">About</span>
            </div>
            <h2 className="reveal text-4xl lg:text-5xl leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              I analyse data the way<br />
              <span className="text-[#2E86AB] italic">a business person would</span>
            </h2>
            <div className="space-y-4 text-[#9DB4C8] leading-relaxed">
              <p className="reveal">
                I build data pipelines, write SQL that finds what spreadsheets miss, and translate findings
                into language that earns decisions — not just nods. My work spans finance, operations,
                e-commerce, and banking. The domain changes. The standard doesn&apos;t.
              </p>
              <p className="reveal">
                Every project I&apos;ve built started with a real question a business leader would lose sleep
                over. The Nexora analysis started with a CFO suspecting overspend. The bank transactions
                project started with a fraud hypothesis. I don&apos;t explore datasets — I investigate
                business problems.
              </p>
              <p className="reveal">
                I work across the full analyst stack: Python for automation and data generation, PostgreSQL
                for analysis at scale, Excel for deep financial modelling without a BI crutch, and Power BI
                for dashboards that tell one clear story per page.
              </p>
            </div>

            <div className="reveal mt-8 flex gap-4">
              <a
                href="https://github.com/Temmygabriel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#38B2D8] font-mono text-sm hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                github.com/Temmygabriel
              </a>
            </div>
          </div>

          {/* Right — Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: '🧩',
                title: 'Business-first thinking',
                desc: 'Every analysis starts with the question, not the dataset.',
              },
              {
                icon: '🛡️',
                title: 'Defensive data work',
                desc: 'IFERROR everywhere. Raw data never touched. Audit trails built in.',
              },
              {
                icon: '☁️',
                title: 'Full-stack data workflow',
                desc: 'From raw ingestion to cloud database to interactive dashboard — I own the full pipeline.',
              },
              {
                icon: '🌍',
                title: 'Domain-agnostic thinking',
                desc: 'SaaS financials. E-commerce markets. Banking fraud. Transaction analytics. The industry changes — the rigour doesn\'t.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="reveal gradient-border bg-[#0D1420] rounded-xl p-5 hover:bg-[#111827] transition-colors duration-300"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="text-[#F0F4F8] font-medium text-sm mb-2">{card.title}</h3>
                <p className="text-[#5A7A94] text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
