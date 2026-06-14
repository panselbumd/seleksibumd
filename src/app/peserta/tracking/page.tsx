'use client'
import Link from 'next/link'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/peserta/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',        section:'MENU UTAMA' },
  { href:'/peserta/daftar',     icon:'ti-user-plus',        label:'Daftar Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/dokumen',    icon:'ti-upload',           label:'Upload Dokumen', section:'MENU UTAMA' },
  { href:'/peserta/tracking',   icon:'ti-timeline',         label:'Status Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/pengumuman', icon:'ti-bell',             label:'Pengumuman',     section:'MENU UTAMA', badge:2 },
  { href:'/peserta/unduh',      icon:'ti-download',         label:'Unduh Dokumen',  section:'MENU UTAMA' },
  { href:'/peserta/profil',     icon:'ti-user-circle',      label:'Profil Saya',    section:'AKUN' },
]
const STEPS = [
  { label:'Pendaftaran',     desc:'Isi formulir & upload dokumen',       done:true,  active:false, tgl:'12 Jun 2025' },
  { label:'Verifikasi Adm.', desc:'Panitia memeriksa kelengkapan berkas', done:false, active:true,  tgl:'16–20 Jun 2025' },
  { label:'Seleksi UKK',     desc:'Psikotes, tes tulis, paparan makalah', done:false, active:false, tgl:'25 Jun 2025' },
  { label:'Wawancara KPM',   desc:'Wawancara dengan Komite Pemangku',     done:false, active:false, tgl:'5 Jul 2025' },
  { label:'Penetapan',       desc:'Keputusan penetapan oleh KPM/RUPS',   done:false, active:false, tgl:'10 Jul 2025' },
  { label:'Selesai',         desc:'Proses seleksi telah selesai',         done:false, active:false, tgl:'12 Jul 2025' },
]
const HISTORY = [
  { tgl:'12 Jun 2025 09:15', aksi:'Akun peserta berhasil dibuat',          type:'success', icon:'ti-user-check' },
  { tgl:'12 Jun 2025 10:30', aksi:'Formulir pendaftaran berhasil disubmit', type:'success', icon:'ti-clipboard-check' },
  { tgl:'12 Jun 2025 11:00', aksi:'Upload 4 dari 8 dokumen wajib',          type:'warning', icon:'ti-upload' },
  { tgl:'13 Jun 2025 08:00', aksi:'Menunggu verifikasi panitia seleksi',    type:'pending', icon:'ti-clock-hour-4' },
]
const TC: Record<string,{bg:string;color:string}> = {
  success:{bg:'#ECFDF5',color:'#059669'},pending:{bg:'#F5F3FF',color:'#7C3AED'},
  warning:{bg:'#FFFBEB',color:'#D97706'},info:{bg:'#EFF6FF',color:'#2563EB'},
}
export default function TrackingPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Status Seleksi"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Status Seleksi'}]} />
        <div style={{padding:'24px'}}>
          <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'20px',padding:'24px 28px',marginBottom:'24px',color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-40,right:-40,width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
            <div style={{position:'relative'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)',marginBottom:'4px'}}>No. Pendaftaran: SIM-2025-001</div>
              <h2 style={{fontSize:'1.3rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:'0 0 6px'}}>Seleksi Direktur Utama</h2>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.75)'}}>Perumdam Among Tirta Kota Batu · 2025</div>
            </div>
            <div style={{padding:'10px 18px',borderRadius:'12px',background:'rgba(245,158,11,.2)',border:'1px solid rgba(245,158,11,.3)',display:'flex',alignItems:'center',gap:'7px',flexShrink:0}}>
              <i className="ti ti-clock-hour-4" style={{fontSize:'16px',color:'#FCD34D'}} />
              <span style={{fontSize:'12px',fontWeight:'700',color:'#FCD34D'}}>Menunggu Verifikasi</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'20px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <h3 style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'24px'}}>Progres Tahapan Seleksi</h3>
                <div style={{position:'relative'}}>
                  <div style={{position:'absolute',left:'23px',top:'24px',height:`${(STEPS.length-1)*78}px`,width:'2px',background:'linear-gradient(180deg,#10B981 17%,#1E6AB5 17% 33%,#E2E8F0 33%)'}} />
                  {STEPS.map((s,i)=>(
                    <div key={i} style={{display:'flex',gap:'16px',marginBottom:i<STEPS.length-1?'22px':'0',position:'relative'}}>
                      <div style={{width:'48px',height:'48px',borderRadius:'50%',flexShrink:0,
                        background:s.done?'linear-gradient(135deg,#059669,#10B981)':s.active?'linear-gradient(135deg,#1E3A5F,#1E6AB5)':'#F1F5F9',
                        display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:1,
                        border:s.active?'3px solid #BFDBFE':s.done?'3px solid #A7F3D0':'2px solid #E2E8F0',
                        boxShadow:s.active?'0 0 0 6px rgba(30,106,181,.08)':'none'}}>
                        {s.done?<i className="ti ti-check" style={{fontSize:'20px',color:'#fff'}} />
                          :s.active?<i className="ti ti-loader-2" style={{fontSize:'20px',color:'#fff',animation:'spin 2s linear infinite'}} />
                          :<span style={{fontSize:'13px',fontWeight:'700',color:'#CBD5E1'}}>{i+1}</span>}
                      </div>
                      <div style={{flex:1,paddingTop:'8px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                          <span style={{fontSize:'14px',fontWeight:s.active||s.done?'700':'500',color:s.active?'#1E3A5F':s.done?'#059669':'#94A3B8'}}>{s.label}</span>
                          {s.active&&<span style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',background:'#EFF6FF',color:'#2563EB'}}>Berjalan</span>}
                          {s.done&&<span style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',background:'#ECFDF5',color:'#059669'}}>✓ Selesai</span>}
                        </div>
                        <div style={{fontSize:'12px',color:'#94A3B8',marginTop:'2px'}}>{s.desc}</div>
                        <div style={{fontSize:'11px',color:'#CBD5E1',marginTop:'2px'}}><i className="ti ti-calendar" /> {s.tgl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Riwayat Aktivitas</div>
                {HISTORY.map((h,i)=>{
                  const c=TC[h.type]
                  return(
                    <div key={i} style={{padding:'13px 20px',borderBottom:i<HISTORY.length-1?'1px solid #F8FAFC':'none',display:'flex',gap:'12px'}}>
                      <div style={{width:'32px',height:'32px',borderRadius:'9px',flexShrink:0,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <i className={\`ti \${h.icon}\`} style={{fontSize:'15px',color:c.color}} />
                      </div>
                      <div>
                        <div style={{fontSize:'13px',color:'#1E293B'}}>{h.aksi}</div>
                        <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}><i className="ti ti-clock" /> {h.tgl}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'14px'}}>Info Pendaftaran</div>
                {[['No. Pendaftaran','SIM-2025-001'],['Status','Menunggu Verifikasi'],['Jabatan','Direktur Utama'],['Instansi','Perumdam Among Tirta'],['Tgl. Daftar','12 Jun 2025'],['Batas Upload','15 Jul 2025']].map(([l,v],i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<5?'1px solid #F8FAFC':'none'}}>
                    <span style={{fontSize:'12px',color:'#94A3B8'}}>{l}</span>
                    <span style={{fontSize:'12px',fontWeight:'600',color:'#1E293B',textAlign:'right',maxWidth:'55%'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'linear-gradient(135deg,#FFFBEB,#FFF8E1)',borderRadius:'16px',padding:'18px',border:'1px solid #FDE68A'}}>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#92400E',marginBottom:'8px'}}><i className="ti ti-alert-triangle" style={{marginRight:'6px',color:'#D97706'}} />Tindakan Diperlukan</div>
                <p style={{fontSize:'12px',color:'#B45309',lineHeight:1.6,margin:'0 0 12px'}}>Masih ada <strong>4 dokumen wajib</strong> yang belum diunggah.</p>
                <Link href="/peserta/dokumen" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'9px',borderRadius:'10px',fontSize:'12px',fontWeight:'700',background:'#D97706',color:'#fff',textDecoration:'none'}}>
                  <i className="ti ti-upload" /> Upload Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>{\`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\`}</style>
    </div>
  )
}
