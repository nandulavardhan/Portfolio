import React from 'react'
import { motion } from 'framer-motion'
import { PROJECTS_DATA } from '../../data/projectsData'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`group relative flex flex-col rounded-[4px] border dashed-border bg-vbase overflow-hidden hover:bg-vpanel/30 transition-colors p-5`}
    >
      <p className="text-[9px] uppercase tracking-[0.18em] text-vmuted font-bold mb-3">{project.label}</p>

      {/* Header */}
      <h3 className={`font-mono text-[14px] font-bold tracking-wider uppercase ${project.color} mb-3`}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-vtext/80 text-[11px] leading-[1.8] whitespace-pre-wrap mb-5">{project.desc}</p>

      <div className="flex-1" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono tracking-widest px-2 py-1 rounded-[2px] border dashed-border text-vmuted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest border-t dashed-border-t pt-3">
        {project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vtext hover:text-vaccent transition-colors"
          >
            [ Live Demo ]
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-vmuted hover:text-vtext transition-colors"
        >
          [ Source Code ]
        </a>
      </div>
    </motion.div>
  )
}

export default function TerminalProjects() {
  return (
    <div className="rounded-[4px] border dashed-border overflow-hidden font-mono text-[13px] bg-vbase">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-vpanel border-b dashed-border-b">
        <span className="w-2 h-2 bg-vtext" />
        <span className="text-[11px] text-vtext tracking-[0.2em] uppercase font-bold">/projects</span>
        <span className="ml-auto text-[10px] text-vmuted tracking-widest">SHOWCASE</span>
      </div>

      {/* Grid */}
      <div className="p-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_DATA.map((p, idx) => (
          <ProjectCard key={p.title} project={p} index={idx} />
        ))}
      </div>
      
      <div className="px-5 pb-5 text-center">
         <p className="text-[10px] text-vmuted uppercase tracking-[0.2em]">More available on GitHub</p>
      </div>
    </div>
  )
}
