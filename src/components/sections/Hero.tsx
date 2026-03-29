'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const STATS = [
  { value: '4', label: 'Portfolio Projects' },
  { value: '50K', label: 'Rows Analysed' },
  { value: '3', label: 'Tools Mastered' },
  { value: '0', label: 'Pre-cleaned Datasets' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.hero-item');
    items?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, i * 120);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-pattern"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#2E86AB]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#E8A838]/5 blur-[100px] pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            {/* Status pill */}
            <div
              className="hero-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E2D3D] border border-[#2E86AB]/30 mb-6"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B2D8] animate-pulse" />
              <span className="font-mono text-xs text-[#9DB4C8]">Open to remote opportunities</span>
            </div>

            {/* Name */}
            <h1
              className="hero-item"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <span className="block text-[#9DB4C8] font-body text-lg font-light mb-1 tracking-wide">
                Hi, I&apos;m
              </span>
              <span
                className="block text-5xl lg:text-6xl xl:text-7xl leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Temmy
                <br />
                <span className="text-[#2E86AB] italic">Gabriel</span>
              </span>
            </h1>

            {/* Role line */}
            <div
              className="hero-item mt-4 mb-6"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <p className="text-xl text-[#F0F4F8] font-light">
                Data Analyst
              </p>
              <p className="text-[#9DB4C8] mt-1">
                I turn messy data into decisions that move businesses forward.
              </p>
            </div>

            {/* Value prop */}
            <p
              className="hero-item text-[#9DB4C8] leading-relaxed mb-8 max-w-md"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              Not just charts and dashboards — I dig into transaction-level data,
              find what&apos;s actually happening, and frame it in language CFOs act on.
            </p>

            {/* CTAs */}
            <div
              className="hero-item flex flex-wrap gap-3"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-md bg-[#2E86AB] hover:bg-[#38B2D8] text-white font-medium transition-all duration-200 shadow-lg shadow-[#2E86AB]/20 hover:shadow-[#2E86AB]/40 hover:-translate-y-0.5"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-md border border-[#2E86AB]/40 text-[#9DB4C8] hover:text-white hover:border-[#2E86AB] transition-all duration-200 hover:-translate-y-0.5"
              >
                Get in touch
              </a>
            </div>

            {/* Stats row */}
            <div
              className="hero-item mt-12 grid grid-cols-4 gap-4 pt-8 border-t border-[#1E2D3D]"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="stat-number text-2xl lg:text-3xl">{s.value}</div>
                  <div className="text-[#5A7A94] text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div
            className="hero-item order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-[#2E86AB]/20 scale-110 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-[#2E86AB]/10 scale-125" />

              {/* Accent corner lines */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#2E86AB]/60 rounded-tl-sm" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#E8A838]/60 rounded-br-sm" />

              {/* Photo */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-[#1E2D3D] azure-glow">
                <Image
                  src="/images/temmy.png"
                  alt="Temmy Gabriel — Data Analyst"
                  fill
                  priority
                  className="object-cover object-top"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/30 to-transparent" />
              </div>

              {/* Floating tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0D1420] border border-[#2E86AB]/40 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38B2D8]" />
                <span className="font-mono text-xs text-[#9DB4C8]">Available for remote roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#2E86AB]" />
          <span className="font-mono text-xs text-[#5A7A94]">scroll</span>
        </div>
      </div>
    </section>
  );
}
