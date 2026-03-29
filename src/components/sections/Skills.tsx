'use client';
import { useEffect, useRef } from 'react';

const SKILL_GROUPS = [
  {
    category: 'Data Analysis & Modelling',
    color: '#2E86AB',
    skills: [
      { name: 'Microsoft Excel', level: 90, context: 'Deep formula work — SUMIFS, VLOOKUP, IFERROR chains, pivot analysis' },
      { name: 'Google Sheets', level: 85, context: 'REGEXMATCH, layered date parsing, lookup tables at scale' },
      { name: 'SQL (PostgreSQL)', level: 80, context: 'Window functions, CTEs, fraud detection, 50K-row datasets on Aiven cloud' },
      { name: 'Python (Pandas)', level: 78, context: 'Data cleaning, feature engineering, web scraping pipelines' },
    ],
  },
  {
    category: 'Visualisation & Reporting',
    color: '#E8A838',
    skills: [
      { name: 'Power BI', level: 85, context: 'Multi-page dashboards, live cloud DB connections, KPI design' },
      { name: 'Matplotlib / Seaborn', level: 72, context: 'EDA charts, distribution analysis, annotated insights' },
    ],
  },
  {
    category: 'Engineering & Automation',
    color: '#5BC8E8',
    skills: [
      { name: 'Python Automation', level: 75, context: 'Scheduled API pipelines, ExchangeRate-API, openpyxl dataset generation' },
      { name: 'BeautifulSoup4', level: 74, context: 'Web scraping with rate limiting; creative URL-based fallback parsing' },
      { name: 'Cloud Infrastructure', level: 68, context: 'Aiven PostgreSQL, GitHub Actions awareness, Vercel deployments' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
            // Animate bars
            barsRef.current.forEach((bar, i) => {
              if (bar) {
                setTimeout(() => {
                  bar.style.width = bar.dataset.level + '%';
                }, 300 + i * 80);
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  let barIndex = 0;

  return (
    <section id="skills" ref={sectionRef} className="py-28 bg-[#0D1420] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="reveal mb-3">
          <span className="font-mono text-xs text-[#2E86AB] tracking-widest uppercase">Skills</span>
        </div>
        <h2 className="reveal text-4xl lg:text-5xl leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Tools I&apos;ve earned,{' '}
          <span className="text-[#2E86AB] italic">not just listed</span>
        </h2>
        <p className="reveal text-[#9DB4C8] mb-12 max-w-xl">
          Every skill below has a project behind it. The context shows where I actually used it — not just what it is.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="reveal">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                <h3 className="font-mono text-xs tracking-wider" style={{ color: group.color }}>
                  {group.category.toUpperCase()}
                </h3>
              </div>
              <div className="space-y-5">
                {group.skills.map((skill) => {
                  const currentIndex = barIndex++;
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[#F0F4F8] text-sm font-medium">{skill.name}</span>
                        <span className="font-mono text-xs" style={{ color: group.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      {/* Bar */}
                      <div className="h-1.5 rounded-full bg-[#1E2D3D] overflow-hidden mb-2">
                        <div
                          ref={(el) => { if (el) barsRef.current[currentIndex] = el; }}
                          data-level={skill.level}
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: '0%',
                            background: `linear-gradient(90deg, ${group.color}88, ${group.color})`,
                          }}
                        />
                      </div>
                      {/* Context tooltip on hover */}
                      <p className="text-[#5A7A94] text-xs leading-relaxed group-hover:text-[#9DB4C8] transition-colors">
                        {skill.context}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Also familiar with row */}
        <div className="reveal mt-16 pt-8 border-t border-[#1E2D3D]">
          <p className="font-mono text-xs text-[#5A7A94] mb-4 tracking-wide">ALSO FAMILIAR WITH</p>
          <div className="flex flex-wrap gap-2">
            {['DBeaver', 'Jupyter Notebook', 'Git & GitHub', 'openpyxl', 'Faker', 'Requests', 'ExchangeRate-API', 'Aiven', 'VS Code', 'Excel PivotTables'].map((tool) => (
              <span key={tool} className="tool-tag">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
