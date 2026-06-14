'use client'
import { useState } from 'react'
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

const LOWONGAN = [
  { id:'L001', jabatan:'Direktur Utama',     instansi:'Perumdam Among Tirta', jenis:'BUMD', seleksi:'Direksi',       kuota:1, tutup:'15 Jul 2025', peserta:32, color:'#1E3A5F', bg:'#EBF2FA', aktif:true },
  { id:'L002', jabatan:'Direktur Keuangan',  instansi:'Perumdam Among Tirta', jenis:'BUMD', seleksi:'Direksi',       kuota:1, tutup:'15 Jul 2025', peserta:28, color:'#1E3A5F', bg:'#EBF2FA', aktif:true },
  { id:'L003', jabatan:'Komisaris Utama',    instansi:'PT BPR Bank Batu',     jenis:'BUMD', seleksi:'Komisaris',     kuota:1, tutup:'20 Jul 2025', peserta:15, color:'#7C3AED', bg:'#F5F3FF', aktif:true },
  { id:'L004', jabatan:'Komisaris',          instansi:'PT BPR Bank Batu',     jenis:'BUMD', seleksi:'Komisaris',     kuota:2, tutup:'20 Jul 2025', peserta:18, color:'#7C3AED', bg:'#F5F3FF', aktif:true },
  { id:'L005', jabatan:'Dewan Pengawas',     instansi:'RSUD Kota Batu',       jenis:'BLUD', seleksi:'Dewan Pengawas',kuota:3, tutup:'18 Jul 2025', peserta:22, color:'#059669', bg:'#ECFDF5', aktif:true },
  { id:'L006', jabatan:'Dewan Pengawas',     instansi:'Puskesmas Batu',       jenis:'BLUD', seleksi:'Dewan Pengawas',kuota:2, tutup:'18 Jul 2025', peserta:12, color:'#059669', bg:'#ECFDF5', aktif:false },
]

export default function DaftarSeleksiPage() {
  const [selected, setSelected] = useState<string|null>(null)
  const [filter, setFilter]     = useState('Semua')
  const [submitted, setSubmitted]= useState(false)

  const filtered = filter === 'Semua' ? LOWONGAN : LOWONGAN.filter(l => l.jenis === filter || l.seleksi === filter)
  const picked   = LOWONGAN.find(l => l.id === selected)

  if (submitted) return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center',maxWidth:'440px',padding:'40px'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',boxShadow:'0 0 0 12px rgba(16,185,129,.1)'}}>
            <i className="ti ti-check" style={{fontSize:'36px',color:'#fff'}} />
          </div>
          <h2 style={{fontSize:'1.4rem',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Pendaftaran Berhasil!</h2>
          <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.7,marginBottom:'24px'}}>
            Anda berhasil mendaftar pada <strong>{picked?.jabatan}</strong> – {picked?.instansi}.<br/>
            Segera upload dokumen persyaratan untuk melanjutkan proses.
          </p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
            <Link href="/peserta/dokumen" style={{padding:'10px 22px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',textDecoration:'none',display:'flex',alignItems:'center',gap:'6px'}}>
              <i className="ti ti-upload" /> Upload Dokumen
            </Link>
            <Link href="/peserta/dashboard" style={{padding:'10px 22px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',background:'#fff',color:'#475569',textDecoration:'none',border:'1px solid #E2E8F0'}}>
              Ke Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Daftar Seleksi"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Daftar Seleksi'}]} />
        <div style={{padding:'24px'}}>
          <div style={{background:'linear-gradient(135deg,#EBF2FA,#F0F7FF)',borderRadius:'16px',padding:'16px 20px',marginBottom:'20px',border:'1px solid #BFDBFE',display:'flex',alignItems:'flex-start',gap:'12px'}}>
            <i className="ti ti-info-circle" style={{fontSize:'20px',color:'#2563EB',flexShrink:0,marginTop:'1px'}} />
            <div>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E40AF',marginBottom:'2px'}}>Ketentuan Pendaftaran</div>
              <div style={{fontSize:'12px',color:'#3730A3',lineHeight:1.6}}>Setiap peserta hanya dapat mendaftar pada <strong>1 posisi</strong>. Pastikan Anda memenuhi syarat sebelum mendaftar. Pendaftaran yang sudah disubmit tidak dapat dibatalkan.</div>
            </div>
          </div>
          {/* Filter */}
          <div style={{display:'flex',gap:'6px',marginBottom:'20px',flexWrap:'wrap'}}>
            {['Semua','BUMD','BLUD','Direksi','Komisaris','Dewan Pengawas'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:'5px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',cursor:'pointer',
                background:filter===f?'#1E3A5F':'#fff',
                color:filter===f?'#fff':'#64748B',
                border:`1px solid ${filter===f?'#1E3A5F':'#E2E8F0'}`,
                transition:'all .15s',
              }}>{f}</button>
            ))}
          </div>
          {/* Grid lowongan */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px',marginBottom:'24px'}}>
            {filtered.map(l=>(
              <div key={l.id} onClick={()=>l.aktif&&setSelected(l.id===selected?null:l.id)}
                style={{
                  background:'#fff',borderRadius:'16px',padding:'20px',
                  border:`2px solid ${selected===l.id?l.color:l.aktif?'#E2E8F0':'#E2E8F0'}`,
                  boxShadow: selected===l.id?`0 0 0 3px ${l.color}20`:'0 1px 3px rgba(0,0,0,.04)',
                  cursor:l.aktif?'pointer':'not-allowed',
                  opacity:l.aktif?1:.6,
                  transition:'all .15s',
                  background: selected===l.id?`${l.color}08`:'#fff',
                }}>
                <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'12px'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,background:l.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <i className={`ti ${l.jenis==='BUMD'?'ti-building-factory-2':'ti-building-hospital'}`} style={{fontSize:'22px',color:l.color}} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'4px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',background:l.bg,color:l.color}}>{l.jenis}</span>
                      <span style={{fontSize:'11px',fontWeight:'600',padding:'2px 8px',borderRadius:'6px',background:'#F1F5F9',color:'#64748B'}}>{l.seleksi}</span>
                      {!l.aktif&&<span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',background:'#FEF2F2',color:'#DC2626'}}>Ditutup</span>}
                    </div>
                    <h3 style={{fontSize:'14px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:0}}>{l.jabatan}</h3>
                    <div style={{fontSize:'12px',color:'#64748B',marginTop:'2px'}}>{l.instansi}</div>
                  </div>
                  {selected===l.id&&(
                    <div style={{width:'24px',height:'24px',borderRadius:'50%',background:l.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <i className="ti ti-check" style={{fontSize:'13px',color:'#fff'}} />
                    </div>
                  )}
                </div>
                <div style={{display:'flex',gap:'12px',fontSize:'12px',color:'#94A3B8'}}>
                  <span><i className="ti ti-users" style={{marginRight:'3px'}} />{l.peserta} pendaftar</span>
                  <span><i className="ti ti-award" style={{marginRight:'3px'}} />{l.kuota} posisi</span>
                  <span><i className="ti ti-calendar-x" style={{marginRight:'3px'}} />Tutup {l.tutup}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Submit */}
          {selected && (
            <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'20px 24px',boxShadow:'0 4px 16px rgba(0,0,0,.08)',animation:'slideUp .3s ease'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
                <div>
                  <div style={{fontSize:'12px',color:'#94A3B8',marginBottom:'2px'}}>Anda memilih:</div>
                  <div style={{fontSize:'15px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{picked?.jabatan}</div>
                  <div style={{fontSize:'13px',color:'#64748B'}}>{picked?.instansi} · {picked?.jenis}</div>
                </div>
                <div style={{display:'flex',gap:'10px'}}>
                  <button onClick={()=>setSelected(null)} style={{padding:'10px 20px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',background:'#fff',color:'#64748B',border:'1px solid #E2E8F0',cursor:'pointer'}}>Batal</button>
                  <button onClick={()=>setSubmitted(true)} style={{padding:'10px 24px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',boxShadow:'0 4px 12px rgba(30,106,181,.3)'}}>
                    <i className="ti ti-check" /> Konfirmasi Pendaftaran
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
