'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/panitia/dashboard',   icon:'ti-layout-dashboard', label:'Beranda',          section:'MENU UTAMA' },
  { href:'/panitia/verifikasi',  icon:'ti-clipboard-check',  label:'Verifikasi Adm.',  section:'MENU UTAMA', badge:3 },
  { href:'/panitia/peserta',     icon:'ti-users',            label:'Manajemen Peserta',section:'MENU UTAMA' },
  { href:'/panitia/jadwal',      icon:'ti-calendar-event',   label:'Jadwal Seleksi',   section:'MENU UTAMA' },
  { href:'/panitia/pengumuman',  icon:'ti-speakerphone',     label:'Pengumuman',       section:'MENU UTAMA' },
  { href:'/panitia/dokumen',     icon:'ti-file-description', label:'Generate Dokumen', section:'MENU UTAMA' },
  { href:'/panitia/laporan',     icon:'ti-report',           label:'Laporan',          section:'LAPORAN' },
  { href:'/panitia/pengaturan',  icon:'ti-settings',         label:'Pengaturan',       section:'SISTEM' },
]

export default function PengaturanPage() {
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    nama_sistem:'SIMBUBALADA',
    nama_pemda:'Pemerintah Kota Batu',
    ketua_pansel:'H. Wahyu Hidayat, S.Sos., M.M.',
    sekretaris:'Sari Dewi Rahayu, S.E.',
    email_notif:'pansel@batukota.go.id',
    batas_upload:'2025-07-15',
    max_file_mb:'5',
    format_file:'PDF, JPG, PNG, DOCX',
    notif_email:true, notif_wa:false,
    auto_reminder:true, reminder_hari:'3',
  })
  const set = (k:string, v:any) => setConfig(p=>({...p,[k]:v}))
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),3000) }

  const inp = {width:'100%',padding:'10px 13px',borderRadius:'12px',fontSize:'13px',border:'1.5px solid #C8DDEF',outline:'none',background:'#fff',boxSizing:'border-box' as const,transition:'all .15s'}
  const section = (title:string, icon:string, color:string) => (
    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px',paddingBottom:'12px',borderBottom:'1px solid #F1F5F9'}}>
      <div style={{width:'32px',height:'32px',borderRadius:'9px',background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <i className={`ti ${icon}`} style={{fontSize:'17px',color}} />
      </div>
      <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{title}</span>
    </div>
  )

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Admin SIMBUBALADA"
        userRole="Administrator" initials="AD" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Pengaturan Sistem"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Pengaturan'}]}
          actions={
            <button onClick={handleSave} style={{padding:'7px 16px',borderRadius:'9px',fontSize:'12px',fontWeight:'700',background:'linear-gradient(135deg,#059669,#10B981)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',boxShadow:'0 3px 10px rgba(5,150,105,.3)'}}>
              <i className="ti ti-device-floppy" style={{fontSize:'13px'}} /> Simpan Pengaturan
            </button>
          }
        />
        <div style={{padding:'24px',maxWidth:'900px'}}>
          {saved && (
            <div style={{background:'#ECFDF5',border:'1px solid #A7F3D0',borderRadius:'12px',padding:'11px 16px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px',animation:'fadeIn .3s ease'}}>
              <i className="ti ti-check-circle" style={{fontSize:'18px',color:'#059669'}} />
              <span style={{fontSize:'13px',fontWeight:'600',color:'#065F46'}}>Pengaturan berhasil disimpan.</span>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
            {/* Identitas sistem */}
            <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              {section('Identitas Sistem','ti-building-community','#1E3A5F')}
              <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
                {[
                  {label:'Nama Sistem',    key:'nama_sistem'},
                  {label:'Nama Pemerintah Daerah',key:'nama_pemda'},
                  {label:'Ketua Panitia Seleksi', key:'ketua_pansel'},
                  {label:'Sekretaris Pansel',     key:'sekretaris'},
                  {label:'Email Notifikasi',      key:'email_notif', type:'email'},
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.05em'}}>{f.label}</label>
                    <input type={f.type||'text'} value={(config as any)[f.key]} onChange={e=>set(f.key,e.target.value)} style={inp}
                      onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                      onBlur={e=>{e.target.style.borderColor='#C8DDEF';e.target.style.boxShadow='none'}} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              {/* Batas waktu & file */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                {section('Batas Waktu & Upload','ti-calendar-event','#D97706')}
                <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
                  <div>
                    <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Batas Upload Dokumen</label>
                    <input type="date" value={config.batas_upload} onChange={e=>set('batas_upload',e.target.value)} style={inp}
                      onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                      onBlur={e=>{e.target.style.borderColor='#C8DDEF';e.target.style.boxShadow='none'}} />
                  </div>
                  <div>
                    <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Ukuran Maks. File (MB)</label>
                    <input type="number" min="1" max="20" value={config.max_file_mb} onChange={e=>set('max_file_mb',e.target.value)} style={inp}
                      onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                      onBlur={e=>{e.target.style.borderColor='#C8DDEF';e.target.style.boxShadow='none'}} />
                  </div>
                  <div>
                    <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Format File Diterima</label>
                    <input value={config.format_file} onChange={e=>set('format_file',e.target.value)} style={inp}
                      onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                      onBlur={e=>{e.target.style.borderColor='#C8DDEF';e.target.style.boxShadow='none'}} />
                  </div>
                </div>
              </div>

              {/* Notifikasi */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                {section('Pengaturan Notifikasi','ti-bell','#7C3AED')}
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {[
                    {key:'notif_email', label:'Notifikasi via Email',          desc:'Kirim email otomatis ke peserta'},
                    {key:'notif_wa',    label:'Notifikasi via WhatsApp',       desc:'Kirim pesan WA ke peserta (Beta)'},
                    {key:'auto_reminder',label:'Pengingat Otomatis',           desc:'Ingatkan peserta sebelum batas waktu'},
                  ].map(n=>(
                    <div key={n.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                      <div>
                        <div style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{n.label}</div>
                        <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'1px'}}>{n.desc}</div>
                      </div>
                      <button onClick={()=>set(n.key,!(config as any)[n.key])} style={{
                        width:'44px',height:'24px',borderRadius:'12px',border:'none',cursor:'pointer',
                        background:(config as any)[n.key]?'linear-gradient(135deg,#1E3A5F,#1E6AB5)':'#E2E8F0',
                        position:'relative',transition:'all .2s',flexShrink:0,
                      }}>
                        <div style={{
                          width:'18px',height:'18px',borderRadius:'50%',background:'#fff',
                          position:'absolute',top:'3px',transition:'left .2s',
                          left:(config as any)[n.key]?'23px':'3px',
                          boxShadow:'0 1px 4px rgba(0,0,0,.2)',
                        }} />
                      </button>
                    </div>
                  ))}
                  {config.auto_reminder && (
                    <div>
                      <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Ingatkan H- (hari)</label>
                      <input type="number" min="1" max="14" value={config.reminder_hari} onChange={e=>set('reminder_hari',e.target.value)} style={{...inp,width:'80px'}}
                        onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                        onBlur={e=>{e.target.style.borderColor='#C8DDEF';e.target.style.boxShadow='none'}} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info versi */}
          <div style={{marginTop:'20px',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'16px',padding:'18px 22px',color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:'14px',fontWeight:'700',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA v2.0.0</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.65)',marginTop:'2px'}}>Sistem Informasi Manajemen Seleksi BUMD dan BLUD Kota Batu</div>
            </div>
            <div style={{textAlign:'right',fontSize:'11px',color:'rgba(255,255,255,.5)'}}>
              <div>Build: Juni 2025</div>
              <div>Next.js 15 · Supabase · Vercel</div>
            </div>
          </div>
        </div>
      </main>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
