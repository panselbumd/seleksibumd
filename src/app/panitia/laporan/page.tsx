'use client'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/panitia/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',           section:'MENU UTAMA' },
  { href:'/panitia/verifikasi', icon:'ti-clipboard-check',  label:'Verifikasi Adm.',   section:'MENU UTAMA', badge:3 },
  { href:'/panitia/peserta',    icon:'ti-users',            label:'Manajemen Peserta', section:'MENU UTAMA' },
  { href:'/panitia/jadwal',     icon:'ti-calendar-event',   label:'Jadwal Seleksi',    section:'MENU UTAMA' },
  { href:'/panitia/pengumuman', icon:'ti-speakerphone',     label:'Pengumuman',        section:'MENU UTAMA' },
  { href:'/panitia/dokumen',    icon:'ti-file-description', label:'Generate Dokumen',  section:'MENU UTAMA' },
  { href:'/panitia/laporan',    icon:'ti-report',           label:'Laporan',           section:'LAPORAN' },
  { href:'/panitia/berita-acara',icon:'ti-writing',         label:'Berita Acara',      section:'LAPORAN' },
]

const AUDIT = [
  { aksi:'Verifikasi dokumen Dr. Ahmad Fauzi – LULUS',         user:'Sekretaris Sari Dewi', waktu:'13 Jun 2025 09:15', ip:'192.168.1.10', modul:'Verifikasi', tipe:'success' },
  { aksi:'Peserta Budi Hartoyo upload dokumen SKCK',            user:'Sistem',               waktu:'13 Jun 2025 08:55', ip:'103.21.45.12', modul:'Upload',     tipe:'info'    },
  { aksi:'Pengumuman jadwal UKK diterbitkan',                   user:'Ketua Pansel Hartono',  waktu:'12 Jun 2025 16:00', ip:'192.168.1.5',  modul:'Pengumuman', tipe:'success' },
  { aksi:'Tolak dokumen Drs. Hendra Wijaya – NPWP tidak valid', user:'Sekretaris Sari Dewi', waktu:'12 Jun 2025 14:30', ip:'192.168.1.10', modul:'Verifikasi', tipe:'warning' },
  { aksi:'Jadwal Psikotes ditambahkan',                         user:'Admin Rudi',           waktu:'12 Jun 2025 10:00', ip:'192.168.1.8',  modul:'Jadwal',     tipe:'info'    },
  { aksi:'Seleksi baru dibuat: Dewan Pengawas BLUD',            user:'Admin Rudi',           waktu:'11 Jun 2025 09:00', ip:'192.168.1.8',  modul:'Seleksi',    tipe:'info'    },
  { aksi:'Peserta Dewi Rahayu dinyatakan LULUS administrasi',   user:'Sekretaris Sari Dewi', waktu:'11 Jun 2025 14:20', ip:'192.168.1.10', modul:'Verifikasi', tipe:'success' },
]
const TC: Record<string,{bg:string;color:string;icon:string}> = {
  success:{bg:'#ECFDF5',color:'#059669',icon:'ti-check'},
  info:   {bg:'#EFF6FF',color:'#2563EB',icon:'ti-info-circle'},
  warning:{bg:'#FFFBEB',color:'#D97706',icon:'ti-alert-triangle'},
  error:  {bg:'#FEF2F2',color:'#DC2626',icon:'ti-x'},
}

const REKAP = [
  {label:'Total Peserta Mendaftar', val:247, color:'#1E3A5F', bg:'#EBF2FA', icon:'ti-users'},
  {label:'Lulus Administrasi',      val:198, color:'#059669', bg:'#ECFDF5', icon:'ti-check-circle'},
  {label:'Tidak Lulus Adm.',        val:25,  color:'#DC2626', bg:'#FEF2F2', icon:'ti-x-circle'},
  {label:'Menunggu Verifikasi',     val:24,  color:'#D97706', bg:'#FFFBEB', icon:'ti-clock'},
  {label:'Peserta UKK',            val:23,  color:'#2563EB', bg:'#EFF6FF', icon:'ti-chart-bar'},
  {label:'Seleksi Aktif',          val:4,   color:'#7C3AED', bg:'#F5F3FF', icon:'ti-building'},
]

export default function LaporanPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Ketua Pansel"
        userRole="Ketua Panitia" initials="KP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Laporan & Audit Trail"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Laporan'}]}
          actions={
            <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-download" style={{fontSize:'13px'}} /> Export Laporan
            </button>
          }
        />
        <div style={{padding:'24px'}}>

          {/* Rekap stat */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',marginBottom:'24px'}}>
            {REKAP.map((s,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'18px 20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,.04)',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'13px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <i className={`ti ${s.icon}`} style={{fontSize:'22px',color:s.color}} />
                </div>
                <div>
                  <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
                  <div style={{fontSize:'2rem',fontWeight:'900',color:s.color,fontFamily:'Plus Jakarta Sans',lineHeight:1.1,marginTop:'3px'}}>{s.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress per seleksi */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'20px',marginBottom:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px'}}>Progress Seleksi per BUMD/BLUD</div>
            {[
              {nama:'Seleksi Direksi Perumdam Among Tirta', tahap:'Administrasi', total:32, lulus:28, pct:87, color:'#1E6AB5'},
              {nama:'Seleksi Komisaris PT BPR Bank Batu',   tahap:'UKK',          total:15, lulus:15, pct:100,color:'#7C3AED'},
              {nama:'Seleksi Dewan Pengawas RSUD',          tahap:'Wawancara',    total:8,  lulus:5,  pct:62, color:'#D97706'},
              {nama:'Seleksi Dewan Pengawas Puskesmas',     tahap:'Penetapan',    total:4,  lulus:4,  pct:100,color:'#059669'},
            ].map((s,i)=>(
              <div key={i} style={{marginBottom:i<3?'16px':'0'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                  <div>
                    <span style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{s.nama}</span>
                    <span style={{marginLeft:'8px',fontSize:'11px',fontWeight:'600',padding:'2px 7px',borderRadius:'6px',background:s.color+'15',color:s.color}}>{s.tahap}</span>
                  </div>
                  <span style={{fontSize:'13px',fontWeight:'800',color:s.color,fontFamily:'Plus Jakarta Sans'}}>{s.pct}%</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{flex:1,height:'8px',background:'#F1F5F9',borderRadius:'6px',overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${s.pct}%`,background:`linear-gradient(90deg,${s.color},${s.color}aa)`,borderRadius:'6px',transition:'width .6s ease'}} />
                  </div>
                  <span style={{fontSize:'11px',color:'#94A3B8',flexShrink:0}}>{s.lulus}/{s.total} peserta</span>
                </div>
              </div>
            ))}
          </div>

          {/* Audit trail table */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#F8FAFC'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Audit Trail Aktivitas Sistem</span>
              <span style={{fontSize:'12px',color:'#94A3B8'}}>{AUDIT.length} entri terbaru</span>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    {['Waktu','Aktivitas','Pengguna','Modul','IP Address'].map(h=>(
                      <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AUDIT.map((a,i)=>{
                    const cfg = TC[a.tipe]
                    return (
                      <tr key={i} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F8FAFC'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff'}}>
                        <td style={{padding:'11px 16px',fontSize:'11px',color:'#94A3B8',borderBottom:'1px solid #F1F5F9',whiteSpace:'nowrap'}}>{a.waktu}</td>
                        <td style={{padding:'11px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                            <div style={{width:'26px',height:'26px',borderRadius:'7px',background:cfg.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                              <i className={`ti ${cfg.icon}`} style={{fontSize:'13px',color:cfg.color}} />
                            </div>
                            <span style={{fontSize:'12px',color:'#1E293B'}}>{a.aksi}</span>
                          </div>
                        </td>
                        <td style={{padding:'11px 16px',fontSize:'12px',color:'#475569',borderBottom:'1px solid #F1F5F9',whiteSpace:'nowrap'}}>{a.user}</td>
                        <td style={{padding:'11px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'11px',fontWeight:'600',padding:'2px 8px',borderRadius:'6px',background:'#F1F5F9',color:'#64748B'}}>{a.modul}</span>
                        </td>
                        <td style={{padding:'11px 16px',fontSize:'11px',color:'#94A3B8',borderBottom:'1px solid #F1F5F9',fontFamily:'JetBrains Mono,monospace'}}>{a.ip}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
