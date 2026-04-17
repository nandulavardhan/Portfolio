import React, { useState, useEffect, useRef } from 'react'

const GROUPS = [
  {
    cat: 'LANGUAGES',
    headingColor: 'text-vaccent',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Java', level: 72 },
      { name: 'C', level: 85 },
      { name: 'Bash', level: 92 },
      { name: 'JavaScript', level: 75 },
      { name: 'Kotlin', level: 70 },
    ],
  },
  {
    cat: 'BACKEND',
    headingColor: 'text-vpurple',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Supabase', level: 90 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'APIs', level: 88 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    cat: 'TOOLS',
    headingColor: 'text-vpink',
    skills: [
      { name: 'Git & GitHub', level: 70 },
      { name: 'Android Studio', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel', level: 70 },
      { name: 'Figma', level: 80 },
    ],
  },
]

// Animated skill bar
function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => setWidth(level), 60)
    return () => clearTimeout(id)
  }, [level])

  return (
    <div className="space-y-1" ref={ref}>
      <div className="flex justify-between text-[11px] tracking-widest font-mono">
        <span className="text-vtext">{name}</span>
        <span className="text-vmuted tabular-nums">{level}%</span>
      </div>
      <div className="h-[2px] rounded-none bg-vpanel overflow-hidden border dashed-border">
        <div
          className={`h-full bg-vtext opacity-70 transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function GroupCard({ group }) {
  return (
    <div className={`rounded-[4px] border dashed-border bg-vbase p-5 space-y-5`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b dashed-border-b pb-3">
        <span className={`text-[12px] font-bold tracking-[0.2em] ${group.headingColor}`}>
          /{group.cat}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {group.skills.map((s) => (
          <SkillBar key={s.name} name={s.name} level={s.level} />
        ))}
      </div>
    </div>
  )
}

export default function TerminalSkills() {
  return (
    <div className="rounded-[4px] border dashed-border overflow-hidden font-mono text-[13px] bg-vbase">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-vpanel border-b dashed-border-b">
        <span className="w-2 h-2 bg-vpurple" />
        <span className="text-[11px] text-vpurple tracking-[0.2em] uppercase font-bold">/skills</span>
        <span className="ml-auto text-[10px] text-vmuted tracking-widest">SYSTEM CAPABILITIES</span>
      </div>

      <div className="p-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {GROUPS.map((g) => (
          <GroupCard key={g.cat} group={g} />
        ))}
      </div>
    </div>
  )
}
