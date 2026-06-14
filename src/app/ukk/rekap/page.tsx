'use client'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/ukk/dashboard', icon:'ti-layout-dashboard', label:'Beranda',     section:'MENU' },
  { href:'/ukk/penilaian', icon:'ti-star',             label:'Input Nilai', section:'MENU' },
  { href:'/ukk/ranking',   icon:'ti-trophy',           label:'Ranking',     section:'MENU' },
  { href:'/ukk/rekap',     icon:'ti-table',            label:'Rekap Nilai', section:'LAPORAN' },
]

const DATA = [
  { no:1, nama:'Dr. Ahmad Fauzi, M.Kes.',   psiko:85, tulis:80, paparan:88, wawancara:90, integritas:92 },
  { no:2, nama:'Siti Nurhaliza, S.E., MM.', psiko:78, tulis:82, paparan:80, wawancara:85, integritas:88 },
  { no:3, nama:'Ir. Dewi Rahayu, M.T.',     psiko:75, tulis:76, paparan:79, wawancara:82, integritas:80 },
  { no:4, nama:'Budi Hartoyo, S.H.',         psiko:70, tulis:68, paparan:72, wawancara:75, integritas:74 },
  { no:5, nama:'Drs. Hendra Wijaya',         psiko:65, tulis:60, paparan:65, wawancara:68, integritas:70 },
]
const KOMP = [
  {key:'psiko',     label:'Psikotes',   bobot:20},
  {key:'tulis',     label:'Tes Tulis',  bobot:20},
  {key:'paparan',   label:'Paparan',    bobot:20},
  {key:'wawancara', label:'Wawancara',  bobot:25},
  {key:'integritas',label:'Integritas', bobot:15},
]
const nilaiAkhir = (r: typeof DATA[0]) =>
  (r.psiko*20+r.tulis*20+r.paparan*20+r.wawancara*25+r.integritas*15)/100

export default function RekapPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="ukk" userName="Koordinator UKK"
        userRole="Tim Penilai UKK" initials="KU" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Rekap Nilai UKK"
          breadcrumb={[{label:'Portal UKK',href:'/ukk/dashboard'},{label:'Rekap Nilai'}]}
          actions={
            <div style={{display:'flex',gap:'8px'}}>
              <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
                <i className="ti ti-file-type-pdf" style={{fontSize:'13px'}} /> Export PDF
              </button>
              <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#059669',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
                <i className="ti ti-table-export" style={{fontSize:'13px'}} /> Export Excel
              </button>
            </div>
          }
        />
        <div style={{padding:'24px'}}>
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',background:'#F8FAFC',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Rekap Nilai UKK – Seleksi Direksi Perumdam Among Tirta</span>
              <div style={{display:'flex',gap:'6px'}}>
                {KOMP.map((k,i)=>(
                  <span key={i} style={{fontSize:'10px',fontWeight:'600',padding:'2px 8px',borderRadius:'6px',background:`${['#EBF2FA','#F5F3FF','#ECFDF5','#FFFBEB','#FEF2F2'][i]}`,color:`${['#1E3A5F','#7C3AED','#059669','#D97706','#DC2626'][i]}`}}>
                    {k.label} {k.bobot}%
                  </span>
                ))}
              </div>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'11px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',width:'50px'}}>NO</th>
                    <th style={{padding:'11px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0'}}>NAMA PESERTA</th>
                    {KOMP.map(k=>(
                      <th key={k.key} style={{padding:'11px 14px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',whiteSpace:'nowrap'}}>
                        {k.label}<br/><span style={{fontWeight:'400',color:'#CBD5E1'}}>Bobot {k.bobot}%</span>
                      </th>
                    ))}
                    <th style={{padding:'11px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#1E3A5F',borderBottom:'1px solid #E2E8F0'}}>NILAI AKHIR</th>
                    <th style={{padding:'11px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0'}}>RANK</th>
                    <th style={{padding:'11px 16px',textAlign:'center',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0'}}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.map((p,i)=>{
                    const na   = nilaiAkhir(p)
                    const lulus = na >= 70
                    const vals = [p.psiko,p.tulis,p.paparan,p.wawancara,p.integritas]
                    const COLORS = ['#1E3A5F','#7C3AED','#059669','#D97706','#DC2626']
                    const MEDALS = ['#FFD700','#C0C0C0','#CD7F32']
                    return (
                      <tr key={i} style={{background:i<3?['#FAFFF8','#FAFCFF','#FFFDF8'][i]:'#fff'}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.filter='brightness(.97)'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.filter='none'}}>
                        <td style={{padding:'13px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'12px',fontWeight:'700',color:'#94A3B8'}}>{p.no}</span>
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9',fontWeight:'600',fontSize:'13px',color:'#1E293B'}}>{p.nama}</td>
                        {vals.map((v,vi)=>{
                          const c = v>=80?COLORS[vi]:v>=70?COLORS[vi]+'bb':v>=60?'#D97706':'#DC2626'
                          return (
                            <td key={vi} style={{padding:'13px 14px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                              <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'40px',height:'28px',borderRadius:'8px',background:`${c}15`,color:c,fontSize:'12px',fontWeight:'800'}}>{v}</div>
                            </td>
                          )
                        })}
                        <td style={{padding:'13px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'6px 16px',borderRadius:'10px',
                            background:na>=80?'#1E6AB5':na>=70?'#059669':'#DC2626',
                            color:'#fff',fontSize:'14px',fontWeight:'900',fontFamily:'Plus Jakarta Sans'}}>
                            {na.toFixed(2)}
                          </div>
                        </td>
                        <td style={{padding:'13px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          {i < 3 ? (
                            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:`${MEDALS[i]}20`,border:`2px solid ${MEDALS[i]}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',fontSize:'13px',fontWeight:'900',color:MEDALS[i]}}>
                              {i+1}
                            </div>
                          ) : (
                            <span style={{fontSize:'13px',color:'#94A3B8',fontWeight:'700'}}>#{i+1}</span>
                          )}
                        </td>
                        <td style={{padding:'13px 16px',textAlign:'center',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'11px',fontWeight:'700',padding:'4px 12px',borderRadius:'20px',
                            background:lulus?'#ECFDF5':'#FEF2F2',
                            color:lulus?'#059669':'#DC2626',
                            border:`1px solid ${lulus?'#A7F3D0':'#FECACA'}`}}>
                            {lulus?'✓ Lulus UKK':'✗ Tidak Lulus'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr style={{background:'#F8FAFC'}}>
                    <td colSpan={2} style={{padding:'12px 16px',fontSize:'12px',fontWeight:'700',color:'#64748B',borderTop:'2px solid #E2E8F0'}}>RATA-RATA KESELURUHAN</td>
                    {KOMP.map((k,ki)=>{
                      const vals = DATA.map(d=>(d as any)[k.key] as number)
                      const avg  = vals.reduce((a,b)=>a+b,0)/vals.length
                      return (
                        <td key={ki} style={{padding:'12px 14px',textAlign:'center',borderTop:'2px solid #E2E8F0'}}>
                          <span style={{fontSize:'12px',fontWeight:'800',color:'#475569'}}>{avg.toFixed(1)}</span>
                        </td>
                      )
                    })}
                    <td style={{padding:'12px 16px',textAlign:'center',borderTop:'2px solid #E2E8F0'}}>
                      <span style={{fontSize:'14px',fontWeight:'900',color:'#1E3A5F',fontFamily:'Plus Jakarta Sans'}}>
                        {(DATA.reduce((s,d)=>s+nilaiAkhir(d),0)/DATA.length).toFixed(2)}
                      </span>
                    </td>
                    <td colSpan={2} style={{borderTop:'2px solid #E2E8F0'}} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
