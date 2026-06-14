'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/kpm/dashboard',   icon:'ti-layout-dashboard', label:'Beranda',     section:'MENU' },
  { href:'/kpm/penetapan',   icon:'ti-certificate',      label:'Penetapan',   section:'MENU' },
  { href:'/kpm/laporan',     icon:'ti-chart-bar',        label:'Grafik',      section:'MENU' },
  { href:'/kpm/berita-acara',icon:'ti-writing',          label:'Berita Acara',section:'MENU' },
  { href:'/kpm/sk',          icon:'ti-file-certificate', label:'SK Penetapan',section:'DOKUMEN' },
]

export default function KPMBeritaAcaraPage() {
  const [gen, setGen] = useState<Record<string,boolean>>({})
  const [loading, setLoading] = useState<string|null>(null)
  const generate = (id:string,fmt:string) => {
    const key=id+fmt; setLoading(key)
    setTimeout(()=>{setLoading(null);setGen(p=>({...p,[key]:true}))},2000)
  }

  const docs = [
    { id:'BA-WW', nama:'Berita Acara Wawancara KPM', desc:'BA pelaksanaan wawancara mendalam KPM/RUPS', tersedia:true,  icon:'ti-microphone', color:'#7C3AED' },
    { id:'BA-PN', nama:'Berita Acara Penetapan',      desc:'BA rapat pleno penetapan hasil akhir seleksi', tersedia:true, icon:'ti-gavel',       color:'#1E3A5F' },
    { id:'BA-PB', nama:'Berita Acara Pelantikan',     desc:'BA pelantikan pejabat yang ditetapkan',      tersedia:false, icon:'ti-award',       color:'#94A3B8' },
  ]

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="kpm" userName="Ketua KPM Kota Batu"
        userRole="KPM / RUPS" initials="KK" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Berita Acara KPM"
          breadcrumb={[{label:'Portal KPM',href:'/kpm/dashboard'},{label:'Berita Acara'}]} />
        <div style={{padding:'24px'}}>
          <div style={{background:'linear-gradient(135deg,#EBF2FA,#EFF6FF)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',border:'1px solid #BFDBFE',display:'flex',gap:'12px'}}>
            <i className="ti ti-info-circle" style={{fontSize:'22px',color:'#2563EB',flexShrink:0,marginTop:'1px'}} />
            <div>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E40AF'}}>Template KPM</div>
              <div style={{fontSize:'12px',color:'#3730A3',lineHeight:1.6}}>Berita Acara KPM dilengkapi kop surat kosong <strong>±5 cm</strong> dan kolom tanda tangan Ketua KPM, Sekretaris, dan Anggota.</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {docs.map(doc=>(
              <div key={doc.id} style={{background:'#fff',borderRadius:'18px',border:`1px solid ${doc.tersedia?'#E2E8F0':'#F1F5F9'}`,padding:'22px 24px',boxShadow:'0 1px 3px rgba(0,0,0,.04)',opacity:doc.tersedia?1:.55}}>
                <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:doc.tersedia?'16px':'0'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'14px',background:doc.tersedia?`${doc.color}15`:'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <i className={`ti ${doc.icon}`} style={{fontSize:'24px',color:doc.tersedia?doc.color:'#CBD5E1'}} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'14px',fontWeight:'800',color:doc.tersedia?'#1E293B':'#94A3B8',fontFamily:'Plus Jakarta Sans'}}>{doc.nama}</div>
                    <div style={{fontSize:'12px',color:'#94A3B8',marginTop:'2px'}}>{doc.desc}</div>
                  </div>
                  {!doc.tersedia && <span style={{fontSize:'11px',fontWeight:'700',padding:'4px 12px',borderRadius:'20px',background:'#F1F5F9',color:'#94A3B8'}}>Belum Tersedia</span>}
                </div>
                {doc.tersedia && (
                  <div style={{display:'flex',gap:'10px'}}>
                    {(['PDF','DOCX'] as const).map(fmt=>{
                      const key=doc.id+fmt; const isDone=gen[key]; const isLoad=loading===key
                      const fc=fmt==='PDF'?{c:'#DC2626',bg:'#FEF2F2'}:{c:'#2563EB',bg:'#EFF6FF'}
                      return (
                        <button key={fmt} onClick={()=>generate(doc.id,fmt)} disabled={isDone||isLoad}
                          style={{flex:1,padding:'10px',borderRadius:'11px',fontSize:'13px',fontWeight:'700',border:`1px solid ${isDone?'#A7F3D0':isLoad?'#E2E8F0':fc.c+'30'}`,background:isDone?'#ECFDF5':isLoad?'#F8FAFC':fc.bg,color:isDone?'#059669':isLoad?'#94A3B8':fc.c,cursor:isDone||isLoad?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                          {isLoad?<><i className="ti ti-loader-2" style={{fontSize:'14px',animation:'spin 1s linear infinite'}} />Membuat...</>:isDone?<><i className="ti ti-check" style={{fontSize:'14px'}} />{fmt} Siap</>:<><i className={`ti ${fmt==='PDF'?'ti-file-type-pdf':'ti-file-type-doc'}`} style={{fontSize:'14px'}} />Generate {fmt}</>}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
