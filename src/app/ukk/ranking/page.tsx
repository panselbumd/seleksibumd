'use client'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const UKK_NAV = [
  { href:'/ukk/dashboard', icon:'ti-layout-dashboard', label:'Beranda',     section:'MENU' },
  { href:'/ukk/penilaian', icon:'ti-star',             label:'Input Nilai', section:'MENU' },
  { href:'/ukk/ranking',   icon:'ti-trophy',           label:'Ranking',     section:'MENU' },
  { href:'/ukk/rekap',     icon:'ti-table',            label:'Rekap Nilai', section:'LAPORAN' },
]

const DATA = [
  { rank:1, nama:'Dr. Ahmad Fauzi, M.Kes.',   jabatan:'Direktur Utama',    psiko:85, tulis:80, paparan:88, wawancara:90, integritas:92, lulus:true },
  { rank:2, nama:'Siti Nurhaliza, S.E., MM.', jabatan:'Direktur Keuangan', psiko:78, tulis:82, paparan:80, wawancara:85, integritas:88, lulus:true },
  { rank:3, nama:'Ir. Dewi Rahayu, M.T.',     jabatan:'Direktur Teknik',   psiko:75, tulis:76, paparan:79, wawancara:82, integritas:80, lulus:true },
  { rank:4, nama:'Budi Hartoyo, S.H.',         jabatan:'Direktur Umum',    psiko:70, tulis:68, paparan:72, wawancara:75, integritas:74, lulus:false },
  { rank:5, nama:'Drs. Hendra Wijaya',         jabatan:'Direktur Teknik',  psiko:65, tulis:60, paparan:65, wawancara:68, integritas:70, lulus:false },
]

const KOMP = [
  { key:'psiko',     label:'Psikotes',   bobot:20 },
  { key:'tulis',     label:'Tes Tulis',  bobot:20 },
  { key:'paparan',   label:'Paparan',    bobot:20 },
  { key:'wawancara', label:'Wawancara',  bobot:25 },
  { key:'integritas',label:'Integritas', bobot:15 },
]

function nilaiAkhir(r: typeof DATA[0]) {
  return (r.psiko*20 + r.tulis*20 + r.paparan*20 + r.wawancara*25 + r.integritas*15) / 100
}

const RANK_COLORS = ['#FFD700','#C0C0C0','#CD7F32']
const RANK_BG     = ['#FFFBEB','#F8FAFC','#FFF7ED']

export default function RankingPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="ukk" userName="Tim Penilai UKK"
        userRole="Koordinator Penilai" initials="KU" navItems={UKK_NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />

      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Ranking UKK"
          breadcrumb={[{label:'Portal UKK',href:'/ukk/dashboard'},{label:'Ranking'}]}
          actions={
            <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',
              background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',
              display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-download" style={{fontSize:'13px'}} /> Export PDF
            </button>
          }
        />

        <div style={{padding:'24px'}}>
          {/* Header cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'24px'}}>
            {[
              { label:'Total Peserta UKK', value:DATA.length,  icon:'ti-users',    color:'#1E3A5F', bg:'#EBF2FA' },
              { label:'Lulus UKK',         value:DATA.filter(d=>d.lulus).length, icon:'ti-check-circle', color:'#059669', bg:'#ECFDF5' },
              { label:'Tidak Lulus',       value:DATA.filter(d=>!d.lulus).length, icon:'ti-x-circle',   color:'#DC2626', bg:'#FEF2F2' },
              { label:'Nilai Tertinggi',   value:nilaiAkhir(DATA[0]).toFixed(1),  icon:'ti-trophy',     color:'#D97706', bg:'#FFFBEB' },
            ].map((s,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'18px 20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.06em'}}>{s.label}</div>
                  <div style={{width:'36px',height:'36px',borderRadius:'10px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <i className={`ti ${s.icon}`} style={{fontSize:'18px',color:s.color}} />
                  </div>
                </div>
                <div style={{fontSize:'2rem',fontWeight:'800',color:s.color,fontFamily:'Plus Jakarta Sans',marginTop:'6px'}}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Podium top 3 */}
          <div style={{background:'linear-gradient(135deg,#1E3A5F 0%,#1E6AB5 100%)',borderRadius:'20px',padding:'28px 32px',marginBottom:'20px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-40,right:-40,width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
            <h2 style={{fontSize:'16px',fontWeight:'800',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'20px',position:'relative'}}>
              <i className="ti ti-trophy" style={{marginRight:'8px',color:'#FFD700'}} />
              Top 3 Peserta UKK Terbaik
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',position:'relative'}}>
              {DATA.slice(0,3).map((p,i)=>(
                <div key={i} style={{
                  background:'rgba(255,255,255,.12)',backdropFilter:'blur(10px)',
                  borderRadius:'16px',padding:'20px',textAlign:'center',
                  border:`1px solid rgba(255,255,255,.15)`,
                  transform: i===0 ? 'scale(1.04)' : 'scale(1)',
                }}>
                  <div style={{
                    width:'48px',height:'48px',borderRadius:'50%',margin:'0 auto 12px',
                    background: RANK_COLORS[i]+'30', border:`3px solid ${RANK_COLORS[i]}`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:'20px',fontWeight:'900',color:RANK_COLORS[i],
                    fontFamily:'Plus Jakarta Sans',
                  }}>#{p.rank}</div>
                  <div style={{fontSize:'13px',fontWeight:'700',color:'#fff',marginBottom:'4px'}}>{p.nama}</div>
                  <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)',marginBottom:'12px'}}>{p.jabatan}</div>
                  <div style={{fontSize:'2rem',fontWeight:'900',color:RANK_COLORS[i],fontFamily:'Plus Jakarta Sans',lineHeight:1}}>
                    {nilaiAkhir(p).toFixed(1)}
                  </div>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',marginTop:'3px'}}>Nilai Akhir</div>
                </div>
              ))}
            </div>
          </div>

          {/* Full table */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Rekap Nilai Seluruh Peserta</span>
              <span style={{fontSize:'12px',color:'#94A3B8'}}>Seleksi Direksi Perumdam Among Tirta · 2025</span>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'10px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0',width:'50px'}}>NO</th>
                    <th style={{padding:'10px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#64748B',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0'}}>PESERTA</th>
                    {KOMP.map(k=>(
                      <th key={k.key} style={{padding:'10px 12px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',letterSpacing:'0.04em',borderBottom:'1px solid #E2E8F0',whiteSpace:'nowrap'}}>
                        {k.label}<br/><span style={{fontWeight:'400',color:'#CBD5E1'}}>{k.bobot}%</span>
                      </th>
                    ))}
                    <th style={{padding:'10px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#1E3A5F',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0'}}>NILAI AKHIR</th>
                    <th style={{padding:'10px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',letterSpacing:'0.06em',borderBottom:'1px solid #E2E8F0'}}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.map((p,i)=>{
                    const na    = nilaiAkhir(p)
                    const rowBg = RANK_BG[i] ?? '#fff'
                    return (
                      <tr key={i} style={{background:rowBg, transition:'background .1s'}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F1F5F9'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=rowBg}}>
                        <td style={{padding:'14px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{
                            width:'30px',height:'30px',borderRadius:'50%',margin:'0 auto',
                            background: p.rank<=3 ? RANK_COLORS[p.rank-1]+'20' : '#F1F5F9',
                            border: p.rank<=3 ? `2px solid ${RANK_COLORS[p.rank-1]}` : '2px solid #E2E8F0',
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:'12px',fontWeight:'800',
                            color: p.rank<=3 ? RANK_COLORS[p.rank-1] : '#94A3B8',
                          }}>#{p.rank}</div>
                        </td>
                        <td style={{padding:'14px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{p.nama}</div>
                          <div style={{fontSize:'11px',color:'#94A3B8'}}>{p.jabatan}</div>
                        </td>
                        {[p.psiko,p.tulis,p.paparan,p.wawancara,p.integritas].map((n,j)=>{
                          const c = n>=80?'#059669':n>=70?'#2563EB':n>=60?'#D97706':'#DC2626'
                          return (
                            <td key={j} style={{padding:'14px 12px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                              <div style={{
                                display:'inline-flex',alignItems:'center',justifyContent:'center',
                                width:'40px',height:'28px',borderRadius:'8px',
                                background:c+'15',color:c,
                                fontSize:'12px',fontWeight:'700',
                              }}>{n}</div>
                            </td>
                          )
                        })}
                        <td style={{padding:'14px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{
                            display:'inline-flex',alignItems:'center',justifyContent:'center',
                            padding:'5px 14px',borderRadius:'10px',
                            background: na>=70 ? '#059669' : na>=60 ? '#D97706' : '#DC2626',
                            color:'#fff',fontSize:'13px',fontWeight:'800',fontFamily:'Plus Jakarta Sans',
                          }}>{na.toFixed(1)}</div>
                        </td>
                        <td style={{padding:'14px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{
                            fontSize:'11px',fontWeight:'700',padding:'4px 12px',borderRadius:'20px',
                            background: p.lulus ? '#ECFDF5' : '#FEF2F2',
                            color:      p.lulus ? '#059669' : '#DC2626',
                            border:`1px solid ${p.lulus ? '#A7F3D0' : '#FECACA'}`,
                          }}>
                            {p.lulus ? '✓ Lulus UKK' : '✗ Tidak Lulus'}
                          </span>
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
