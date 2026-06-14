'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/panitia/dashboard',   icon:'ti-layout-dashboard', label:'Beranda',          section:'MENU UTAMA' },
  { href:'/panitia/verifikasi',  icon:'ti-clipboard-check',  label:'Verifikasi Adm.',  section:'MENU UTAMA', badge:3 },
  { href:'/panitia/peserta',     icon:'ti-users',            label:'Manajemen Peserta',section:'MENU UTAMA' },
  { href:'/panitia/laporan',     icon:'ti-report',           label:'Laporan',          section:'LAPORAN' },
  { href:'/panitia/berita-acara',icon:'ti-writing',          label:'Berita Acara',     section:'LAPORAN' },
]

const BA_TYPES = [
  { kode:'BA-ADM', nama:'BA Seleksi Administrasi',  icon:'ti-clipboard-list',    color:'#1E3A5F', bg:'#EBF2FA', tersedia:true  },
  { kode:'BA-UKK', nama:'BA Pelaksanaan UKK',        icon:'ti-chart-bar',         color:'#7C3AED', bg:'#F5F3FF', tersedia:false },
  { kode:'BA-WWR', nama:'BA Wawancara KPM',          icon:'ti-microphone',        color:'#D97706', bg:'#FFFBEB', tersedia:false },
  { kode:'BA-PNT', nama:'BA Rapat Penetapan',        icon:'ti-gavel',             color:'#DC2626', bg:'#FEF2F2', tersedia:false },
]

export default function BeritaAcaraPage() {
  const [gen, setGen] = useState<Record<string,boolean>>({})
  const [loading, setLoading] = useState<string|null>(null)

  const generate = (kode:string, fmt:string) => {
    const key = kode+fmt; setLoading(key)
    setTimeout(()=>{ setLoading(null); setGen(p=>({...p,[key]:true})) }, 1800)
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Sekretaris Pansel"
        userRole="Sekretaris Panitia" initials="SP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Berita Acara"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Berita Acara'}]} />
        <div style={{padding:'24px'}}>
          {/* Info template */}
          <div style={{background:'linear-gradient(135deg,#EBF2FA,#EFF6FF)',borderRadius:'16px',padding:'16px 20px',marginBottom:'20px',border:'1px solid #BFDBFE',display:'flex',gap:'12px'}}>
            <i className="ti ti-file-description" style={{fontSize:'22px',color:'#2563EB',flexShrink:0,marginTop:'1px'}} />
            <div>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E40AF',marginBottom:'3px'}}>Template Berita Acara</div>
              <div style={{fontSize:'12px',color:'#3730A3',lineHeight:1.6}}>
                Semua dokumen Berita Acara dilengkapi area kosong <strong>±5 cm</strong> di bagian atas untuk kop surat Panitia Seleksi eksternal. Format tersedia dalam <strong>PDF</strong> dan <strong>DOCX</strong>.
              </div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
            {BA_TYPES.map(ba=>(
              <div key={ba.kode} style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)',opacity:ba.tersedia?1:.6}}>
                <div style={{padding:'18px 20px',background:`linear-gradient(135deg,${ba.color}12,${ba.color}06)`,borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'13px',background:ba.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <i className={`ti ${ba.icon}`} style={{fontSize:'22px',color:ba.color}} />
                  </div>
                  <div>
                    <div style={{fontSize:'14px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{ba.nama}</div>
                    <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{ba.kode} · Seleksi Direksi Perumdam Among Tirta</div>
                  </div>
                  {!ba.tersedia && <span style={{marginLeft:'auto',fontSize:'10px',fontWeight:'700',padding:'3px 8px',borderRadius:'6px',background:'#F1F5F9',color:'#94A3B8'}}>BELUM TERSEDIA</span>}
                </div>
                <div style={{padding:'18px 20px'}}>
                  {/* Isi template preview */}
                  <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'14px 16px',marginBottom:'16px',border:'1px solid #E2E8F0'}}>
                    <div style={{display:'flex',justifyContent:'center',marginBottom:'12px'}}>
                      <div style={{width:'100%',height:'40px',background:'#E2E8F0',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <span style={{fontSize:'10px',color:'#94A3B8',fontStyle:'italic'}}>[ AREA KOP SURAT PANSEL – ±5cm ]</span>
                      </div>
                    </div>
                    <div style={{textAlign:'center',marginBottom:'8px'}}>
                      <div style={{fontSize:'12px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',textTransform:'uppercase'}}>BERITA ACARA</div>
                      <div style={{fontSize:'11px',fontWeight:'700',color:'#1E293B',textTransform:'uppercase'}}>{ba.nama.replace('BA ','')}</div>
                    </div>
                    {['Nomor:',`Hari/Tanggal:`,`Tempat:`,`Pimpinan Rapat:`].map((row,i)=>(
                      <div key={i} style={{display:'flex',gap:'8px',marginBottom:'4px'}}>
                        <span style={{fontSize:'10px',color:'#94A3B8',width:'100px',flexShrink:0}}>{row}</span>
                        <div style={{flex:1,height:'10px',background:'#E2E8F0',borderRadius:'3px'}} />
                      </div>
                    ))}
                  </div>
                  {ba.tersedia && (
                    <div style={{display:'flex',gap:'8px'}}>
                      {(['PDF','DOCX'] as const).map(fmt=>{
                        const key = ba.kode+fmt
                        const isDone = gen[key]; const isLoad = loading===key
                        const fc = fmt==='PDF'?{color:'#DC2626',bg:'#FEF2F2'}:{color:'#2563EB',bg:'#EFF6FF'}
                        return (
                          <button key={fmt} onClick={()=>generate(ba.kode,fmt)} disabled={isDone||isLoad}
                            style={{flex:1,padding:'9px',borderRadius:'10px',fontSize:'12px',fontWeight:'700',border:`1px solid ${isDone?'#A7F3D0':isLoad?'#E2E8F0':fc.color+'30'}`,background:isDone?'#ECFDF5':isLoad?'#F8FAFC':fc.bg,color:isDone?'#059669':isLoad?'#94A3B8':fc.color,cursor:isDone||isLoad?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px',transition:'all .15s'}}>
                            {isLoad?<><i className="ti ti-loader-2" style={{fontSize:'13px',animation:'spin 1s linear infinite'}} />Membuat...</>
                              :isDone?<><i className="ti ti-check" style={{fontSize:'13px'}} />{fmt} Siap</>
                              :<><i className={`ti ${fmt==='PDF'?'ti-file-type-pdf':'ti-file-type-doc'}`} style={{fontSize:'13px'}} />{fmt}</>}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {!ba.tersedia && <div style={{padding:'10px',borderRadius:'10px',background:'#F8FAFC',border:'1px solid #E2E8F0',fontSize:'12px',color:'#94A3B8',textAlign:'center'}}><i className="ti ti-lock" style={{marginRight:'4px'}} />Tersedia setelah tahapan selesai</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
