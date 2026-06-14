'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href:    string
  icon:    string
  label:   string
  badge?:  number
  section?: string
}

type SidebarProps = {
  theme:    'bumd' | 'blud'
  role:     string
  userName: string
  userRole: string
  initials: string
  navItems: NavItem[]
  bottomItems?: NavItem[]
}

export default function AppSidebar({ theme, role, userName, userRole, initials, navItems, bottomItems = [] }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const primary   = theme === 'bumd' ? 'var(--bumd-700)' : 'var(--blud-700)'
  const primaryBg = theme === 'bumd' ? 'var(--bumd-50)'  : 'var(--blud-50)'
  const accent    = theme === 'bumd' ? 'var(--bumd-500)' : 'var(--blud-500)'
  const gradient  = theme === 'bumd'
    ? 'linear-gradient(135deg, #1E3A5F, #1E6AB5)'
    : 'linear-gradient(135deg, #0E6B44, #1EA870)'

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const sections = Array.from(new Set(navItems.map(n => n.section ?? '')))

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 40,
      width: collapsed ? '60px' : '240px',
      background: '#fff',
      borderRight: '1px solid #E2E8F0',
      boxShadow: '1px 0 8px rgba(0,0,0,.04)',
      display: 'flex', flexDirection: 'column',
      transition: 'width .25s cubic-bezier(.22,1,.36,1)',
      overflow: 'hidden',
    }}>
      {/* Logo area */}
      <div style={{
        padding: collapsed ? '16px 10px' : '16px 20px',
        display: 'flex', alignItems: 'center', gap: '10px',
        borderBottom: '1px solid #F1F5F9',
        flexShrink: 0,
      }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: '800', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>S</span>
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: '800', fontSize: '13px', color: primary, fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}>SIMBUBALADA</div>
            <div style={{ fontSize: '9px', color: '#94A3B8', letterSpacing: '0.06em', fontWeight: '500', whiteSpace: 'nowrap' }}>PEMERINTAH KOTA BATU</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
            color: '#94A3B8', padding: '4px', borderRadius: '6px', flexShrink: 0,
            transition: 'color .15s',
          }}
          title={collapsed ? 'Buka sidebar' : 'Kecilkan sidebar'}
        >
          <i className={`ti ${collapsed ? 'ti-chevrons-right' : 'ti-chevrons-left'}`} style={{ fontSize: '14px' }} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px', overflowX: 'hidden' }}>
        {sections.map(section => {
          const items = navItems.filter(n => (n.section ?? '') === section)
          return (
            <div key={section} style={{ marginBottom: '4px' }}>
              {section && !collapsed && (
                <div style={{
                  fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#CBD5E1', padding: '12px 12px 6px',
                }}>{section}</div>
              )}
              {items.map(item => {
                const active = isActive(item.href)
                return (
                  <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: collapsed ? '10px' : '9px 12px',
                      borderRadius: '10px',
                      background:  active ? primaryBg : 'transparent',
                      color:       active ? primary   : '#64748B',
                      fontWeight:  active ? '600' : '500',
                      fontSize:    '13px',
                      marginBottom: '2px',
                      transition:  'all .15s',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      position: 'relative',
                    }}
                      onMouseEnter={e => {
                        if (!active) { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; (e.currentTarget as HTMLElement).style.color = '#334155' }
                      }}
                      onMouseLeave={e => {
                        if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#64748B' }
                      }}
                    >
                      {/* Active indicator */}
                      {active && (
                        <div style={{
                          position: 'absolute', left: 0, top: '20%', bottom: '20%',
                          width: '3px', borderRadius: '0 4px 4px 0', background: accent,
                        }} />
                      )}
                      <i className={`ti ${item.icon}`} style={{ fontSize: '16px', flexShrink: 0 }} />
                      {!collapsed && (
                        <>
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                          {item.badge != null && item.badge > 0 && (
                            <span style={{
                              fontSize: '10px', fontWeight: '700', padding: '1px 6px',
                              borderRadius: '20px', background: accent, color: '#fff',
                              flexShrink: 0,
                            }}>{item.badge}</span>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Bottom items */}
      {bottomItems.length > 0 && (
        <div style={{ padding: '8px', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          {bottomItems.map(item => (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: collapsed ? '10px' : '9px 12px',
                borderRadius: '10px', color: '#64748B', fontSize: '13px', fontWeight: '500',
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'all .15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <i className={`ti ${item.icon}`} style={{ fontSize: '16px', flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* User */}
      <div style={{
        padding: collapsed ? '12px 8px' : '12px 16px',
        borderTop: '1px solid #F1F5F9', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: '10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '12px', fontWeight: '700',
        }}>{initials}</div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>{userRole}</div>
          </div>
        )}
      </div>
    </aside>
  )
}
