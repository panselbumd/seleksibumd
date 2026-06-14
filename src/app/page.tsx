'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ─── Wave SVG Component ─── */
function WaveAnimation({ color = '#1E6AB5', opacity = 0.15 }: { color?: string; opacity?: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path fill={color} fillOpacity={opacity} d="M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z;
                    M0,40 C480,80 960,20 1440,50 L1440,100 L0,100 Z;
                    M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
        </path>
        <path fill={color} fillOpacity={opacity * 0.7} d="M0,70 C480,30 960,90 1440,50 L1440,100 L0,100 Z">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="M0,70 C480,30 960,90 1440,50 L1440,100 L0,100 Z;
                    M0,50 C360,90 1080,30 1440,70 L1440,100 L0,100 Z;
                    M0,70 C480,30 960,90 1440,50 L1440,100 L0,100 Z" />
        </path>
      </svg>
    </div>
  )
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setCount(Math.floor(start))
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E2E8F0' : 'none',
        transition: 'all .25s ease',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: '64px', gap: '24px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: '800', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>S</span>
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '15px', color: scrolled ? '#1E3A5F' : '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.1 }}>SIMBUBALADA</div>
            <div style={{ fontSize: '9px', color: scrolled ? '#94A3B8' : 'rgba(255,255,255,.7)', letterSpacing: '0.08em', fontWeight: '500' }}>PEMERINTAH KOTA BATU</div>
          </div>
        </Link>

        <nav style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
          {[
            ['Beranda', '/'],
            ['Profil BUMD', '/portal/profil-bumd'],
            ['Profil BLUD', '/portal/profil-blud'],
            ['Pengumuman', '/portal/pengumuman'],
            ['Jadwal', '/portal/jadwal'],
            ['FAQ', '/portal/faq'],
          ].map(([label, href]) => (
            <Link key={href} href={href} style={{
              textDecoration: 'none', fontSize: '13px', fontWeight: '500',
              padding: '6px 12px', borderRadius: '8px', transition: 'all .15s',
              color: scrolled ? '#475569' : 'rgba(255,255,255,.9)',
            }}
              className="nav-portal-link"
            >{label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/login" style={{
            textDecoration: 'none', fontSize: '13px', fontWeight: '500',
            padding: '7px 16px', borderRadius: '10px',
            border: `1px solid ${scrolled ? '#E2E8F0' : 'rgba(255,255,255,.3)'}`,
            color: scrolled ? '#475569' : '#fff',
            background: 'transparent', transition: 'all .15s',
          }}>Masuk</Link>
          <Link href="/register" style={{
            textDecoration: 'none', fontSize: '13px', fontWeight: '600',
            padding: '7px 16px', borderRadius: '10px',
            background: scrolled ? '#1E3A5F' : '#fff',
            color: scrolled ? '#fff' : '#1E3A5F',
            transition: 'all .15s',
          }}>Daftar Seleksi</Link>
        </div>
      </div>
    </header>
  )
}

/* ─── Running Text ─── */
function RunningText() {
  const items = [
    '📢 Pendaftaran Seleksi Direksi Perumdam Among Tirta Kota Batu Tahun 2025 dibuka mulai 1 Juli 2025',
    '📋 Seleksi Komisaris PT BPR Bank Batu – Berkas diterima paling lambat 15 Juli 2025',
    '✅ Pengumuman Hasil Administrasi Seleksi Dewan Pengawas BLUD RSUD Kota Batu telah terbit',
    '📅 Jadwal Wawancara KPM akan diumumkan pada 20 Juli 2025',
  ]
  return (
    <div style={{ background: '#1E3A5F', padding: '8px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '3rem', animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap', fontSize: '12px', color: '#fff' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ flexShrink: 0 }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #0D1F38 0%, #1E3A5F 40%, #1E6AB5 80%, #4E8EC7 100%)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,142,199,.3) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '-10%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,106,181,.25) 0%, transparent 70%)',
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.15)', borderRadius: '20px',
              padding: '4px 12px 4px 8px', marginBottom: '24px',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.85)', fontWeight: '500' }}>Seleksi sedang berjalan · 2025</span>
            </div>
            <h1 style={{
              fontSize: '3rem', fontWeight: '800', color: '#fff', lineHeight: 1.1,
              fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Seleksi BUMD &
              <span style={{ display: 'block', color: '#7DB3DA' }}>BLUD Kota Batu</span>
              <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '400', color: 'rgba(255,255,255,.65)', letterSpacing: '0', marginTop: '4px' }}>Transparan · Profesional · Akuntabel</span>
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '460px' }}>
              Platform seleksi terintegrasi untuk Direksi, Komisaris, dan Dewan Pengawas BUMD/BLUD Pemerintah Kota Batu. Proses digital, transparan, dan terukur.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/register" style={{
                textDecoration: 'none', padding: '12px 28px', borderRadius: '12px',
                background: '#fff', color: '#1E3A5F', fontWeight: '700', fontSize: '14px',
                boxShadow: '0 4px 24px rgba(255,255,255,.15)',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all .15s',
              }}>
                <i className="ti ti-user-plus" style={{ fontSize: '16px' }} />
                Daftar Sekarang
              </Link>
              <Link href="/portal/pengumuman" style={{
                textDecoration: 'none', padding: '12px 28px', borderRadius: '12px',
                background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)',
                color: '#fff', fontWeight: '600', fontSize: '14px',
                border: '1px solid rgba(255,255,255,.2)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <i className="ti ti-bell" style={{ fontSize: '16px' }} />
                Lihat Pengumuman
              </Link>
            </div>
          </div>

          {/* Right – Selection cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'ti-building-factory-2', title: 'Seleksi Direksi BUMD', desc: 'Direktur Utama & Direktur Perusahaan Daerah', status: 'Pendaftaran Dibuka', color: '#4E8EC7', dot: '#10B981' },
              { icon: 'ti-users', title: 'Seleksi Komisaris BUMD', desc: 'Komisaris Utama & Anggota Komisaris', status: 'Seleksi Administrasi', color: '#7DB3DA', dot: '#F59E0B' },
              { icon: 'ti-shield-check', title: 'Dewan Pengawas BUMD', desc: 'Ketua & Anggota Dewan Pengawas', status: 'Tahap UKK', color: '#B8C5D0', dot: '#3B82F6' },
              { icon: 'ti-building-hospital', title: 'Dewan Pengawas BLUD', desc: 'RSUD & Puskesmas Kota Batu', status: 'Penetapan', color: '#3EBB8F', dot: '#F97316' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,.15)', borderRadius: '16px',
                padding: '16px', display: 'flex', alignItems: 'center', gap: '14px',
                cursor: 'pointer', transition: 'all .2s',
                animation: `slideUp .5s ${i * 0.08}s both cubic-bezier(.22,1,.36,1)`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.14)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: item.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`ti ${item.icon}`} style={{ fontSize: '22px', color: item.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', marginTop: '1px' }}>{item.desc}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.dot, display: 'inline-block' }} />
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.6)', fontWeight: '500' }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WaveAnimation color="#F8FAFC" opacity={1} />
    </section>
  )
}

/* ─── Stats ─── */
function StatsSection() {
  return (
    <section style={{ background: '#F8FAFC', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E6AB5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>STATISTIK SISTEM</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Kinerja Seleksi Kota Batu</h2>
          <p style={{ color: '#64748B', marginTop: '8px', fontSize: '15px' }}>Data realtime seleksi BUMD dan BLUD Pemerintah Kota Batu</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '48px' }}>
          {[
            { value: 8, suffix: '', label: 'BUMD & BLUD', icon: 'ti-building', color: '#1E3A5F', bg: '#EBF2FA' },
            { value: 247, suffix: '+', label: 'Total Peserta', icon: 'ti-users', color: '#1E6AB5', bg: '#EBF2FA' },
            { value: 95, suffix: '%', label: 'Lulus Administrasi', icon: 'ti-check', color: '#059669', bg: '#ECFDF5' },
            { value: 12, suffix: '', label: 'Seleksi Selesai', icon: 'ti-trophy', color: '#D97706', bg: '#FFFBEB' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '20px', padding: '28px 24px',
              boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04)',
              border: '1px solid #E2E8F0', textAlign: 'center',
            }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: '26px', color: s.color }} />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: s.color, fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1 }}>
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', marginTop: '8px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* BUMD & BLUD Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* BUMD */}
          <div style={{
            background: 'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 100%)',
            borderRadius: '24px', padding: '32px', color: '#fff', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: 40, width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-building-factory-2" style={{ fontSize: '22px' }} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px', fontFamily: 'Plus Jakarta Sans' }}>Portofolio BUMD</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)' }}>Badan Usaha Milik Daerah Kota Batu</div>
              </div>
            </div>
            {[
              ['Perumdam Among Tirta', 'Perumda', 'Sehat'],
              ['PT BPR Bank Batu', 'Perseroda', 'Sehat'],
              ['PD Pasar Kota Batu', 'Perumda', 'Kurang Sehat'],
            ].map(([nama, jenis, status], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.1)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{nama}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)' }}>{jenis}</div>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px',
                  background: status === 'Sehat' ? 'rgba(16,185,129,.2)' : 'rgba(245,158,11,.2)',
                  color: status === 'Sehat' ? '#6EE7B7' : '#FCD34D',
                  border: `1px solid ${status === 'Sehat' ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)'}`,
                }}>{status}</span>
              </div>
            ))}
          </div>

          {/* BLUD */}
          <div style={{
            background: 'linear-gradient(135deg, #095330 0%, #1EA870 100%)',
            borderRadius: '24px', padding: '32px', color: '#fff', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: 40, width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-building-hospital" style={{ fontSize: '22px' }} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px', fontFamily: 'Plus Jakarta Sans' }}>Portofolio BLUD</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)' }}>Badan Layanan Umum Daerah Kota Batu</div>
              </div>
            </div>
            {[
              ['RSUD Kota Batu', 'Rumah Sakit', 'Aktif'],
              ['Puskesmas Batu', 'Puskesmas', 'Aktif'],
              ['Puskesmas Bumiaji', 'Puskesmas', 'Aktif'],
            ].map(([nama, jenis, status], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.1)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{nama}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)' }}>{jenis}</div>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px',
                  background: 'rgba(16,185,129,.25)', color: '#6EE7B7',
                  border: '1px solid rgba(16,185,129,.3)',
                }}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const steps = [
    { n: '01', icon: 'ti-user-plus', title: 'Registrasi Akun', desc: 'Buat akun peserta dengan email dan verifikasi OTP. Lengkapi profil dasar Anda.' },
    { n: '02', icon: 'ti-clipboard-list', title: 'Pilih Posisi & Daftar', desc: 'Pilih jabatan yang dilamar: Direksi, Komisaris, atau Dewan Pengawas BUMD/BLUD.' },
    { n: '03', icon: 'ti-upload', title: 'Upload Dokumen', desc: 'Unggah KTP, CV, ijazah, SKCK, surat lamaran, dan dokumen persyaratan lainnya.' },
    { n: '04', icon: 'ti-check-circle', title: 'Verifikasi Administrasi', desc: 'Panitia memverifikasi kelengkapan dan keabsahan dokumen yang Anda unggah.' },
    { n: '05', icon: 'ti-chart-bar', title: 'UKK & Wawancara', desc: 'Peserta lulus administrasi mengikuti Uji Kelayakan dan Kepatutan serta wawancara KPM.' },
    { n: '06', icon: 'ti-trophy', title: 'Penetapan & Pelantikan', desc: 'KPM menetapkan pejabat terpilih berdasarkan ranking akhir dan hasil seleksi.' },
  ]
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1EA870', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>ALUR SELEKSI</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Tahapan Seleksi Online</h2>
          <p style={{ color: '#64748B', marginTop: '8px', fontSize: '15px' }}>Proses seleksi yang transparan, terukur, dan terintegrasi</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: '20px', padding: '28px 24px',
              border: '1px solid #E2E8F0', transition: 'all .2s', cursor: 'default',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EBF2FA'; (e.currentTarget as HTMLElement).style.borderColor = '#4E8EC7'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`ti ${step.icon}`} style={{ fontSize: '22px', color: '#fff' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#CBD5E1', fontFamily: 'Plus Jakarta Sans' }}>{step.n}</span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans', marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Announcement Preview ─── */
function AnnouncementSection() {
  const items = [
    { cat: 'BUMD', title: 'Pengumuman Seleksi Direksi Perumdam Among Tirta Kota Batu', date: '15 Jun 2025', status: 'Dibuka', color: '#1E3A5F', bg: '#EBF2FA' },
    { cat: 'BUMD', title: 'Hasil Seleksi Administrasi Komisaris PT BPR Bank Batu', date: '10 Jun 2025', status: 'Selesai', color: '#059669', bg: '#ECFDF5' },
    { cat: 'BLUD', title: 'Seleksi Dewan Pengawas RSUD Kota Batu – Tahap UKK', date: '8 Jun 2025', status: 'Berlangsung', color: '#2563EB', bg: '#EFF6FF' },
  ]
  return (
    <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E6AB5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>PENGUMUMAN</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Informasi Terbaru</h2>
          </div>
          <Link href="/portal/pengumuman" style={{
            textDecoration: 'none', fontSize: '13px', fontWeight: '600',
            color: '#1E6AB5', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            Semua Pengumuman <i className="ti ti-arrow-right" />
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '16px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px',
              cursor: 'pointer', transition: 'all .15s',
              boxShadow: '0 1px 3px rgba(0,0,0,.04)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#C8DDEF' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,.04)'; (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0' }}
            >
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '8px',
                  background: item.cat === 'BUMD' ? '#EBF2FA' : '#EDFAF4',
                  color: item.cat === 'BUMD' ? '#1E3A5F' : '#0E6B44',
                }}>{item.cat}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="ti ti-calendar" style={{ fontSize: '12px' }} /> {item.date}
                </div>
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px',
                background: item.bg, color: item.color, flexShrink: 0,
              }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 60%, #3EBB8F 100%)',
          borderRadius: '28px', padding: '56px 48px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '12px', position: 'relative' }}>
            Siap Mengikuti Seleksi?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.75)', marginBottom: '32px', lineHeight: 1.7, position: 'relative' }}>
            Daftarkan diri Anda sekarang dan ikuti proses seleksi Direksi, Komisaris, atau Dewan Pengawas BUMD/BLUD Kota Batu secara online dan transparan.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', position: 'relative' }}>
            <Link href="/register" style={{
              textDecoration: 'none', padding: '13px 32px', borderRadius: '12px',
              background: '#fff', color: '#1E3A5F', fontWeight: '700', fontSize: '14px',
              boxShadow: '0 4px 24px rgba(0,0,0,.2)',
            }}>
              Daftar Peserta
            </Link>
            <Link href="/login" style={{
              textDecoration: 'none', padding: '13px 32px', borderRadius: '12px',
              background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)',
              color: '#fff', fontWeight: '600', fontSize: '14px',
              border: '1px solid rgba(255,255,255,.25)',
            }}>
              Masuk Akun
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: '#0D1F38', color: 'rgba(255,255,255,.6)', padding: '56px 24px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: '800', fontSize: '14px' }}>S</span>
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: '#fff', fontFamily: 'Plus Jakarta Sans' }}>SIMBUBALADA</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)', letterSpacing: '0.08em' }}>PEMERINTAH KOTA BATU</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7 }}>Sistem Informasi Manajemen Seleksi BUMD dan BLUD Kota Batu – Platform digital seleksi pejabat BUMD/BLUD yang transparan dan akuntabel.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', fontSize: '13px', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans' }}>Portal</h4>
            {['Beranda', 'Profil BUMD', 'Profil BLUD', 'Pengumuman', 'Jadwal Seleksi', 'FAQ'].map(l => (
              <div key={l} style={{ marginBottom: '10px' }}><Link href="#" style={{ textDecoration: 'none', fontSize: '13px', color: 'rgba(255,255,255,.55)' }}>{l}</Link></div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', fontSize: '13px', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans' }}>BUMD Kota Batu</h4>
            {['Perumdam Among Tirta', 'PT BPR Bank Batu', 'PD Pasar Kota Batu', 'PT Batu Wisata Resources'].map(l => (
              <div key={l} style={{ marginBottom: '10px' }}><Link href="#" style={{ textDecoration: 'none', fontSize: '13px', color: 'rgba(255,255,255,.55)' }}>{l}</Link></div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '600', fontSize: '13px', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans' }}>Kontak</h4>
            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}><i className="ti ti-map-pin" style={{ flexShrink: 0 }} /><span>Jl. Panglima Sudirman No.507, Kota Batu, Jawa Timur</span></div>
              <div style={{ display: 'flex', gap: '8px' }}><i className="ti ti-phone" style={{ flexShrink: 0 }} /><span>(0341) 512223</span></div>
              <div style={{ display: 'flex', gap: '8px' }}><i className="ti ti-mail" style={{ flexShrink: 0 }} /><span>bumd@batukota.go.id</span></div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px' }}>© 2025 Pemerintah Kota Batu. Hak cipta dilindungi.</span>
          <span style={{ fontSize: '12px' }}>SIMBUBALADA v2.0 · Dikembangkan oleh Tim IT Pemkot Batu</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Page ─── */
export default function PortalHomePage() {
  return (
    <div>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse  { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-portal-link:hover { background: rgba(255,255,255,.12); }
      `}</style>
      <Navbar />
      <RunningText />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <AnnouncementSection />
      <CTASection />
      <Footer />
    </div>
  )
}
