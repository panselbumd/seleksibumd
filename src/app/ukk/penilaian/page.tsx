'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const UKK_NAV = [
  { href:'/ukk/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',       section:'MENU' },
  { href:'/ukk/penilaian',  icon:'ti-star',             label:'Input Nilai',   section:'MENU' },
  { href:'/ukk/ranking',    icon:'ti-trophy',           label:'Ranking',       section:'MENU' },
  { href:'/ukk/rekap',      icon:'ti-table',            label:'Rekap Nilai',   section:'LAPORAN' },
]

const PESERTA = [
  { id:'P001', nama:'Dr. Ahmad Fauzi, M.Kes.',  jabatan:'Direktur Utama',    no:1 },
  { id:'P002', nama:'Ir. Dewi Rahayu, M.T.',    jabatan:'Direktur Keuangan', no:2 },
  { id:'P003', nama:'Siti Nurhaliza, S.E., MM.',jabatan:'Direktur Teknik',   no:3 },
  { id:'P004', nama:'Drs. Hendra Wijaya',        jabatan:'Direktur Umum',    no:4 },
  { id:'P005', nama:'Budi Hartoyo, S.H.',        jabatan:'Direktur Utama',   no:5 },
]

const KOMPONEN: { key:string; label:string; bobot:number; max:number; desc:string }[] = [
  { key:'psikotes',   label:'Psikotes',         bobot:20, max:100, desc:'Tes kepribadian, kemampuan, dan potensi' },
  { key:'tes_tulis',  label:'Tes Tulis',        bobot:20, max:100, desc:'Pengetahuan umum dan bidang terkait' },
  { key:'paparan',    label:'Paparan Makalah',  bobot:20, max:100, desc:'Presentasi makalah visi misi jabatan' },
  { key:'wawancara',  label:'Wawancara',        bobot:25, max:100, desc:'Wawancara mendalam oleh tim penilai' },
  { key:'integritas', label:'Integritas',       bobot:15, max:100, desc:'Penilaian rekam jejak dan integritas' },
]

type Nilai = Record<string, number|''>

export default function UKKPenilaianPage() {
  const [selected, setSelected]   = useState<typeof PESERTA[0]|null>(null)
  const [nilai, setNilai]         = useState<Nilai>({})
  const [saved, setSaved]         = useState<string[]>([])
  const [allSaved, setAllSaved]   = useState<Record<string,Nilai>>({})

  const pick = (p: typeof PESERTA[0]) => {
    setSelected(p)
    setSaved([])
    const existing = allSaved[p.id]
    setNilai(existing ?? {})
  }

  const setVal = (key:string, val:string) => {
    const n = val==='' ? '' : Math.min(100, Math.max(0, Number(val)))
    setNilai(prev => ({...prev, [key]:n}))
  }

  const nilaiAkhir = KOMPONEN.reduce((sum,k) => {
    const n = Number(nilai[k.key] ?? 0)
    return sum + (n * k.bobot / 100)
  }, 0)

  const isComplete = KOMPONEN.every(k => nilai[k.key] !== '' && nilai[k.key] !== undefined)

  const handleSimpan = () => {
    if (!selected || !isComplete) return
    setAllSaved(prev => ({...prev, [selected.id]: nilai}))
    setSaved(KOMPONEN.map(k=>k.key))
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="ukk" userName="Tim Penilai UKK"
        userRole="Penilai – Semua Komponen" initials="UP" navItems={UKK_NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />

      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Input Nilai UKK"
          breadcrumb={[{label:'Portal UKK',href:'/ukk/dashboard'},{label:'Input Nilai'}]} />

        <div style={{padding:'24px',flex:1,display:'flex',gap:'20px'}}>
          {/* Kiri: daftar peserta */}
          <div style={{width:'280px',flexShrink:0,display:'flex',flexDirection:'column',gap:'8px'}}>
            <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'4px'}}>
              Daftar Peserta UKK
            </div>
            {PESERTA.map(p=>{
              const isDone  = Boolean(allSaved[p.id])
              const isAct   = selected?.id===p.id
              return (
                <div key={p.id} onClick={()=>pick(p)} style={{
                  background: isAct ? '#EBF2FA' : isDone ? '#ECFDF5' : '#fff',
                  borderRadius:'14px', padding:'14px',
                  border:`1.5px solid ${isAct?'#1E6AB5':isDone?'#A7F3D0':'#E2E8F0'}`,
                  cursor:'pointer', transition:'all .15s',
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{
                      width:'34px',height:'34px',borderRadius:'10px',flexShrink:0,
                      background: isAct ? 'linear-gradient(135deg,#1E3A5F,#1E6AB5)' : isDone ? '#ECFDF5' : '#EBF2FA',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      color: isAct ? '#fff' : isDone ? '#059669' : '#1E3A5F',
                      fontSize:'13px',fontWeight:'700',
                    }}>
                      {isDone ? <span style={{fontSize:'16px'}}>✓</span> : p.no}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:'12px',fontWeight:'600',color:'#1E293B',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.nama}</div>
                      <div style={{fontSize:'10px',color:'#94A3B8'}}>{p.jabatan}</div>
                    </div>
                  </div>
                  {isDone && (
                    <div style={{marginTop:'8px',fontSize:'11px',fontWeight:'700',color:'#059669',display:'flex',alignItems:'center',gap:'4px'}}>
                      <i className="ti ti-check" style={{fontSize:'12px'}} />
                      Nilai: {KOMPONEN.reduce((s,k)=>s+(Number(allSaved[p.id]?.[k.key]??0)*k.bobot/100),0).toFixed(1)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Kanan: form nilai */}
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:'14px'}}>
            {!selected ? (
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'60px',textAlign:'center'}}>
                <i className="ti ti-star" style={{fontSize:'56px',color:'#CBD5E1',marginBottom:'16px'}} />
                <div style={{fontSize:'16px',fontWeight:'600',color:'#64748B',fontFamily:'Plus Jakarta Sans'}}>Pilih Peserta</div>
                <div style={{fontSize:'13px',color:'#94A3B8',marginTop:'6px'}}>Klik nama peserta untuk input nilai UKK</div>
              </div>
            ) : (
              <>
                {/* Peserta header */}
                <div style={{
                  background:'linear-gradient(135deg,#1E3A5F 0%,#1E6AB5 100%)',
                  borderRadius:'18px',padding:'20px 24px',color:'#fff',
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                }}>
                  <div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)'}}>Peserta #{selected.no} · {selected.id}</div>
                    <h2 style={{fontSize:'1.2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:'4px 0'}}>{selected.nama}</h2>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,.7)'}}>{selected.jabatan} · Perumdam Among Tirta</div>
                  </div>
                  {isComplete && (
                    <div style={{textAlign:'center',background:'rgba(255,255,255,.15)',padding:'14px 20px',borderRadius:'14px'}}>
                      <div style={{fontSize:'2.2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',lineHeight:1,color:nilaiAkhir>=70?'#6EE7B7':'#FCD34D'}}>
                        {nilaiAkhir.toFixed(1)}
                      </div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,.7)',marginTop:'3px'}}>Nilai Akhir</div>
                    </div>
                  )}
                </div>

                {/* Komponen nilai */}
                <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
                  <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Komponen Penilaian UKK</span>
                    <span style={{fontSize:'12px',color:'#94A3B8'}}>Total bobot: 100%</span>
                  </div>
                  {KOMPONEN.map((k,i)=>{
                    const val    = nilai[k.key]
                    const n      = Number(val??0)
                    const pct    = Math.round(n*k.bobot/100)
                    const barColor = n>=80?'#10B981':n>=70?'#3B82F6':n>=60?'#F59E0B':'#EF4444'
                    return (
                      <div key={k.key} style={{
                        padding:'16px 20px',
                        borderBottom: i<KOMPONEN.length-1 ? '1px solid #F8FAFC' : 'none',
                      }}>
                        <div style={{display:'flex',alignItems:'flex-start',gap:'16px'}}>
                          <div style={{flex:1}}>
                            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                              <span style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{k.label}</span>
                              <span style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',background:'#EBF2FA',color:'#1E3A5F'}}>
                                Bobot {k.bobot}%
                              </span>
                            </div>
                            <div style={{fontSize:'11px',color:'#94A3B8'}}>{k.desc}</div>
                            {/* Slider + progress */}
                            {val!==undefined && val!=='' && (
                              <div style={{marginTop:'10px'}}>
                                <div style={{height:'6px',background:'#F1F5F9',borderRadius:'4px',overflow:'hidden'}}>
                                  <div style={{height:'100%',width:`${n}%`,background:barColor,borderRadius:'4px',transition:'width .4s'}} />
                                </div>
                                <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>
                                  Kontribusi nilai akhir: <strong style={{color:barColor}}>{pct.toFixed(1)} poin</strong>
                                </div>
                              </div>
                            )}
                          </div>
                          <div style={{flexShrink:0,textAlign:'center'}}>
                            <input
                              type="number" min={0} max={100} value={val??''}
                              onChange={e=>setVal(k.key,e.target.value)}
                              placeholder="0–100"
                              style={{
                                width:'80px',padding:'10px',textAlign:'center',
                                fontSize:'1.2rem',fontWeight:'700',fontFamily:'Plus Jakarta Sans',
                                border:`2px solid ${val!==undefined&&val!=='' ? barColor : '#E2E8F0'}`,
                                borderRadius:'12px',outline:'none',
                                color: val!==undefined&&val!=='' ? barColor : '#94A3B8',
                                background: val!==undefined&&val!=='' ? barColor+'10' : '#F8FAFC',
                                transition:'all .2s',
                              }}
                            />
                            <div style={{fontSize:'9px',color:'#94A3B8',marginTop:'4px'}}>NILAI (0–100)</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Nilai akhir baris */}
                  <div style={{
                    padding:'16px 20px',background:'#F8FAFC',
                    borderTop:'2px solid #E2E8F0',
                    display:'flex',alignItems:'center',justifyContent:'space-between',
                  }}>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>Nilai Akhir (Weighted Average)</div>
                      <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>
                        Σ (Nilai × Bobot) / 100
                      </div>
                    </div>
                    <div style={{
                      fontSize:'2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',
                      color: nilaiAkhir>=70 ? '#059669' : nilaiAkhir>=60 ? '#D97706' : '#DC2626',
                    }}>
                      {isComplete ? nilaiAkhir.toFixed(2) : '—'}
                    </div>
                  </div>
                </div>

                {/* Tombol simpan */}
                <button onClick={handleSimpan} disabled={!isComplete}
                  style={{
                    padding:'13px 24px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
                    background: isComplete ? 'linear-gradient(135deg,#1E3A5F,#1E6AB5)' : '#E2E8F0',
                    color: isComplete ? '#fff' : '#94A3B8',
                    border:'none', cursor: isComplete ? 'pointer' : 'not-allowed',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                    boxShadow: isComplete ? '0 4px 16px rgba(30,106,181,.3)' : 'none',
                    transition:'all .15s',
                  }}>
                  <i className="ti ti-device-floppy" style={{fontSize:'17px'}} />
                  {isComplete ? 'Simpan Nilai Peserta' : `Lengkapi semua ${KOMPONEN.length} komponen terlebih dahulu`}
                </button>

                {saved.length===KOMPONEN.length && (
                  <div style={{
                    padding:'12px 16px',borderRadius:'12px',background:'#ECFDF5',
                    border:'1px solid #A7F3D0',color:'#059669',
                    fontSize:'13px',fontWeight:'600',display:'flex',alignItems:'center',gap:'8px',
                    animation:'slideUp .3s ease',
                  }}>
                    <i className="ti ti-check-circle" style={{fontSize:'18px'}} />
                    Nilai {selected.nama} berhasil disimpan. Nilai akhir: <strong>{nilaiAkhir.toFixed(2)}</strong>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
