'use client'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/kpm/dashboard',   icon:'ti-layout-dashboard', label:'Beranda',     section:'MENU' },
  { href:'/kpm/penetapan',   icon:'ti-certificate',      label:'Penetapan',   section:'MENU' },
  { href:'/kpm/laporan',     icon:'ti-chart-bar',        label:'Grafik',      section:'MENU' },
  { href:'/kpm/berita-acara',icon:'ti-writing',          label:'Berita Acara',section:'MENU' },
  { href:'/kpm/sk',          icon:'ti-file-certificate', label:'SK Penetapan',section:'DOKUMEN' },
]

const PESERTA = [
  { nama:'Dr. Ahmad Fauzi',   psiko:85, tulis:80, paparan:88, wawancara:90, integritas:92 },
  { nama:'Siti Nurhaliza',    psiko:78, tulis:82, paparan:80, wawancara:85, integritas:88 },
  { nama:'Ir. Dewi Rahayu',   psiko:75, tulis:76, paparan:79, wawancara:82, integritas:80 },
]
const KOMPONEN = ['Psikotes','Tes Tulis','Paparan','Wawancara','Integritas']
const BOBOT    = [20,20,20,25,15]
const COLORS   = ['#1E6AB5','#7C3AED','#059669','#D97706','#DC2626']
const P_COLORS = ['#FFD700','#C0C0C0','#CD7F32']

function nilaiAkhir(p: typeof PESERTA[0]) {
  return (p.psiko*20+p.tulis*20+p.paparan*20+p.wawancara*25+p.integritas*15)/100
}

export default function KPMLaporanPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="kpm" userName="Ketua KPM Kota Batu"
        userRole="KPM / RUPS" initials="KK" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Grafik & Statistik Seleksi"
          breadcrumb={[{label:'Portal KPM',href:'/kpm/dashboard'},{label:'Grafik & Statistik'}]}
          actions={
            <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-printer" style={{fontSize:'13px'}} /> Cetak Laporan
            </button>
          }
        />
        <div style={{padding:'24px'}}>
          {/* Stat summary */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'24px'}}>
            {[
              {label:'Total Peserta',      val:247, color:'#1E3A5F', bg:'#EBF2FA', icon:'ti-users'},
              {label:'Lulus Administrasi', val:198, color:'#059669', bg:'#ECFDF5', icon:'ti-check-circle'},
              {label:'Ikut UKK',           val:23,  color:'#2563EB', bg:'#EFF6FF', icon:'ti-chart-bar'},
              {label:'Nilai Tertinggi',    val:'86.5',color:'#D97706',bg:'#FFFBEB', icon:'ti-trophy'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'18px 20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,.04)',display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'42px',height:'42px',borderRadius:'12px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <i className={`ti ${s.icon}`} style={{fontSize:'21px',color:s.color}} />
                </div>
                <div>
                  <div style={{fontSize:'10px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
                  <div style={{fontSize:'1.8rem',fontWeight:'900',color:s.color,fontFamily:'Plus Jakarta Sans',lineHeight:1.1,marginTop:'3px'}}>{s.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'20px',marginBottom:'20px'}}>
            {/* Grafik batang nilai per komponen */}
            <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'20px'}}>Nilai Per Komponen – Top 3 Finalis</div>
              {PESERTA.map((p,pi)=>{
                const vals = [p.psiko,p.tulis,p.paparan,p.wawancara,p.integritas]
                const na   = nilaiAkhir(p)
                return (
                  <div key={pi} style={{marginBottom:pi<PESERTA.length-1?'22px':'0'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',background:`${P_COLORS[pi]}20`,border:`2px solid ${P_COLORS[pi]}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'900',color:P_COLORS[pi],flexShrink:0}}>
                        {pi+1}
                      </div>
                      <span style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',flex:1}}>{p.nama}</span>
                      <span style={{fontSize:'14px',fontWeight:'900',color:'#1E3A5F',fontFamily:'Plus Jakarta Sans'}}>{na.toFixed(1)}</span>
                    </div>
                    {vals.map((v,vi)=>(
                      <div key={vi} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'5px'}}>
                        <span style={{fontSize:'10px',color:'#94A3B8',width:'70px',flexShrink:0}}>{KOMPONEN[vi]}</span>
                        <div style={{flex:1,height:'10px',background:'#F1F5F9',borderRadius:'6px',overflow:'hidden'}}>
                          <div style={{height:'100%',width:`${v}%`,background:COLORS[vi],borderRadius:'6px',transition:'width .6s ease'}} />
                        </div>
                        <span style={{fontSize:'10px',fontWeight:'700',color:COLORS[vi],width:'24px',textAlign:'right'}}>{v}</span>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            {/* Distribusi tahapan */}
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px'}}>Distribusi Peserta per Tahapan</div>
                {[
                  {label:'Mendaftar',          val:247, total:247, color:'#1E3A5F'},
                  {label:'Lulus Adm.',          val:198, total:247, color:'#059669'},
                  {label:'Ikut UKK',            val:23,  total:247, color:'#2563EB'},
                  {label:'Wawancara KPM',       val:8,   total:247, color:'#7C3AED'},
                  {label:'Finalis',             val:3,   total:247, color:'#D97706'},
                ].map((s,i)=>(
                  <div key={i} style={{marginBottom:'10px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <span style={{fontSize:'12px',color:'#475569',fontWeight:'500'}}>{s.label}</span>
                      <span style={{fontSize:'12px',fontWeight:'800',color:s.color,fontFamily:'Plus Jakarta Sans'}}>{s.val}</span>
                    </div>
                    <div style={{height:'8px',background:'#F1F5F9',borderRadius:'6px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${s.val/s.total*100}%`,background:s.color,borderRadius:'6px',transition:'width .6s ease'}} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'18px',padding:'22px',color:'#fff'}}>
                <div style={{fontSize:'14px',fontWeight:'700',fontFamily:'Plus Jakarta Sans',marginBottom:'16px'}}>Rekap Nilai Final</div>
                {PESERTA.map((p,i)=>{
                  const na = nilaiAkhir(p)
                  return (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:i<PESERTA.length-1?'14px':'0'}}>
                      <span style={{fontSize:'13px',fontWeight:'900',color:P_COLORS[i],width:'20px',flexShrink:0}}>#{i+1}</span>
                      <span style={{fontSize:'12px',flex:1,color:'rgba(255,255,255,.85)'}}>{p.nama.split(',')[0]}</span>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:'18px',fontWeight:'900',fontFamily:'Plus Jakarta Sans',color:P_COLORS[i]}}>{na.toFixed(1)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bobot tabel */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',background:'#F8FAFC',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Tabel Nilai Akhir Lengkap</span>
              <span style={{fontSize:'12px',color:'#94A3B8'}}>Formula: Σ(Nilai × Bobot)/100</span>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    {['Rank','Nama',`Psikotes (${BOBOT[0]}%)`,`Tes Tulis (${BOBOT[1]}%)`,`Paparan (${BOBOT[2]}%)`,`Wawancara (${BOBOT[3]}%)`,`Integritas (${BOBOT[4]}%)`,'Nilai Akhir','Ket.'].map(h=>(
                      <th key={h} style={{padding:'10px 14px',textAlign:'center',fontSize:'10px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PESERTA.map((p,i)=>{
                    const vals = [p.psiko,p.tulis,p.paparan,p.wawancara,p.integritas]
                    const na   = nilaiAkhir(p)
                    return (
                      <tr key={i} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F8FAFC'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff'}}>
                        <td style={{padding:'13px 14px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{width:'32px',height:'32px',borderRadius:'50%',background:`${P_COLORS[i]}20`,border:`2px solid ${P_COLORS[i]}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'900',color:P_COLORS[i],margin:'0 auto'}}>
                            {i+1}
                          </div>
                        </td>
                        <td style={{padding:'13px 14px',fontSize:'13px',fontWeight:'600',color:'#1E293B',borderBottom:'1px solid #F1F5F9',whiteSpace:'nowrap'}}>{p.nama}</td>
                        {vals.map((v,vi)=>(
                          <td key={vi} style={{padding:'13px 14px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                            <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'38px',height:'26px',borderRadius:'7px',background:`${COLORS[vi]}15`,color:COLORS[vi],fontSize:'12px',fontWeight:'800'}}>{v}</div>
                          </td>
                        ))}
                        <td style={{padding:'13px 14px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'5px 14px',borderRadius:'10px',background:na>=80?'#1E6AB5':na>=70?'#059669':'#D97706',color:'#fff',fontSize:'14px',fontWeight:'900',fontFamily:'Plus Jakarta Sans'}}>
                            {na.toFixed(2)}
                          </div>
                        </td>
                        <td style={{padding:'13px 14px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',background:'#ECFDF5',color:'#059669',border:'1px solid #A7F3D0'}}>✓ Lulus</span>
                        </td>
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
