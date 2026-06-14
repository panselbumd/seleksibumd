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

const KANDIDAT = [
  { rank:1, nama:'Dr. Ahmad Fauzi, M.Kes.',   jabatan:'Direktur Utama',    nilai:86.45, lulus_ukk:true,  rekomendasi:'Sangat Direkomendasikan' },
  { rank:2, nama:'Siti Nurhaliza, S.E., MM.', jabatan:'Direktur Keuangan', nilai:82.30, lulus_ukk:true,  rekomendasi:'Direkomendasikan'        },
  { rank:3, nama:'Ir. Dewi Rahayu, M.T.',     jabatan:'Direktur Teknik',   nilai:78.80, lulus_ukk:true,  rekomendasi:'Direkomendasikan'        },
]

export default function PenetapanPage() {
  const [keputusan, setKeputusan] = useState<Record<number,string>>({})
  const [catatan,   setCatatan]   = useState<Record<number,string>>({})
  const [confirm,   setConfirm]   = useState<typeof KANDIDAT[0]|null>(null)
  const [finalAction, setFinalAction] = useState<'ditetapkan'|'ditolak'|null>(null)

  const doAction = (k: typeof KANDIDAT[0], act: 'ditetapkan'|'ditolak') => {
    setKeputusan(p=>({...p,[k.rank]:act}))
    setConfirm(null)
  }
  const allDecided = KANDIDAT.every(k=>keputusan[k.rank])
  const anyDitetapkan = Object.values(keputusan).includes('ditetapkan')

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="kpm" userName="Ketua KPM Kota Batu"
        userRole="KPM / RUPS" initials="KK" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Proses Penetapan"
          breadcrumb={[{label:'Portal KPM',href:'/kpm/dashboard'},{label:'Penetapan'}]} />
        <div style={{padding:'24px',maxWidth:'900px'}}>

          {/* Header */}
          <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'20px',padding:'22px 28px',marginBottom:'24px',color:'#fff',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-30,right:-30,width:'160px',height:'160px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
            <div style={{position:'relative'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:'0 0 4px'}}>Proses Penetapan Pejabat</h2>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,.7)',margin:0}}>Seleksi Direksi Perumdam Among Tirta Kota Batu · Periode 2025</p>
              <div style={{display:'flex',gap:'16px',marginTop:'14px'}}>
                {[
                  {val:KANDIDAT.length, label:'Total Finalis'},
                  {val:Object.values(keputusan).filter(v=>v==='ditetapkan').length, label:'Ditetapkan'},
                  {val:Object.values(keputusan).filter(v=>v==='ditolak').length, label:'Ditolak'},
                ].map((s,i)=>(
                  <div key={i} style={{padding:'8px 16px',borderRadius:'10px',background:'rgba(255,255,255,.12)',textAlign:'center'}}>
                    <div style={{fontSize:'1.4rem',fontWeight:'900',fontFamily:'Plus Jakarta Sans'}}>{s.val}</div>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,.65)'}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kandidat list */}
          <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'24px'}}>
            {KANDIDAT.map(k=>{
              const kep = keputusan[k.rank]
              const MEDAL = ['#FFD700','#C0C0C0','#CD7F32']
              const mc = MEDAL[k.rank-1]
              return (
                <div key={k.rank} style={{
                  background: kep==='ditetapkan'?'#F0FDF4':kep==='ditolak'?'#FFF8F8':'#fff',
                  borderRadius:'18px',padding:'22px 24px',
                  border:`2px solid ${kep==='ditetapkan'?'#A7F3D0':kep==='ditolak'?'#FECACA':'#E2E8F0'}`,
                  boxShadow:'0 1px 3px rgba(0,0,0,.04)',transition:'all .2s',
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:'18px'}}>
                    {/* Medal */}
                    <div style={{width:'52px',height:'52px',borderRadius:'50%',flexShrink:0,background:`${mc}20`,border:`3px solid ${mc}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:'900',color:mc,fontFamily:'Plus Jakarta Sans'}}>
                      #{k.rank}
                    </div>
                    {/* Info */}
                    <div style={{flex:1}}>
                      <div style={{fontSize:'15px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'3px'}}>{k.nama}</div>
                      <div style={{fontSize:'12px',color:'#64748B',marginBottom:'8px'}}>{k.jabatan}</div>
                      {/* Nilai bar */}
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{flex:1,height:'7px',background:'#F1F5F9',borderRadius:'4px',overflow:'hidden'}}>
                          <div style={{height:'100%',width:`${k.nilai}%`,background:`linear-gradient(90deg,#1E6AB5,#3EBB8F)`,borderRadius:'4px'}} />
                        </div>
                        <span style={{fontSize:'14px',fontWeight:'900',color:'#1E3A5F',fontFamily:'Plus Jakarta Sans',width:'40px',textAlign:'right'}}>{k.nilai}</span>
                        <span style={{fontSize:'11px',color:'#94A3B8',fontWeight:'500'}}>/100</span>
                      </div>
                      <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>{k.rekomendasi} · UKK: {k.lulus_ukk?'✓ Lulus':'✗ Tidak Lulus'}</div>
                    </div>
                    {/* Keputusan */}
                    <div style={{flexShrink:0,textAlign:'right'}}>
                      {kep ? (
                        <div>
                          <span style={{
                            display:'inline-flex',alignItems:'center',gap:'5px',
                            fontSize:'12px',fontWeight:'800',padding:'7px 16px',borderRadius:'20px',
                            background:kep==='ditetapkan'?'#ECFDF5':'#FEF2F2',
                            color:kep==='ditetapkan'?'#059669':'#DC2626',
                            border:`1.5px solid ${kep==='ditetapkan'?'#A7F3D0':'#FECACA'}`,
                          }}>
                            <i className={`ti ${kep==='ditetapkan'?'ti-check-circle':'ti-x-circle'}`} style={{fontSize:'14px'}} />
                            {kep==='ditetapkan'?'DITETAPKAN':'DITOLAK'}
                          </span>
                          <button onClick={()=>{const n={...keputusan};delete n[k.rank];setKeputusan(n)}}
                            style={{display:'block',margin:'6px 0 0 auto',fontSize:'11px',color:'#94A3B8',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>
                            Ubah Keputusan
                          </button>
                        </div>
                      ):(
                        <div style={{display:'flex',gap:'8px'}}>
                          <button onClick={()=>setConfirm({...k,_action:'ditetapkan'} as any)}
                            style={{padding:'9px 18px',borderRadius:'12px',fontSize:'12px',fontWeight:'700',background:'linear-gradient(135deg,#059669,#10B981)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',boxShadow:'0 3px 10px rgba(5,150,105,.25)'}}>
                            <i className="ti ti-check-circle" style={{fontSize:'14px'}} /> Tetapkan
                          </button>
                          <button onClick={()=>doAction(k,'ditolak')}
                            style={{padding:'9px 14px',borderRadius:'12px',fontSize:'12px',fontWeight:'700',background:'#FEF2F2',color:'#DC2626',border:'1px solid #FECACA',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
                            <i className="ti ti-x-circle" style={{fontSize:'14px'}} /> Tolak
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Catatan */}
                  {!kep && (
                    <div style={{marginTop:'14px',paddingTop:'14px',borderTop:'1px solid #F1F5F9'}}>
                      <textarea value={catatan[k.rank]||''} onChange={e=>setCatatan(p=>({...p,[k.rank]:e.target.value}))}
                        placeholder="Catatan pertimbangan (opsional)..."
                        rows={2} style={{width:'100%',padding:'9px 12px',borderRadius:'10px',fontSize:'12px',border:'1px solid #E2E8F0',outline:'none',resize:'vertical',fontFamily:'Inter,sans-serif',color:'#475569',boxSizing:'border-box'}} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Finalize */}
          {allDecided && (
            <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'22px 24px',boxShadow:'0 4px 16px rgba(0,0,0,.08)',animation:'slideUp .3s ease'}}>
              <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'14px',display:'flex',alignItems:'center',gap:'6px'}}>
                <i className="ti ti-gavel" style={{fontSize:'18px',color:'#1E6AB5'}} /> Finalisasi Keputusan KPM
              </div>
              <p style={{fontSize:'13px',color:'#64748B',marginBottom:'16px',lineHeight:1.6}}>
                Seluruh kandidat telah dinilai. Klik tombol di bawah untuk menerbitkan Berita Acara Penetapan dan SK secara otomatis.
              </p>
              {!finalAction ? (
                <button onClick={()=>setFinalAction('ditetapkan')}
                  style={{padding:'12px 28px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px',boxShadow:'0 4px 14px rgba(30,106,181,.3)'}}>
                  <i className="ti ti-file-certificate" style={{fontSize:'17px'}} /> Finalisasi & Generate BA + SK
                </button>
              ):(
                <div style={{padding:'14px 18px',borderRadius:'12px',background:'#ECFDF5',border:'1px solid #A7F3D0',display:'flex',alignItems:'center',gap:'10px'}}>
                  <i className="ti ti-check-circle" style={{fontSize:'22px',color:'#059669'}} />
                  <div>
                    <div style={{fontSize:'13px',fontWeight:'700',color:'#065F46'}}>Penetapan berhasil difinalisasi!</div>
                    <div style={{fontSize:'12px',color:'#047857',marginTop:'2px'}}>Berita Acara dan SK Penetapan sedang digenerate. Dokumen tersedia dalam 2–3 menit.</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Confirm modal */}
      {confirm && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)'}}>
          <div style={{background:'#fff',borderRadius:'20px',width:'420px',padding:'28px',boxShadow:'0 24px 48px rgba(0,0,0,.2)',animation:'slideUp .3s ease'}}>
            <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',boxShadow:'0 0 0 8px rgba(16,185,129,.1)'}}>
              <i className="ti ti-check" style={{fontSize:'28px',color:'#fff'}} />
            </div>
            <h3 style={{textAlign:'center',fontSize:'16px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:'0 0 8px'}}>Konfirmasi Penetapan</h3>
            <p style={{textAlign:'center',fontSize:'13px',color:'#64748B',margin:'0 0 20px',lineHeight:1.6}}>
              Anda akan menetapkan <strong>{confirm.nama}</strong> sebagai <strong>{confirm.jabatan}</strong> Perumdam Among Tirta Kota Batu.
            </p>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setConfirm(null)} style={{flex:1,padding:'11px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',background:'#F1F5F9',color:'#475569',border:'none',cursor:'pointer'}}>Batal</button>
              <button onClick={()=>doAction(confirm,'ditetapkan')} style={{flex:2,padding:'11px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#059669,#10B981)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',boxShadow:'0 4px 12px rgba(5,150,105,.3)'}}>
                <i className="ti ti-gavel" style={{fontSize:'15px'}} /> Ya, Tetapkan
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
