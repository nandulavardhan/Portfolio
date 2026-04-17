import React from 'react'

const STATS = [
  { value: '1+', label: 'YRS CODING', color: 'text-vaccent' },
  { value: '2+', label: 'PROJECTS', color: 'text-vtext' },
  { value: '1', label: 'AWARDS', color: 'text-vpurple' },
  { value: '5+', label: 'TECH STACK', color: 'text-vpink' },
]

const HIGHLIGHTS = ['Kotlin', 'Android', 'React', 'Next.js', 'Supabase']

const KV_ROWS = [
  ['ROLE', '1st Year CSE Student | GSSoC 2026 - Contibutor/Mentee', false],
  ['PASSIONATE ABOUT', 'Android, Web, AI/ML, Cybersecurity', false],
  ['FOCUSING ON', 'Kotlin, Next.js, UX/UI Designing, DSA in Java', false],
  ['STATUS', '● OPEN FOR INTERNSHIPS', true],
]

export default function TerminalAbout() {
  return (
    <div className="rounded-[4px] border dashed-border overflow-hidden font-mono text-[13px] bg-vbase">

      {/* ── Section header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-vpanel border-b dashed-border-b">
        <span className="w-2 h-2 bg-vaccent" />
        <span className="text-[11px] text-vaccent tracking-[0.2em] uppercase font-bold">/about</span>
        <span className="ml-auto text-[10px] text-vmuted tracking-widest">vardhan.dev</span>
      </div>

      <div className="p-5 grid gap-6 sm:grid-cols-[10rem_1fr]">

        {/* ── Left: ASCII Avatar + Identity ──────────────────────────────── */}
        <div className="flex sm:flex-col gap-4 sm:gap-4 items-start sm:items-center">
          <div className="relative shrink-0 text-[8px] leading-none text-vtext/40 font-mono tracking-tighter whitespace-pre sm:mx-auto">
            {`   _..._
 .:::::::.
:::::::::::
:::::::::::
 \`:::::::'
   \`'''\``}
            {/* Minimal ascii placeholder replacing large image */}
          </div>

          <div className="sm:text-center min-w-0 mt-2">
            <h1 className="text-vtext font-bold text-[16px] tracking-wide uppercase">N.V. MALLIK<br />VARDHAN</h1>
            <p className="text-vmuted text-[10px] mt-2 tracking-widest uppercase">Student / Developer</p>
            <p className="text-vaccent text-[10px] mt-3 hidden sm:block tracking-widest uppercase">● Available</p>
          </div>
        </div>

        {/* ── Right: details ────────────────────────────────────────── */}
        <div className="space-y-6 min-w-0">

          {/* Bio */}
          <div className="text-vtext/80 text-[13px] leading-[1.8] border-l dashed-border-l pl-4 flex flex-col gap-3">
            <p>I am a 1st year CSE student passionate about crafting high-performance mobile and web apps. I turn complexity into beautifully designed, production-ready software.</p>
            <p>Started with Python, expanded to Java, got fascinated with Android app development using Kotlin/Jetpack and learnt alot about it while vibe-coding, then made an app called GuardianShield and stood as 2nd Runners Up at Hacknovation 2.0.</p>
          </div>

          {/* Key–value rows */}
          <div className="space-y-2">
            {KV_ROWS.map(([k, v, isStatus]) => (
              <div key={k} className="flex gap-4 text-[12px] items-baseline">
                <span className="text-vmuted shrink-0 w-20 text-[10px] tracking-widest">{k}</span>
                <span className={isStatus ? 'text-vaccent' : 'text-vtext'}>{v}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {STATS.map(({ value, label, color }) => (
              <div
                key={label}
                className="bg-vpanel/50 border dashed-border rounded-[4px] py-3 text-center"
              >
                <p className={`font-bold text-[18px] leading-none ${color}`}>{value}</p>
                <p className="text-vmuted text-[9px] uppercase tracking-[0.15em] mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-6 text-[12px] pt-2 border-t dashed-border-t">
            <a
              href="/resume.pdf"
              className="text-vmuted hover:text-vaccent transition-colors flex items-center gap-2 mt-4"
            >
              <span className="text-[14px]">↓</span> RESUME.PDF
            </a>
            <a
              href="https://github.com/nandulavardhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-vmuted hover:text-vaccent transition-colors flex items-center gap-2 mt-4"
            >
              <span className="text-[14px]">↗</span> GITHUB
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
