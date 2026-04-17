import React from 'react'

const LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: 'vardhannandula@gmail.com',
    href: 'mailto:vardhannandula@gmail.com',
    desc: 'Best for project inquiries',
    badge: '< 24h response',
    colorHover: 'group-hover:text-vtext',
    colorText: 'text-vtext',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/nandulavardhan',
    href: 'https://github.com/nandulavardhan',
    desc: 'Open source & personal projects',
    badge: 'active',
    colorHover: 'group-hover:text-vpink',
    colorText: 'text-vpink',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/vardhan-nandula',
    href: 'https://www.linkedin.com/in/vardhan-nandula',
    desc: 'Professional network & endorsements',
    badge: 'open to connect',
    colorHover: 'group-hover:text-vaccent',
    colorText: 'text-vaccent',
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'vardhan.dev',
    href: '#',
    desc: 'Chat directly for collabs & ideas',
    badge: 'online',
    colorHover: 'group-hover:text-vpurple',
    colorText: 'text-vpurple',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@nv_core',
    href: 'https://instagram.com/nv_core',
    desc: 'Not active',
    badge: 'offline',
    colorHover: 'group-hover:text-vturquoise',
    colorText: 'text-vturquoise',
  },
  {
    id: 'x',
    label: 'X',
    value: '@nandulavardhan',
    href: 'https://x.com/nandulavardhan',
    desc: 'Thoughts & tech',
    badge: 'active',
    colorHover: 'group-hover:text-vblue',
    colorText: 'text-vblue',
  },
]

export default function TerminalContact() {
  return (
    <div className="rounded-[4px] border dashed-border overflow-hidden font-mono text-[13px] bg-vbase">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-vpanel border-b dashed-border-b">
        <span className="w-2 h-2 bg-vpink" />
        <span className="text-[11px] text-vpink tracking-[0.2em] uppercase font-bold">/socials</span>
        <span className="ml-auto text-[10px] text-vmuted tracking-widest">AWAITING CONNECTION</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.id !== 'email' ? '_blank' : undefined}
            rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
            className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[4px] border dashed-border bg-vbase hover:bg-vpanel/30 transition-all`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className={`text-[12px] font-bold uppercase tracking-widest ${link.colorText} ${link.colorHover}`}>
                  {link.label}
                </span>
                <span className="px-2 py-[2px] text-[8px] uppercase tracking-[0.2em] bg-vbase border dashed-border text-vmuted rounded-sm">
                  {link.badge}
                </span>
              </div>
              <span className="text-[11px] text-vtext/80">{link.value}</span>
            </div>

            <div className="mt-3 sm:mt-0 text-left sm:text-right flex flex-col justify-center">
              <span className="text-[10px] text-vmuted tracking-widest uppercase hidden sm:block mb-1">{link.desc}</span>
              <span className={`text-vmuted ${link.colorHover} transition-colors tracking-widest text-[10px] uppercase`}>
                [ Open Link ↗ ]
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom PGP key or something to look cool */}
      <div className="px-5 pb-5 pt-0">
        <div className="border dashed-border p-4 text-center bg-vpanel/20">
          <p className="text-[9px] text-vmuted/50 font-mono tracking-widest uppercase">
            Sys admin: N.V. Mallik Vardhan<br />
            LOC: IN · Remote / Global
          </p>
        </div>
      </div>
    </div>
  )
}
