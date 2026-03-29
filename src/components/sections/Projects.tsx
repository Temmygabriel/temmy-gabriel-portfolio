'use client';
import { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/projects';

const CATEGORY_COLORS: Record<string, string> = {
  'Financial Analysis': '#E8A838',
  'Data Engineering + Analytics': '#2E86AB',
  'Automation + Reporting': '#5BC8E8',
  'Web Scraping + Market Analysis': '#9DB4C8',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[project.category] || '#2E86AB';

  return (
    <div
      className={`reveal group relative bg-[#0D1420] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[#2E86AB]/40 transition-all duration-500 ${project.featured ? 'lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, ${color}, transparent)`
            : `linear-gradient(90deg, ${color}44, transparent)`,
        }}
      />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span
              className="font-mono text-xs tracking-wider mb-2 block"
              style={{ color }}
            >
              {project.category.toUpperCase()}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 bg-[#2E86AB]/10 border border-[#2E86AB]/20 text-[#38B2D8] text-xs font-mono px-2 py-0.5 rounded-full mb-2">
                ★ Featured
              </span>
            )}
          </div>
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg border border-[#1E2D3D]"
            style={{ background: `${color}15` }}
          >
            {project.category === 'Financial Analysis' ? '📊' :
             project.category === 'Data Engineering + Analytics' ? '🗄️' :
             project.category === 'Automation + Reporting' ? '⚙️' : '🔍'}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#F0F4F8] font-semibold text-lg mb-3 leading-snug group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#5A7A94] text-sm leading-relaxed mb-5 group-hover:text-[#9DB4C8] transition-colors">
          {project.description}
        </p>

        {/* Outcome highlight */}
        <div className="bg-[#080C14] rounded-lg p-4 mb-5 border-l-2" style={{ borderColor: color }}>
          <p className="text-xs font-mono text-[#5A7A94] mb-1 tracking-wide">OUTCOME</p>
          <p className="text-[#9DB4C8] text-sm leading-relaxed">{project.outcome}</p>
        </div>

        {/* Metric badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-mono"
          style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          {project.metric}
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tools.map((tool) => (
            <span key={tool} className="tool-tag">{tool}</span>
          ))}
        </div>

        {/* Highlight */}
        <p className="text-[#5A7A94] text-xs italic border-t border-[#1E2D3D] pt-4 mb-4">
          💡 {project.highlight}
        </p>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono transition-all duration-200 group/link"
            style={{ color }}
          >
            View on GitHub
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover/link:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-28 relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2E86AB]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="reveal mb-3">
          <span className="font-mono text-xs text-[#2E86AB] tracking-widest uppercase">Projects</span>
        </div>
        <h2 className="reveal text-4xl lg:text-5xl leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Work that{' '}
          <span className="text-[#2E86AB] italic">changed something</span>
        </h2>
        <p className="reveal text-[#9DB4C8] mb-12 max-w-xl">
          Each project below started with a real business question. The outcomes are what I led with —
          because that&apos;s what matters to the people who read these reports.
        </p>

        {/* Featured projects */}
        {featured.length > 0 && (
          <>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#2E86AB]" />
              <span className="font-mono text-xs text-[#5A7A94] tracking-wider">FEATURED WORK</span>
              <div className="flex-1 h-px bg-[#1E2D3D]" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#5A7A94]" />
              <span className="font-mono text-xs text-[#5A7A94] tracking-wider">OTHER PROJECTS</span>
              <div className="flex-1 h-px bg-[#1E2D3D]" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {rest.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={featured.length + i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
