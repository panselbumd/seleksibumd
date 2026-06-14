'use client'
import { useState } from 'react'
import Link from 'next/link'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const KPM_NAV = [
  { href:'/kpm/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',           section:'MENU' },
  { href:'/kpm/penetapan',  icon:'ti-certificate',      label:'Penetapan',         section:'MENU' },
  { href:'/kpm/laporan',    icon:'ti-chart-bar',        label:'Grafik & Statistik',section:'MENU' },
  { href:'/kpm/berita-acara',icon:'ti-writing',         label:'Berita Acara',      section:'MENU' },
  { href:'/kpm/sk',         icon:'ti-file-certificate', label:'SK Penetapan',      section:'DOKUMEN' },
]

const RANKING = [
  { rank:1, nama:'Dr. Ahmad Fauzi, M.Kes.',   jabatan:'Direktur Utama',    nilai:86.45, rekomendasi:'Sangat Direkomendasikan', status:'menunggu' },
  { rank:2, nama:'Siti Nurhaliza, S.E., MM.', jabatan:'Direktur Keuangan', nilai:82.30, rekomendasi:'Direkomendasikan',        status:'menunggu' },
  { rank:3, nama:'Ir. Dewi Rahayu, M.T.',     jabatan:'Direktur Teknik',   nilai:78.80, rekomendasi:'Direkomendasikan',        status:'menunggu' },
]

const TAHAPAN_SELESAI = [
  { tahap:'Pengumuman Seleksi',       tanggal:'1 Jun 2025',  status:'selesai' },
  { tahap:'Pendaftaran & Upload',     tanggal:'1–15 Jun 2025',status:'selesai' },
  { tahap:'Verifikasi Administrasi',  tanggal:'16–20 Jun 2025',status:'selesai' },
  { tahap:'Psikotes & Tes Tulis',     tanggal:'25 Jun 2025',  status:'selesai' },
  { tahap:'Paparan Makalah',          tanggal:'1 Jul 2025',   status:'selesai' },
  { tahap:'Wawancara KPM',            tanggal:'5 Jul 2025',   status:'aktif' },
  { tahap:'Penetapan oleh KPM',       tanggal:'10 Jul 2025',  status:'akan' },
  { tahap:'Pengumuman Hasil Akhir',   tanggal:'12 Jul 2025',  status:'akan' },
]

export default function KPMDashboard() {
  const [penetapan, setPenetapan] = useState<Record<string,string>>({})
  const [showModal, setShowModal] = useState<typeof RANKING[0]|null>(null)

  const setKeputusan = (id:string, val:string) => {
    setPenetapan(prev => ({...prev, [id]:val}))
    setShowModal(null)
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="kpm" userName="Ketua KPM" userRole="Kepala KPM Kota Batu"
        initials="KK" navItems={KPM_NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />

      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Dashboard Eksekutif KPM"
          breadcrumb={[{label:'Portal KPM'},{label:'Dashboard Eksekutif'}]}
          actions={
            <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',
              background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',
              display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-file-certificate" style={{fontSize:'13px'}} /> Buat SK Penetapan
            </button>
          }
        />

        <div style={{padding:'24px'}}>
          {/* Hero banner */}
          <div style={{
            background:'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 60%, #3EBB8F 100%)',
            borderRadius:'20px',padding:'28px 32px',marginBottom:'24px',
            display:'flex',alignItems:'center',justifyContent:'space-between',
            position:'relative',overflow:'hidden',
          }}>
            <div style={{position:'absolute',top:-40,right:-40,width:'220px',height:'220px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
            <div style={{position:'absolute',bottom:-30,right:120,width:'100px',height:'100px',borderRadius:'50%',background:'rgba(255,255,255,.04)'}} />
            <div style={{position:'relative'}}>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',marginBottom:'6px',display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10B981',display:'inline-block',animation:'pulse 2s infinite'}} />
                Seleksi Aktif – Tahap Wawancara KPM
              </div>
              <h1 style={{fontSize:'1.6rem',fontWeight:'800',color:'#fff',fontFamily:'Plus Jakarta Sans',margin:'0 0 6px'}}>
                Dashboard Eksekutif KPM
              </h1>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,.7)',margin:0}}>
                Seleksi Direksi Perumdam Among Tirta Kota Batu · Periode 2025
              </p>
            </div>
            <div style={{display:'flex',gap:'20px',position:'relative'}}>
              {[
                {val:'247', label:'Total Peserta'},
                {val:'3',   label:'Finalis'},
                {val:'85%', label:'Progres'},
              ].map((s,i)=>(
                <div key={i} style={{textAlign:'center',padding:'12px 20px',background:'rgba(255,255,255,.12)',borderRadius:'14px',backdropFilter:'blur(8px)'}}>
                  <div style={{fontSize:'1.8rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',lineHeight:1}}>{s.val}</div>
                  <div style={{fontSize:'11px',color:'rgba(255,255,255,.65)',marginTop:'3px'}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:'20px'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              {/* Ranking Final */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Ranking Final Peserta</span>
                  <Link href="/kpm/laporan" style={{textDecoration:'none',fontSize:'12px',color:'#1E6AB5',fontWeight:'600',display:'flex',alignItems:'center',gap:'4px'}}>
                    Grafik Detail <i className="ti ti-arrow-right" style={{fontSize:'12px'}} />
                  </Link>
                </div>
                {RANKING.map((p,i)=>{
                  const kep = penetapan[p.nama]
                  const medalColor = ['#FFD700','#C0C0C0','#CD7F32'][i]
                  return (
                    <div key={i} style={{
                      padding:'16px 20px',
                      borderBottom: i<RANKING.length-1 ? '1px solid #F8FAFC' : 'none',
                      background: kep==='ditetapkan' ? '#F0FDF4' : kep==='ditolak' ? '#FFF8F8' : '#fff',
                    }}>
                      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                        {/* Medal */}
                        <div style={{
                          width:'44px',height:'44px',borderRadius:'50%',flexShrink:0,
                          background:`${medalColor}20`,border:`3px solid ${medalColor}`,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:'16px',fontWeight:'900',color:medalColor,fontFamily:'Plus Jakarta Sans',
                        }}>#{p.rank}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{p.nama}</div>
                          <div style={{fontSize:'11px',color:'#94A3B8'}}>{p.jabatan}</div>
                          <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'6px'}}>
                            {/* Bar */}
                            <div style={{flex:1,height:'5px',background:'#F1F5F9',borderRadius:'3px',overflow:'hidden'}}>
                              <div style={{height:'100%',width:`${p.nilai}%`,background:'linear-gradient(90deg,#1E6AB5,#3EBB8F)',borderRadius:'3px'}} />
                            </div>
                            <span style={{fontSize:'12px',fontWeight:'800',color:'#1E3A5F',fontFamily:'Plus Jakarta Sans'}}>{p.nilai}</span>
                          </div>
                          <div style={{fontSize:'10px',color:'#94A3B8',marginTop:'3px'}}>{p.rekomendasi}</div>
                        </div>
                        <div style={{flexShrink:0}}>
                          {kep ? (
                            <span style={{
                              fontSize:'11px',fontWeight:'700',padding:'5px 12px',borderRadius:'20px',
                              background: kep==='ditetapkan' ? '#ECFDF5' : '#FEF2F2',
                              color:      kep==='ditetapkan' ? '#059669' : '#DC2626',
                              border:`1px solid ${kep==='ditetapkan'?'#A7F3D0':'#FECACA'}`,
                            }}>
                              {kep==='ditetapkan' ? '✓ Ditetapkan' : '✗ Ditolak'}
                            </span>
                          ) : (
                            <button onClick={()=>setShowModal(p)} style={{
                              padding:'7px 14px',borderRadius:'10px',fontSize:'12px',fontWeight:'600',
                              background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',
                              border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',
                              boxShadow:'0 2px 8px rgba(30,106,181,.3)',
                            }}>
                              <i className="ti ti-gavel" style={{fontSize:'13px'}} /> Tetapkan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Grafik Nilai - simple bars */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px'}}>Grafik Nilai per Komponen</div>
                {RANKING.map((p,pi)=>(
                  <div key={pi} style={{marginBottom:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#1E293B',marginBottom:'8px'}}>
                      #{p.rank} {p.nama.split(',')[0]}
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                      {[
                        {label:'Psikotes',   val:85, bobot:20},
                        {label:'Tes Tulis',  val:80, bobot:20},
                        {label:'Paparan',    val:88, bobot:20},
                        {label:'Wawancara',  val:90, bobot:25},
                        {label:'Integritas', val:92, bobot:15},
                      ].map((k,ki)=>{
                        const adj = pi===1 ? k.val-4 : pi===2 ? k.val-7 : k.val
                        const color = ['#1E6AB5','#7C3AED','#059669','#D97706','#EF4444'][ki]
                        return (
                          <div key={ki} style={{display:'flex',alignItems:'center',gap:'8px'}}>
                            <span style={{fontSize:'10px',color:'#94A3B8',width:'70px',flexShrink:0}}>{k.label}</span>
                            <div style={{flex:1,height:'10px',background:'#F1F5F9',borderRadius:'6px',overflow:'hidden'}}>
                              <div style={{height:'100%',width:`${adj}%`,background:color,borderRadius:'6px',transition:'width .6s ease'}} />
                            </div>
                            <span style={{fontSize:'10px',fontWeight:'700',color,width:'24px',textAlign:'right'}}>{adj}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan */}
            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              {/* Timeline */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9'}}>
                  <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Timeline Seleksi</span>
                </div>
                <div style={{padding:'16px 20px'}}>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute',left:'15px',top:0,bottom:0,width:'2px',background:'#E2E8F0'}} />
                    {TAHAPAN_SELESAI.map((t,i)=>(
                      <div key={i} style={{display:'flex',gap:'14px',marginBottom:'14px',position:'relative'}}>
                        <div style={{
                          width:'32px',height:'32px',borderRadius:'50%',flexShrink:0,
                          background: t.status==='selesai' ? '#10B981' : t.status==='aktif' ? '#1E6AB5' : '#E2E8F0',
                          display:'flex',alignItems:'center',justifyContent:'center',
                          border: t.status==='aktif' ? '3px solid #BFDBFE' : 'none',
                          position:'relative',zIndex:1,
                        }}>
                          {t.status==='selesai'
                            ? <i className="ti ti-check" style={{fontSize:'14px',color:'#fff'}} />
                            : t.status==='aktif'
                            ? <i className="ti ti-loader-2" style={{fontSize:'14px',color:'#fff'}} />
                            : <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#CBD5E1'}} />
                          }
                        </div>
                        <div style={{flex:1,paddingTop:'4px'}}>
                          <div style={{fontSize:'12px',fontWeight:t.status==='aktif'?'700':'600',
                            color: t.status==='aktif' ? '#1E3A5F' : t.status==='selesai' ? '#334155' : '#94A3B8'}}>
                            {t.tahap}
                          </div>
                          <div style={{fontSize:'10px',color:'#94A3B8',marginTop:'2px'}}>{t.tanggal}</div>
                          {t.status==='aktif' && (
                            <span style={{fontSize:'10px',fontWeight:'700',color:'#2563EB',background:'#EFF6FF',padding:'2px 8px',borderRadius:'6px',marginTop:'4px',display:'inline-block'}}>
                              Sedang Berlangsung
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'14px'}}>Aksi KPM</div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {href:'/kpm/penetapan',  icon:'ti-gavel',           label:'Proses Penetapan',     desc:'Tetapkan / Tolak kandidat',   color:'#1E3A5F', bg:'#EBF2FA'},
                    {href:'/kpm/berita-acara',icon:'ti-writing',         label:'Generate Berita Acara',desc:'PDF & DOCX otomatis',         color:'#7C3AED', bg:'#F5F3FF'},
                    {href:'/kpm/sk',         icon:'ti-file-certificate', label:'SK Penetapan',         desc:'Buat Surat Keputusan',        color:'#059669', bg:'#ECFDF5'},
                    {href:'/kpm/laporan',    icon:'ti-chart-bar',        label:'Laporan Lengkap',      desc:'Statistik & grafik detail',   color:'#D97706', bg:'#FFFBEB'},
                  ].map((item,i)=>(
                    <Link key={i} href={item.href} style={{textDecoration:'none'}}>
                      <div style={{
                        padding:'12px 14px',borderRadius:'12px',border:'1px solid #E2E8F0',
                        display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',transition:'all .15s',
                      }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=item.bg;(e.currentTarget as HTMLElement).style.borderColor=item.color+'40'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff';(e.currentTarget as HTMLElement).style.borderColor='#E2E8F0'}}
                      >
                        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:item.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                          <i className={`ti ${item.icon}`} style={{fontSize:'18px',color:item.color}} />
                        </div>
                        <div>
                          <div style={{fontSize:'12px',fontWeight:'700',color:'#1E293B'}}>{item.label}</div>
                          <div style={{fontSize:'11px',color:'#94A3B8'}}>{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Penetapan */}
      {showModal && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)'}}>
          <div style={{background:'#fff',borderRadius:'20px',width:'460px',overflow:'hidden',boxShadow:'0 24px 48px rgba(0,0,0,.18)',animation:'slideUp .3s ease'}}>
            <div style={{padding:'20px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>
                <i className="ti ti-gavel" style={{marginRight:'8px',color:'#1E6AB5'}} />
                Penetapan Kandidat
              </span>
              <button onClick={()=>setShowModal(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#94A3B8',fontSize:'18px'}}>&times;</button>
            </div>
            <div style={{padding:'24px'}}>
              <div style={{background:'#EBF2FA',borderRadius:'14px',padding:'16px 20px',marginBottom:'20px'}}>
                <div style={{fontSize:'12px',color:'#1E6AB5',marginBottom:'4px'}}>Kandidat Peringkat #{showModal.rank}</div>
                <div style={{fontSize:'16px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{showModal.nama}</div>
                <div style={{fontSize:'12px',color:'#64748B',marginTop:'3px'}}>{showModal.jabatan}</div>
                <div style={{fontSize:'1.6rem',fontWeight:'900',color:'#1E3A5F',fontFamily:'Plus Jakarta Sans',marginTop:'8px'}}>{showModal.nilai} <span style={{fontSize:'12px',fontWeight:'400',color:'#94A3B8'}}>/ 100</span></div>
              </div>
              <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px',lineHeight:1.7}}>
                Sebagai Ketua KPM, Anda memiliki kewenangan untuk menetapkan atau menolak kandidat ini sebagai pejabat terpilih.
              </p>
              <div style={{display:'flex',gap:'12px'}}>
                <button onClick={()=>setKeputusan(showModal.nama,'ditetapkan')} style={{
                  flex:1,padding:'12px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',
                  background:'linear-gradient(135deg,#059669,#10B981)',color:'#fff',border:'none',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
                  boxShadow:'0 4px 12px rgba(5,150,105,.3)',
                }}>
                  <i className="ti ti-check-circle" style={{fontSize:'16px'}} /> Tetapkan
                </button>
                <button onClick={()=>setKeputusan(showModal.nama,'ditolak')} style={{
                  flex:1,padding:'12px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',
                  background:'linear-gradient(135deg,#DC2626,#EF4444)',color:'#fff',border:'none',cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
                  boxShadow:'0 4px 12px rgba(220,38,38,.3)',
                }}>
                  <i className="ti ti-x-circle" style={{fontSize:'16px'}} /> Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
