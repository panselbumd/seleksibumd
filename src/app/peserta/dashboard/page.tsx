'use client'
import { useState } from 'react'
import Link from 'next/link'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const PESERTA_NAV = [
  { href: '/peserta/dashboard',    icon: 'ti-layout-dashboard', label: 'Beranda',          section: 'MENU UTAMA' },
  { href: '/peserta/daftar',       icon: 'ti-user-plus',        label: 'Daftar Seleksi',   section: 'MENU UTAMA' },
  { href: '/peserta/dokumen',      icon: 'ti-upload',           label: 'Upload Dokumen',   section: 'MENU UTAMA' },
  { href: '/peserta/tracking',     icon: 'ti-timeline',         label: 'Status Seleksi',   section: 'MENU UTAMA' },
  { href: '/peserta/pengumuman',   icon: 'ti-bell',             label: 'Pengumuman',       section: 'MENU UTAMA', badge: 2 },
  { href: '/peserta/unduh',        icon: 'ti-download',         label: 'Unduh Dokumen',    section: 'MENU UTAMA' },
  { href: '/peserta/profil',       icon: 'ti-user-circle',      label: 'Profil Saya',      section: 'AKUN' },
  { href: '/peserta/ubah-sandi',   icon: 'ti-lock',             label: 'Ubah Kata Sandi',  section: 'AKUN' },
]

const BOTTOM_NAV = [
  { href: '/portal/bantuan', icon: 'ti-help-circle', label: 'Bantuan' },
  { href: '/logout',         icon: 'ti-logout',      label: 'Keluar' },
]

/* Status steps */
const STATUS_STEPS = [
  { key: 'draft',       label: 'Draft',          icon: 'ti-pencil',          desc: 'Pendaftaran tersimpan sebagai draft' },
  { key: 'menunggu',    label: 'Menunggu',        icon: 'ti-clock-hour-4',    desc: 'Menunggu verifikasi panitia' },
  { key: 'administrasi',label: 'Adm. Lulus',      icon: 'ti-check-circle',    desc: 'Lolos seleksi administrasi' },
  { key: 'ukk',         label: 'UKK',             icon: 'ti-chart-bar',       desc: 'Tahap Uji Kelayakan & Kepatutan' },
  { key: 'wawancara',   label: 'Wawancara KPM',   icon: 'ti-microphone',      desc: 'Wawancara dengan KPM' },
  { key: 'penetapan',   label: 'Penetapan',       icon: 'ti-certificate',     desc: 'Proses penetapan pejabat' },
  { key: 'selesai',     label: 'Selesai',         icon: 'ti-trophy',          desc: 'Proses seleksi telah selesai' },
]

const STATUS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  draft:        { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' },
  menunggu:     { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  administrasi: { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  ukk:          { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
  wawancara:    { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  penetapan:    { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  selesai:      { bg: '#ECFDF5', text: '#047857', border: '#6EE7B7' },
  tidaklulus:   { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_COLOR[status] ?? STATUS_COLOR.draft
  const step = STATUS_STEPS.find(s => s.key === status)
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
      background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`,
    }}>
      {step && <i className={`ti ${step.icon}`} style={{ fontSize: '12px' }} />}
      {step?.label ?? status}
    </span>
  )
}

function TrackingProgress({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus)
  const isFailed = currentStatus === 'tidaklulus'

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: '600px' }}>
        {STATUS_STEPS.map((step, i) => {
          const done    = !isFailed && i < currentIndex
          const current = !isFailed && i === currentIndex
          const isDim   = isFailed || i > currentIndex

          const dotBg = done ? '#1EA870' : current ? '#1E6AB5' : isFailed && i <= currentIndex ? '#EF4444' : '#E2E8F0'
          const dotText = done || current ? '#fff' : '#94A3B8'

          return (
            <div key={step.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {/* Connector line */}
              {i < STATUS_STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', left: '50%', top: '18px', right: '-50%', height: '2px',
                  background: done ? '#1EA870' : '#E2E8F0',
                  zIndex: 0,
                }} />
              )}
              {/* Dot */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: dotBg, color: dotText,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', position: 'relative', zIndex: 1,
                boxShadow: current ? `0 0 0 4px rgba(30,106,181,.15)` : 'none',
                transition: 'all .2s',
                border: `2px solid ${done ? '#1EA870' : current ? '#1E6AB5' : '#E2E8F0'}`,
              }}>
                {done
                  ? <i className="ti ti-check" style={{ fontSize: '16px' }} />
                  : <i className={`ti ${step.icon}`} style={{ fontSize: '15px' }} />
                }
              </div>
              {/* Label */}
              <div style={{
                marginTop: '8px', textAlign: 'center',
                fontSize: '10px', fontWeight: current ? '700' : '500',
                color: current ? '#1E6AB5' : done ? '#1EA870' : '#94A3B8',
              }}>{step.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DocumentChecklist() {
  const docs = [
    { label: 'KTP',              uploaded: true,  required: true },
    { label: 'Curriculum Vitae', uploaded: true,  required: true },
    { label: 'Ijazah Terakhir',  uploaded: true,  required: true },
    { label: 'Pas Foto 4×6',     uploaded: false, required: true },
    { label: 'NPWP',             uploaded: true,  required: true },
    { label: 'Surat Lamaran',    uploaded: false, required: true },
    { label: 'SKCK',             uploaded: false, required: true },
    { label: 'Surat Kesehatan',  uploaded: false, required: true },
    { label: 'Sertifikat Kompetensi', uploaded: false, required: false },
  ]
  const total    = docs.filter(d => d.required).length
  const uploaded = docs.filter(d => d.required && d.uploaded).length
  const pct      = Math.round(uploaded / total * 100)

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Kelengkapan Dokumen</span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: pct === 100 ? '#059669' : '#D97706' }}>{pct}%</span>
      </div>
      <div className="card-body">
        {/* Progress bar */}
        <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '4px', marginBottom: '16px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`, borderRadius: '4px',
            background: pct === 100 ? '#10B981' : 'linear-gradient(90deg, #1E6AB5, #4E8EC7)',
            transition: 'width .5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {docs.map((doc, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: '10px',
              background: doc.uploaded ? '#ECFDF5' : doc.required ? '#FEF9EC' : '#F8FAFC',
              border: `1px solid ${doc.uploaded ? '#A7F3D0' : doc.required ? '#FDE68A' : '#E2E8F0'}`,
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                background: doc.uploaded ? '#10B981' : doc.required ? '#F59E0B' : '#E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`ti ${doc.uploaded ? 'ti-check' : doc.required ? 'ti-alert-triangle' : 'ti-minus'}`}
                  style={{ fontSize: '11px', color: '#fff' }} />
              </div>
              <span style={{ flex: 1, fontSize: '12px', fontWeight: '500', color: doc.uploaded ? '#065F46' : '#92400E' }}>
                {doc.label} {!doc.required && <span style={{ fontSize: '10px', color: '#94A3B8' }}>(opsional)</span>}
              </span>
              {!doc.uploaded && (
                <Link href="/peserta/dokumen" style={{
                  textDecoration: 'none', fontSize: '10px', fontWeight: '600',
                  color: '#1E6AB5', display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  Upload <i className="ti ti-arrow-right" style={{ fontSize: '10px' }} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JadwalCard() {
  const jadwal = [
    { tanggal: '20 Jul 2025', kegiatan: 'Pengumuman Hasil Administrasi', status: 'Akan Datang' },
    { tanggal: '25 Jul 2025', kegiatan: 'Pelaksanaan Psikotes', status: 'Akan Datang' },
    { tanggal: '28 Jul 2025', kegiatan: 'Tes Tulis (Pengetahuan)', status: 'Akan Datang' },
    { tanggal: '1 Agu 2025', kegiatan: 'Paparan Makalah', status: 'Akan Datang' },
    { tanggal: '5 Agu 2025', kegiatan: 'Wawancara KPM', status: 'Akan Datang' },
  ]

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Jadwal Tahapan</span>
        <Link href="/portal/jadwal" style={{ fontSize: '12px', color: '#1E6AB5', textDecoration: 'none' }}>Lihat semua</Link>
      </div>
      <div style={{ padding: '8px 0' }}>
        {jadwal.map((j, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 20px', borderBottom: i < jadwal.length - 1 ? '1px solid #F1F5F9' : 'none',
          }}>
            <div style={{
              width: '44px', flexShrink: 0, textAlign: 'center',
              padding: '6px 0', borderRadius: '8px',
              background: '#EBF2FA',
            }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#1E3A5F', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>
                {j.tanggal.split(' ')[0]}
              </div>
              <div style={{ fontSize: '9px', color: '#4E8EC7', fontWeight: '600', marginTop: '2px' }}>
                {j.tanggal.split(' ')[1]}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E293B' }}>{j.kegiatan}</div>
              <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '1px' }}>{j.tanggal}</div>
            </div>
            <span style={{
              fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '8px',
              background: '#FFF8E1', color: '#D97706', border: '1px solid #FDE68A',
            }}>{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PengumumanCard() {
  const items = [
    { title: 'Perpanjangan Batas Upload Dokumen', date: '12 Jun 2025', type: 'info' },
    { title: 'Pengumuman Jadwal Psikotes', date: '10 Jun 2025', type: 'success' },
    { title: 'Perubahan Lokasi Wawancara', date: '8 Jun 2025', type: 'warn' },
  ]
  const typeIcon: Record<string, { icon: string; color: string; bg: string }> = {
    info:    { icon: 'ti-info-circle',    color: '#2563EB', bg: '#EFF6FF' },
    success: { icon: 'ti-check-circle',   color: '#059669', bg: '#ECFDF5' },
    warn:    { icon: 'ti-alert-triangle', color: '#D97706', bg: '#FFFBEB' },
  }
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Pengumuman Terbaru</span>
        <span style={{
          fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px',
          background: '#EF4444', color: '#fff',
        }}>2 Baru</span>
      </div>
      <div style={{ padding: '8px 0' }}>
        {items.map((item, i) => {
          const cfg = typeIcon[item.type]
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: '12px 20px', borderBottom: i < items.length - 1 ? '1px solid #F1F5F9' : 'none',
              cursor: 'pointer',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`ti ${cfg.icon}`} style={{ fontSize: '16px', color: cfg.color }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E293B' }}>{item.title}</div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="ti ti-calendar" style={{ fontSize: '10px' }} /> {item.date}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PesertaDashboard() {
  const currentStatus = 'menunggu'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      <AppSidebar
        theme="bumd"
        role="peserta"
        userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi"
        initials="BS"
        navItems={PESERTA_NAV}
        bottomItems={BOTTOM_NAV}
      />

      <main style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          theme="bumd"
          title="Dashboard Peserta"
          breadcrumb={[{ label: 'Portal Peserta', href: '/peserta' }, { label: 'Beranda' }]}
        />

        <div style={{ padding: '24px', flex: 1 }}>

          {/* Hero greeting */}
          <div style={{
            background: 'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 100%)',
            borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
            color: '#fff', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
            <div style={{ position: 'absolute', bottom: -40, right: 80, width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.65)', marginBottom: '4px' }}>{greeting},</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Plus Jakarta Sans', margin: '0 0 6px' }}>Budi Santoso, S.E., M.M.</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StatusBadge status={currentStatus} />
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)' }}>Seleksi Direksi Perumdam Among Tirta · 2025</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)' }}>
                  {now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '300', marginTop: '4px' }}>
                  {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </div>
              </div>
            </div>
          </div>

          {/* Status Tracking */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <span className="card-title">Progress Seleksi Saya</span>
              <Link href="/peserta/tracking" style={{ fontSize: '12px', color: '#1E6AB5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Detail <i className="ti ti-arrow-right" style={{ fontSize: '12px' }} />
              </Link>
            </div>
            <div className="card-body">
              <TrackingProgress currentStatus={currentStatus} />
              <div style={{
                marginTop: '16px', padding: '12px 16px', borderRadius: '12px',
                background: '#FFFBEB', border: '1px solid #FDE68A',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <i className="ti ti-info-circle" style={{ fontSize: '18px', color: '#D97706', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400E' }}>Menunggu Verifikasi Administrasi</div>
                  <div style={{ fontSize: '11px', color: '#B45309', marginTop: '2px' }}>Dokumen Anda sedang diperiksa oleh panitia. Pastikan semua dokumen telah diunggah dengan benar.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { href: '/peserta/dokumen',   icon: 'ti-upload',     label: 'Upload Dokumen', desc: '4 perlu diunggah', color: '#1E6AB5', bg: '#EBF2FA' },
              { href: '/peserta/tracking',  icon: 'ti-timeline',   label: 'Tracking',       desc: 'Menunggu verifikasi', color: '#D97706', bg: '#FFFBEB' },
              { href: '/peserta/pengumuman',icon: 'ti-bell',       label: 'Pengumuman',     desc: '2 belum dibaca', color: '#7C3AED', bg: '#F5F3FF' },
              { href: '/peserta/unduh',     icon: 'ti-download',   label: 'Unduh Berkas',   desc: 'Kartu peserta', color: '#059669', bg: '#ECFDF5' },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', borderRadius: '16px', padding: '20px 16px',
                  border: '1px solid #E2E8F0', cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                  transition: 'all .15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <i className={`ti ${item.icon}`} style={{ fontSize: '20px', color: item.color }} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <DocumentChecklist />
            <JadwalCard />
          </div>

          <PengumumanCard />
        </div>
      </main>
    </div>
  )
}
