'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type TopBarProps = {
  theme:     'bumd' | 'blud'
  title:     string
  breadcrumb?: { label: string; href?: string }[]
  actions?:  React.ReactNode
}

export default function TopBar({ theme, title, breadcrumb, actions }: TopBarProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const primary = theme === 'bumd' ? '#1E3A5F' : '#0E6B44'

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      display: 'flex', alignItems: 'center', height: '56px',
      padding: '0 24px', gap: '16px',
      background: 'rgba(255,255,255,.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,.04)',
    }}>
      {/* Breadcrumb / Title */}
      <div style={{ flex: 1 }}>
        {breadcrumb && breadcrumb.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <i className="ti ti-chevron-right" style={{ fontSize: '11px', color: '#CBD5E1' }} />}
                {crumb.href
                  ? <Link href={crumb.href} style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none', fontWeight: '500' }}>{crumb.label}</Link>
                  : <span style={{ fontSize: '13px', color: primary, fontWeight: '600' }}>{crumb.label}</span>
                }
              </span>
            ))}
          </div>
        ) : (
          <h1 style={{ fontSize: '15px', fontWeight: '700', color: primary, fontFamily: 'Plus Jakarta Sans, sans-serif', margin: 0 }}>{title}</h1>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Clock */}
        <div style={{
          fontSize: '12px', color: '#64748B', fontWeight: '500',
          background: '#F8FAFC', padding: '4px 10px', borderRadius: '8px',
          border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <i className="ti ti-clock" style={{ fontSize: '12px', color: '#94A3B8' }} />
          {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
        </div>

        {/* Actions passed in */}
        {actions}

        {/* Notifications */}
        <button style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: '#F8FAFC', border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
          transition: 'all .15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F1F5F9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC' }}
        >
          <i className="ti ti-bell" style={{ fontSize: '16px', color: '#64748B' }} />
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#EF4444', border: '1.5px solid #fff',
          }} />
        </button>

        {/* Help */}
        <button style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: '#F8FAFC', border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all .15s',
        }}>
          <i className="ti ti-help-circle" style={{ fontSize: '16px', color: '#64748B' }} />
        </button>
      </div>
    </header>
  )
}
