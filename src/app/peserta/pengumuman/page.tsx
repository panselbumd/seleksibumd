'use client'
import { useState } from 'react'
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

const DATA = [
  { id:1, judul:'Perpanjangan Batas Waktu Upload Dokumen',                      tgl:'13 Jun 2025', tipe:'info',    baru:true,  file:false },
  { id:2, judul:'Pengumuman Jadwal Psikotes – Seleksi Direksi Perumdam',        tgl:'10 Jun 2025', tipe:'success', baru:true,  file:true  },
  { id:3, judul:'Perubahan Lokasi Pelaksanaan Wawancara KPM',                   tgl:'8 Jun 2025',  tipe:'warning', baru:false, file:false },
  { id:4, judul:'Pengumuman Pembukaan Seleksi Direksi Perumdam Among Tirta',    tgl:'1 Jun 2025',  tipe:'info',    baru:false, file:true  },
  { id:5, judul:'Syarat dan Ketentuan Peserta Seleksi Tahun 2025',              tgl:'30 Mei 2025', tipe:'info',    baru:false, file:true  },
]
const TC: Record<string,{bg:string;color:string;icon:string;label:string}> = {
  info:   {bg:'#EFF6FF',color:'#2563EB',icon:'ti-info-circle',   label:'Informasi'},
  success:{bg:'#ECFDF5',color:'#059669',icon:'ti-check-circle',  label:'Hasil Seleksi'},
  warning:{bg:'#FFFBEB',color:'#D97706',icon:'ti-alert-triangle',label:'Perubahan'},
}

export default function PengumumanPesertaPage() {
  const [read, setRead] = useState<number[]>([])

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Pengumuman"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Pengumuman'}]}
          actions={
            <button onClick={()=>setRead(DATA.map(d=>d.id))} style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#F1F5F9',color:'#64748B',border:'1px solid #E2E8F0',cursor:'pointer'}}>
              Tandai Semua Dibaca
            </button>
          }
        />
        <div style={{padding:'24px'}}>
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'14px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#F8FAFC'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Kotak Masuk Pengumuman</span>
              <span style={{fontSize:'12px',color:'#94A3B8'}}>{DATA.filter(d=>d.baru&&!read.includes(d.id)).length} belum dibaca</span>
            </div>
            {DATA.map((item,i)=>{
              const cfg   = TC[item.tipe]
              const isNew = item.baru && !read.includes(item.id)
              return (
                <div key={item.id} onClick={()=>setRead(p=>p.includes(item.id)?p:[...p,item.id])}
                  style={{
                    padding:'16px 20px',
                    borderBottom: i<DATA.length-1 ? '1px solid #F8FAFC':'none',
                    background: isNew ? '#FAFCFF' : '#fff',
                    cursor:'pointer',transition:'background .1s',
                    borderLeft: isNew ? '3px solid #1E6AB5' : '3px solid transparent',
                  }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F8FAFC'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=isNew?'#FAFCFF':'#fff'}}
                >
                  <div style={{display:'flex',alignItems:'flex-start',gap:'14px'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'11px',flexShrink:0,background:cfg.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <i className={`ti ${cfg.icon}`} style={{fontSize:'20px',color:cfg.color}} />
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px',flexWrap:'wrap'}}>
                        {isNew && <span style={{fontSize:'10px',fontWeight:'800',padding:'2px 7px',borderRadius:'20px',background:'#EF4444',color:'#fff'}}>BARU</span>}
                        <span style={{fontSize:'11px',fontWeight:'600',padding:'2px 8px',borderRadius:'6px',background:cfg.bg,color:cfg.color}}>{cfg.label}</span>
                        <span style={{fontSize:'11px',color:'#94A3B8',display:'flex',alignItems:'center',gap:'3px'}}><i className="ti ti-calendar" style={{fontSize:'11px'}} />{item.tgl}</span>
                      </div>
                      <h3 style={{fontSize:'13px',fontWeight:isNew?'700':'500',color:'#1E293B',margin:0,lineHeight:1.4}}>{item.judul}</h3>
                    </div>
                    {item.file && (
                      <button onClick={e=>e.stopPropagation()} style={{padding:'6px 12px',borderRadius:'8px',fontSize:'11px',fontWeight:'600',background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',gap:'4px'}}>
                        <i className="ti ti-download" style={{fontSize:'12px'}} /> Unduh
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
