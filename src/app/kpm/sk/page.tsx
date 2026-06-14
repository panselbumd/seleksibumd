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

export default function SKPenetapanPage() {
  const [nomorSK, setNomorSK] = useState('800/SK-DIREKSI/422/2025')
  const [tanggal, setTanggal] = useState('2025-07-15')
  const [gen, setGen]         = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGen = (fmt:string) => {
    setLoading(true)
    setTimeout(()=>{setLoading(false);setGen(true)},2000)
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="kpm" userName="Ketua KPM Kota Batu"
        userRole="KPM / RUPS" initials="KK" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="SK Penetapan"
          breadcrumb={[{label:'Portal KPM',href:'/kpm/dashboard'},{label:'SK Penetapan'}]} />
        <div style={{padding:'24px',maxWidth:'800px'}}>

          {/* Preview SK */}
          <div style={{background:'#fff',borderRadius:'20px',border:'2px solid #E2E8F0',padding:'32px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,.06)'}}>
            {/* Kop area */}
            <div style={{border:'2px dashed #CBD5E1',borderRadius:'10px',height:'120px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'24px',background:'#F8FAFC'}}>
              <div style={{textAlign:'center',color:'#94A3B8'}}>
                <i className="ti ti-building-community" style={{fontSize:'32px',display:'block',marginBottom:'6px'}} />
                <div style={{fontSize:'12px',fontWeight:'600'}}>AREA KOP SURAT EKSTERNAL (±5 cm)</div>
                <div style={{fontSize:'10px',marginTop:'2px'}}>Kop surat KPM / Walikota Batu</div>
              </div>
            </div>
            {/* Isi SK */}
            <div style={{textAlign:'center',marginBottom:'20px'}}>
              <div style={{fontSize:'14px',fontWeight:'900',color:'#1E293B',textTransform:'uppercase',letterSpacing:'0.08em',fontFamily:'Plus Jakarta Sans'}}>SURAT KEPUTUSAN</div>
              <div style={{fontSize:'13px',fontWeight:'800',color:'#1E293B',textTransform:'uppercase',letterSpacing:'0.06em',marginTop:'2px'}}>KETUA KOMITE PEMANGKU MODAL</div>
              <div style={{fontSize:'12px',fontWeight:'700',color:'#1E293B',marginTop:'4px'}}>PERUSAHAAN UMUM DAERAH AIR MINUM AMONG TIRTA KOTA BATU</div>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E6AB5',marginTop:'8px',padding:'6px 20px',background:'#EBF2FA',borderRadius:'8px',display:'inline-block'}}>
                NOMOR : {nomorSK}
              </div>
            </div>
            <div style={{fontSize:'12px',color:'#475569',lineHeight:1.8,marginBottom:'16px'}}>
              <div style={{fontWeight:'700',marginBottom:'6px'}}>TENTANG</div>
              <div style={{fontWeight:'700',textAlign:'center',fontSize:'13px',color:'#1E293B',textTransform:'uppercase',letterSpacing:'0.04em'}}>
                PENGANGKATAN DIREKSI PERUSAHAAN UMUM DAERAH AIR MINUM AMONG TIRTA KOTA BATU PERIODE 2025–2030
              </div>
            </div>
            <div style={{fontSize:'12px',color:'#475569',lineHeight:1.8}}>
              <div style={{fontWeight:'700',marginBottom:'8px',color:'#1E293B'}}>MEMUTUSKAN / MENETAPKAN :</div>
              {['Dr. Ahmad Fauzi, M.Kes.','Siti Nurhaliza, S.E., MM.','Ir. Dewi Rahayu, M.T.'].map((nama,i)=>(
                <div key={i} style={{display:'flex',gap:'12px',marginBottom:'6px',padding:'8px 12px',background:'#F8FAFC',borderRadius:'8px',border:'1px solid #E2E8F0'}}>
                  <span style={{fontSize:'11px',fontWeight:'700',color:'#94A3B8',width:'30px',flexShrink:0}}>Ke-{i+1}</span>
                  <span style={{fontSize:'12px',color:'#1E293B',fontWeight:'600'}}>{nama}</span>
                  <span style={{fontSize:'12px',color:'#64748B'}}>sebagai {['Direktur Utama','Direktur Keuangan','Direktur Teknik'][i]}</span>
                </div>
              ))}
              <div style={{textAlign:'right',marginTop:'24px',fontSize:'12px',color:'#475569'}}>
                <div>Ditetapkan di Kota Batu</div>
                <div>pada tanggal {new Date(tanggal).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</div>
                <div style={{fontWeight:'700',marginTop:'4px',color:'#1E293B'}}>Ketua Komite Pemangku Modal</div>
                <div style={{height:'48px'}} />
                <div style={{fontWeight:'700',textDecoration:'underline',color:'#1E293B'}}>Dr. H. Wahyu Hidayat, M.M.</div>
                <div style={{fontSize:'11px',color:'#94A3B8'}}>NIP. 197003051997031003</div>
              </div>
            </div>
          </div>

          {/* Form konfigurasi SK */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',marginBottom:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px'}}>Konfigurasi SK</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>NOMOR SK</label>
                <input value={nomorSK} onChange={e=>setNomorSK(e.target.value)}
                  style={{width:'100%',padding:'10px 13px',borderRadius:'11px',fontSize:'13px',border:'1.5px solid #C8DDEF',outline:'none',background:'#fff',boxSizing:'border-box'}} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>TANGGAL PENETAPAN</label>
                <input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)}
                  style={{width:'100%',padding:'10px 13px',borderRadius:'11px',fontSize:'13px',border:'1.5px solid #C8DDEF',outline:'none',background:'#fff',boxSizing:'border-box'}} />
              </div>
            </div>
          </div>

          {/* Generate buttons */}
          <div style={{display:'flex',gap:'12px'}}>
            {['PDF','DOCX'].map(fmt=>(
              <button key={fmt} onClick={()=>handleGen(fmt)} disabled={loading||gen}
                style={{flex:1,padding:'13px',borderRadius:'13px',fontSize:'14px',fontWeight:'800',border:'none',cursor:loading||gen?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',transition:'all .15s',
                  background: gen?'#ECFDF5':loading?'#F1F5F9':fmt==='PDF'?'linear-gradient(135deg,#DC2626,#EF4444)':'linear-gradient(135deg,#1E3A5F,#1E6AB5)',
                  color: gen?'#059669':loading?'#94A3B8':'#fff',
                  boxShadow: (!gen&&!loading)?fmt==='PDF'?'0 4px 14px rgba(220,38,38,.3)':'0 4px 14px rgba(30,106,181,.3)':'none',
                }}>
                {loading?<><i className="ti ti-loader-2" style={{fontSize:'18px',animation:'spin 1s linear infinite'}} />Membuat SK...</>
                  :gen?<><i className="ti ti-check-circle" style={{fontSize:'18px'}} />SK {fmt} Siap Diunduh</>
                  :<><i className={`ti ${fmt==='PDF'?'ti-file-type-pdf':'ti-file-type-doc'}`} style={{fontSize:'18px'}} />Generate SK {fmt}</>}
              </button>
            ))}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
