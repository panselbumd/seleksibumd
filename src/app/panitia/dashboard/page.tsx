'use client'
import { useState } from 'react'
import Link from 'next/link'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const PANITIA_NAV = [
  { href: '/panitia/dashboard',    icon: 'ti-layout-dashboard', label: 'Beranda',           section: 'MENU UTAMA' },
  { href: '/panitia/verifikasi',   icon: 'ti-clipboard-check',  label: 'Verifikasi Adm.',   section: 'MENU UTAMA', badge: 12 },
  { href: '/panitia/peserta',      icon: 'ti-users',            label: 'Manajemen Peserta', section: 'MENU UTAMA' },
  { href: '/panitia/jadwal',       icon: 'ti-calendar-event',   label: 'Jadwal Seleksi',    section: 'MENU UTAMA' },
  { href: '/panitia/pengumuman',   icon: 'ti-speakerphone',     label: 'Pengumuman',        section: 'MENU UTAMA' },
  { href: '/panitia/dokumen',      icon: 'ti-file-description', label: 'Generate Dokumen',  section: 'MENU UTAMA' },
  { href: '/panitia/laporan',      icon: 'ti-report',           label: 'Laporan',           section: 'LAPORAN' },
  { href: '/panitia/berita-acara', icon: 'ti-writing',          label: 'Berita Acara',      section: 'LAPORAN' },
  { href: '/panitia/pengaturan',   icon: 'ti-settings',         label: 'Pengaturan',        section: 'SISTEM' },
]

function StatCard({ icon, label, value, sub, color, bg, trend }: {
  icon: string; label: string; value: string|number; sub?: string;
  color: string; bg: string; trend?: { val: number; up: boolean }
}) {
  return (
    <div style={{
      background:'#fff', borderRadius:'18px', padding:'20px 22px',
      border:'1px solid #E2E8F0',
      boxShadow:'0 1px 3px rgba(0,0,0,.05), 0 4px 12px rgba(0,0,0,.04)',
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:'11px', fontWeight:'600', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</div>
          <div style={{ fontSize:'2rem', fontWeight:'800', color, fontFamily:'Plus Jakarta Sans, sans-serif', lineHeight:1.1, marginTop:'6px' }}>{value}</div>
          {sub && <div style={{ fontSize:'11px', color:'#94A3B8', marginTop:'4px' }}>{sub}</div>}
          {trend && (
            <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'6px' }}>
              <i className={`ti ${trend.up ? 'ti-trending-up' : 'ti-trending-down'}`}
                style={{ fontSize:'13px', color: trend.up ? '#10B981' : '#EF4444' }} />
              <span style={{ fontSize:'11px', fontWeight:'600', color: trend.up ? '#10B981' : '#EF4444' }}>
                {trend.val}% dari minggu lalu
              </span>
            </div>
          )}
        </div>
        <div style={{ width:'46px', height:'46px', borderRadius:'14px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <i className={`ti ${icon}`} style={{ fontSize:'22px', color }} />
        </div>
      </div>
    </div>
  )
}

export default function PanitiaDashboard() {
  const now = new Date()
  const peserta = [
    { nama:'Dr. Ahmad Fauzi, M.Kes.',  jabatan:'Direksi – Perumdam Among Tirta', daftar:'10 Jun 2025', verified:6, total:8, status:'review' },
    { nama:'Ir. Dewi Rahayu, M.T.',    jabatan:'Komisaris – PT BPR Bank Batu',   daftar:'11 Jun 2025', verified:8, total:8, status:'ready' },
    { nama:'Drs. Hendra Wijaya',       jabatan:'Dewan Pengawas – PD Pasar',      daftar:'11 Jun 2025', verified:5, total:8, status:'incomplete' },
    { nama:'Siti Nurhaliza, S.E., MM.',jabatan:'Direksi – Perumdam Among Tirta', daftar:'12 Jun 2025', verified:8, total:8, status:'ready' },
    { nama:'Budi Hartoyo, S.H.',       jabatan:'Komisaris – PT BPR Bank Batu',   daftar:'12 Jun 2025', verified:3, total:8, status:'review' },
  ]
  const statusCfg: Record<string, { bg:string; color:string; label:string }> = {
    ready:      { bg:'#ECFDF5', color:'#059669', label:'Siap Verifikasi' },
    review:     { bg:'#FFFBEB', color:'#D97706', label:'Perlu Review' },
    incomplete: { bg:'#FEF2F2', color:'#DC2626', label:'Tidak Lengkap' },
  }
  const tahapan = [
    { seleksi:'Direksi Perumdam Among Tirta',  tahap:'Administrasi', peserta:32, lulus:28, progress:87, color:'#1E6AB5' },
    { seleksi:'Komisaris PT BPR Bank Batu',    tahap:'UKK',          peserta:15, lulus:15, progress:100, color:'#7C3AED' },
    { seleksi:'Dewan Pengawas RSUD Kota Batu', tahap:'Wawancara',    peserta:8,  lulus:5,  progress:63,  color:'#D97706' },
    { seleksi:'Dewan Pengawas Puskesmas',      tahap:'Penetapan',    peserta:3,  lulus:3,  progress:100, color:'#059669' },
  ]
  const logs = [
    { icon:'ti-check',       color:'#059669', desc:'Verifikasi dokumen Dr. Ahmad Fauzi – Lulus',         user:'Sekretaris Sari', time:'5 menit lalu' },
    { icon:'ti-upload',      color:'#1E6AB5', desc:'Budi Hartoyo upload SKCK',                           user:'Peserta',         time:'12 menit lalu' },
    { icon:'ti-speakerphone',color:'#7C3AED', desc:'Pengumuman jadwal UKK diterbitkan',                  user:'Ketua Pansel',    time:'1 jam lalu' },
    { icon:'ti-x',           color:'#EF4444', desc:'Dokumen Drs. Hendra ditolak – surat tidak valid',    user:'Sekretaris Sari', time:'2 jam lalu' },
    { icon:'ti-plus',        color:'#D97706', desc:'Seleksi baru dibuat: Dewan Pengawas BLUD',           user:'Admin',           time:'3 jam lalu' },
  ]

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F8FAFC' }}>
      <AppSidebar theme="bumd" role="panitia" userName="Kepala Bagian Seleksi"
        userRole="Ketua Panitia Seleksi" initials="KP" navItems={PANITIA_NAV}
        bottomItems={[{ href:'/dashboard', icon:'ti-home', label:'Beranda Sistem' },{ href:'/logout', icon:'ti-logout', label:'Keluar' }]} />

      <main style={{ marginLeft:'240px', flex:1, display:'flex', flexDirection:'column' }}>
        <TopBar theme="bumd" title="Dashboard Panitia"
          breadcrumb={[{ label:'Panitia Seleksi' },{ label:'Beranda' }]}
          actions={
            <Link href="/panitia/verifikasi" style={{ textDecoration:'none', fontSize:'12px', fontWeight:'600',
              padding:'6px 14px', borderRadius:'8px', background:'#1E3A5F', color:'#fff',
              display:'flex', alignItems:'center', gap:'5px' }}>
              <i className="ti ti-clipboard-check" style={{ fontSize:'13px' }} />
              Verifikasi
              <span style={{ fontSize:'10px', fontWeight:'700', padding:'0 5px', background:'#EF4444', borderRadius:'10px' }}>12</span>
            </Link>
          }
        />

        <div style={{ padding:'24px', flex:1 }}>
          {/* Header banner */}
          <div style={{
            background:'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 100%)',
            borderRadius:'20px', padding:'22px 28px', marginBottom:'20px',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:-30, right:-30, width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
            <div style={{ position:'relative' }}>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,.65)', marginBottom:'4px' }}>
                {now.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
              </div>
              <h1 style={{ fontSize:'1.4rem', fontWeight:'800', color:'#fff', fontFamily:'Plus Jakarta Sans', margin:0 }}>
                Portal Panitia Seleksi SIMBUBALADA
              </h1>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,.65)', marginTop:'4px' }}>
                Seleksi BUMD dan BLUD Pemerintah Kota Batu · Periode 2025
              </p>
            </div>
            <div style={{ display:'flex', gap:'10px', position:'relative' }}>
              <button style={{ padding:'8px 16px', borderRadius:'10px', fontSize:'12px', fontWeight:'600',
                background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)', color:'#fff',
                border:'1px solid rgba(255,255,255,.2)', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'5px' }}>
                <i className="ti ti-file-plus" style={{ fontSize:'14px' }} /> Seleksi Baru
              </button>
              <button style={{ padding:'8px 16px', borderRadius:'10px', fontSize:'12px', fontWeight:'600',
                background:'#fff', color:'#1E3A5F', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'5px' }}>
                <i className="ti ti-download" style={{ fontSize:'14px' }} /> Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'14px', marginBottom:'20px' }}>
            <StatCard icon="ti-users"           label="Total Peserta"      value={247} sub="3 posisi aktif"        color="#1E3A5F" bg="#EBF2FA" trend={{ val:12, up:true }} />
            <StatCard icon="ti-clipboard-check" label="Antrian Verifikasi"  value={12}  sub="Perlu ditinjau"        color="#D97706" bg="#FFFBEB" />
            <StatCard icon="ti-check-circle"    label="Lulus Administrasi"  value={198} sub="80% dari total"        color="#059669" bg="#ECFDF5" />
            <StatCard icon="ti-x-circle"        label="Tidak Lulus Adm."    value={25}  sub="Berkas tidak lengkap"  color="#DC2626" bg="#FEF2F2" />
            <StatCard icon="ti-chart-bar"       label="Tahap UKK"           value={23}  sub="Sedang berjalan"       color="#7C3AED" bg="#F5F3FF" />
          </div>

          {/* Main grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'16px', marginBottom:'16px' }}>
            {/* Antrian Verifikasi */}
            <div style={{ background:'#fff', borderRadius:'18px', border:'1px solid #E2E8F0', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <span style={{ fontSize:'14px', fontWeight:'700', color:'#1E293B', fontFamily:'Plus Jakarta Sans' }}>Antrian Verifikasi</span>
                  <span style={{ marginLeft:'8px', fontSize:'11px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px', background:'#EF4444', color:'#fff' }}>12 baru</span>
                </div>
                <Link href="/panitia/verifikasi" style={{ textDecoration:'none', fontSize:'12px', color:'#1E6AB5', fontWeight:'600' }}>
                  Lihat Semua →
                </Link>
              </div>
              {peserta.map((p, i) => {
                const cfg = statusCfg[p.status]
                const pct = Math.round(p.verified / p.total * 100)
                const initials = p.nama.replace(/[.,]/g,'').split(' ').filter(w => !['Dr','Ir','Drs','MM','SE','SH'].includes(w)).slice(0,2).map(w => w[0]).join('')
                return (
                  <div key={i} style={{ padding:'14px 20px', borderBottom: i < peserta.length-1 ? '1px solid #F8FAFC' : 'none',
                    display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', transition:'background .1s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <div style={{ width:'38px', height:'38px', borderRadius:'12px', flexShrink:0,
                      background:'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontSize:'13px', fontWeight:'700' }}>
                      {initials.toUpperCase()}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'13px', fontWeight:'600', color:'#1E293B', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.nama}</div>
                      <div style={{ fontSize:'11px', color:'#94A3B8', marginTop:'2px' }}>{p.jabatan}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'6px' }}>
                        <div style={{ flex:1, height:'4px', background:'#F1F5F9', borderRadius:'4px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${pct}%`, background: pct === 100 ? '#10B981' : '#4E8EC7', borderRadius:'4px' }} />
                        </div>
                        <span style={{ fontSize:'10px', color:'#94A3B8' }}>{p.verified}/{p.total}</span>
                      </div>
                    </div>
                    <div style={{ flexShrink:0, textAlign:'right' }}>
                      <span style={{ fontSize:'10px', fontWeight:'600', padding:'3px 10px', borderRadius:'20px', background:cfg.bg, color:cfg.color }}>
                        {cfg.label}
                      </span>
                      <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'4px' }}>{p.daftar}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tahapan Aktif */}
            <div style={{ background:'#fff', borderRadius:'18px', border:'1px solid #E2E8F0', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid #F1F5F9' }}>
                <span style={{ fontSize:'14px', fontWeight:'700', color:'#1E293B', fontFamily:'Plus Jakarta Sans' }}>Proses Seleksi Aktif</span>
              </div>
              <div style={{ padding:'8px 0' }}>
                {tahapan.map((t, i) => (
                  <div key={i} style={{ padding:'14px 20px', borderBottom: i < tahapan.length-1 ? '1px solid #F8FAFC' : 'none' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'8px' }}>
                      <div>
                        <div style={{ fontSize:'12px', fontWeight:'600', color:'#1E293B' }}>{t.seleksi}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'3px' }}>
                          <span style={{ fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'6px', background:t.color+'15', color:t.color }}>
                            {t.tahap}
                          </span>
                          <span style={{ fontSize:'10px', color:'#94A3B8' }}>{t.peserta} peserta</span>
                        </div>
                      </div>
                      <span style={{ fontSize:'13px', fontWeight:'800', color:t.color, fontFamily:'Plus Jakarta Sans' }}>{t.progress}%</span>
                    </div>
                    <div style={{ height:'5px', background:'#F1F5F9', borderRadius:'4px', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${t.progress}%`, background:t.color, borderRadius:'4px' }} />
                    </div>
                    <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'4px' }}>{t.lulus}/{t.peserta} lolos</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {/* Log */}
            <div style={{ background:'#fff', borderRadius:'18px', border:'1px solid #E2E8F0', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'14px', fontWeight:'700', color:'#1E293B', fontFamily:'Plus Jakarta Sans' }}>Log Aktivitas</span>
                <Link href="/panitia/laporan" style={{ textDecoration:'none', fontSize:'12px', color:'#1E6AB5', fontWeight:'600' }}>Audit Trail</Link>
              </div>
              {logs.map((l, i) => (
                <div key={i} style={{ padding:'12px 20px', borderBottom: i < logs.length-1 ? '1px solid #F8FAFC' : 'none',
                  display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{ width:'30px', height:'30px', borderRadius:'8px', flexShrink:0,
                    background:l.color+'15', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <i className={`ti ${l.icon}`} style={{ fontSize:'14px', color:l.color }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'12px', color:'#1E293B', fontWeight:'500', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.desc}</div>
                    <div style={{ fontSize:'10px', color:'#94A3B8', marginTop:'2px' }}>{l.user} · {l.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ background:'#fff', borderRadius:'18px', border:'1px solid #E2E8F0', padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize:'14px', fontWeight:'700', color:'#1E293B', fontFamily:'Plus Jakarta Sans', marginBottom:'16px' }}>Aksi Cepat</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {[
                  { href:'/panitia/verifikasi',   icon:'ti-clipboard-check', label:'Verifikasi Adm.',  color:'#1E3A5F', bg:'#EBF2FA' },
                  { href:'/panitia/pengumuman',   icon:'ti-speakerphone',    label:'Buat Pengumuman', color:'#7C3AED', bg:'#F5F3FF' },
                  { href:'/panitia/dokumen',      icon:'ti-file-description',label:'Generate Dokumen',color:'#059669', bg:'#ECFDF5' },
                  { href:'/panitia/jadwal',       icon:'ti-calendar-event',  label:'Atur Jadwal',     color:'#D97706', bg:'#FFFBEB' },
                  { href:'/panitia/berita-acara', icon:'ti-writing',         label:'Berita Acara',    color:'#DC2626', bg:'#FEF2F2' },
                  { href:'/panitia/laporan',      icon:'ti-report',          label:'Laporan Seleksi', color:'#0891B2', bg:'#ECFEFF' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'14px', borderRadius:'12px', border:'1px solid #E2E8F0',
                      display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', transition:'all .15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = item.bg; (e.currentTarget as HTMLElement).style.borderColor = item.color+'40'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                    >
                      <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <i className={`ti ${item.icon}`} style={{ fontSize:'16px', color:item.color }} />
                      </div>
                      <span style={{ fontSize:'12px', fontWeight:'600', color:'#1E293B' }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
