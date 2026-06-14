'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/panitia/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',           section:'MENU UTAMA' },
  { href:'/panitia/verifikasi', icon:'ti-clipboard-check',  label:'Verifikasi Adm.',   section:'MENU UTAMA', badge:12 },
  { href:'/panitia/peserta',    icon:'ti-users',            label:'Manajemen Peserta', section:'MENU UTAMA' },
  { href:'/panitia/jadwal',     icon:'ti-calendar-event',   label:'Jadwal Seleksi',    section:'MENU UTAMA' },
  { href:'/panitia/pengumuman', icon:'ti-speakerphone',     label:'Pengumuman',        section:'MENU UTAMA' },
  { href:'/panitia/dokumen',    icon:'ti-file-description', label:'Generate Dokumen',  section:'MENU UTAMA' },
  { href:'/panitia/laporan',    icon:'ti-report',           label:'Laporan',           section:'LAPORAN' },
]

const DOCS = [
  { id:'D01', nama:'Pengumuman Seleksi',             desc:'Pengumuman resmi pembukaan seleksi',     icon:'ti-speakerphone',      color:'#1E3A5F', bg:'#EBF2FA', tersedia:true  },
  { id:'D02', nama:'Pengumuman Hasil Administrasi',  desc:'Daftar peserta lulus/tidak lulus adm.',  icon:'ti-clipboard-list',    color:'#059669', bg:'#ECFDF5', tersedia:true  },
  { id:'D03', nama:'Undangan UKK',                   desc:'Undangan peserta untuk ikut UKK',        icon:'ti-calendar-event',    color:'#2563EB', bg:'#EFF6FF', tersedia:true  },
  { id:'D04', nama:'Pengumuman Hasil UKK',           desc:'Hasil penilaian UKK seluruh peserta',    icon:'ti-chart-bar',         color:'#7C3AED', bg:'#F5F3FF', tersedia:false },
  { id:'D05', nama:'Undangan Wawancara',             desc:'Undangan wawancara dengan KPM',          icon:'ti-microphone',        color:'#D97706', bg:'#FFFBEB', tersedia:false },
  { id:'D06', nama:'Berita Acara Administrasi',      desc:'BA seleksi administrasi lengkap',        icon:'ti-writing',           color:'#0891B2', bg:'#ECFEFF', tersedia:true  },
  { id:'D07', nama:'Berita Acara UKK',               desc:'BA pelaksanaan UKK',                     icon:'ti-writing',           color:'#0891B2', bg:'#ECFEFF', tersedia:false },
  { id:'D08', nama:'Berita Acara Wawancara',         desc:'BA pelaksanaan wawancara KPM',           icon:'ti-writing',           color:'#0891B2', bg:'#ECFEFF', tersedia:false },
  { id:'D09', nama:'Berita Acara Penetapan',         desc:'BA rapat penetapan hasil seleksi',       icon:'ti-writing',           color:'#0891B2', bg:'#ECFEFF', tersedia:false },
  { id:'D10', nama:'SK Penetapan',                   desc:'Surat Keputusan penetapan pejabat',      icon:'ti-file-certificate',  color:'#DC2626', bg:'#FEF2F2', tersedia:false },
]

export default function GenerateDokumenPage() {
  const [loading, setLoading] = useState<string|null>(null)
  const [done, setDone]       = useState<string[]>([])

  const generate = (id: string, format: 'PDF'|'DOCX') => {
    const key = id+format
    setLoading(key)
    setTimeout(() => { setLoading(null); setDone(p=>[...p,key]) }, 1800)
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Sekretaris Pansel"
        userRole="Sekretaris Panitia" initials="SP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Generate Dokumen"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Generate Dokumen'}]} />
        <div style={{padding:'24px'}}>
          <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'18px',padding:'20px 24px',marginBottom:'24px',color:'#fff',display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <i className="ti ti-file-description" style={{fontSize:'24px'}} />
            </div>
            <div>
              <h2 style={{fontSize:'1.1rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:0}}>Generate Dokumen Otomatis</h2>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,.7)',margin:'3px 0 0'}}>Semua dokumen memiliki area kosong 5cm untuk kop surat PANSEL eksternal</p>
            </div>
            <div style={{marginLeft:'auto',padding:'8px 16px',background:'rgba(255,255,255,.15)',borderRadius:'10px',fontSize:'12px',color:'rgba(255,255,255,.9)',display:'flex',alignItems:'center',gap:'6px'}}>
              <i className="ti ti-building-factory-2" /> Seleksi: Direksi Perumdam Among Tirta
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'14px'}}>
            {DOCS.map((doc)=>{
              const pdfDone  = done.includes(doc.id+'PDF')
              const docxDone = done.includes(doc.id+'DOCX')
              const pdfLoad  = loading===doc.id+'PDF'
              const docxLoad = loading===doc.id+'DOCX'
              return (
                <div key={doc.id} style={{
                  background:'#fff',borderRadius:'16px',padding:'18px 20px',
                  border:`1px solid ${doc.tersedia?'#E2E8F0':'#F1F5F9'}`,
                  boxShadow:'0 1px 3px rgba(0,0,0,.04)',
                  opacity:doc.tersedia?1:.6,
                }}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'14px'}}>
                    <div style={{width:'42px',height:'42px',borderRadius:'12px',flexShrink:0,background:doc.tersedia?doc.bg:'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <i className={`ti ${doc.icon}`} style={{fontSize:'21px',color:doc.tersedia?doc.color:'#CBD5E1'}} />
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'2px'}}>
                        <span style={{fontSize:'13px',fontWeight:'700',color:doc.tersedia?'#1E293B':'#94A3B8'}}>{doc.nama}</span>
                        <span style={{fontSize:'9px',fontWeight:'700',color:doc.tersedia?doc.color:'#CBD5E1',padding:'1px 6px',borderRadius:'4px',background:doc.tersedia?doc.bg:'#F1F5F9'}}>{doc.id}</span>
                      </div>
                      <div style={{fontSize:'11px',color:'#94A3B8'}}>{doc.desc}</div>
                    </div>
                  </div>
                  {doc.tersedia?(
                    <div style={{display:'flex',gap:'8px'}}>
                      {(['PDF','DOCX'] as const).map(fmt=>{
                        const isLoading = (fmt==='PDF'?pdfLoad:docxLoad)
                        const isDone    = (fmt==='PDF'?pdfDone:docxDone)
                        const fmtColor  = fmt==='PDF'?'#DC2626':'#2563EB'
                        const fmtBg     = fmt==='PDF'?'#FEF2F2':'#EFF6FF'
                        return (
                          <button key={fmt} onClick={()=>generate(doc.id,fmt)} disabled={isLoading||isDone}
                            style={{
                              flex:1,padding:'8px 12px',borderRadius:'10px',fontSize:'12px',fontWeight:'700',
                              background: isDone?'#ECFDF5':isLoading?'#F1F5F9':fmtBg,
                              color:      isDone?'#059669':isLoading?'#94A3B8':fmtColor,
                              border:`1px solid ${isDone?'#A7F3D0':isLoading?'#E2E8F0':fmtColor+'30'}`,
                              cursor: isDone||isLoading?'default':'pointer',
                              display:'flex',alignItems:'center',justifyContent:'center',gap:'5px',
                              transition:'all .15s',
                            }}>
                            {isLoading?(
                              <><i className="ti ti-loader-2" style={{fontSize:'13px',animation:'spin 1s linear infinite'}} /> Membuat...</>
                            ):isDone?(
                              <><i className="ti ti-check" style={{fontSize:'13px'}} /> {fmt} Siap</>
                            ):(
                              <><i className={`ti ${fmt==='PDF'?'ti-file-type-pdf':'ti-file-type-doc'}`} style={{fontSize:'13px'}} /> {fmt}</>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ):(
                    <div style={{padding:'8px 12px',borderRadius:'10px',background:'#F8FAFC',border:'1px solid #E2E8F0',fontSize:'11px',color:'#94A3B8',textAlign:'center'}}>
                      <i className="ti ti-lock" style={{marginRight:'4px'}} />Tersedia setelah tahapan terkait selesai
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
