'use client'
import Link from 'next/link'

const SELEKSI = [
  {
    nama:'Seleksi Direksi Perumdam Among Tirta',
    kategori:'BUMD', color:'#1E3A5F', bg:'#EBF2FA',
    tahapan:[
      { nama:'Pengumuman & Pendaftaran', tgl:'1 – 15 Jun 2025',  status:'selesai' },
      { nama:'Verifikasi Administrasi',  tgl:'16 – 20 Jun 2025', status:'selesai' },
      { nama:'Pengumuman Hasil Adm.',    tgl:'22 Jun 2025',      status:'selesai' },
      { nama:'Psikotes',                 tgl:'25 Jun 2025',      status:'aktif'   },
      { nama:'Tes Tulis',                tgl:'27 Jun 2025',      status:'akan'    },
      { nama:'Paparan Makalah',          tgl:'1 Jul 2025',       status:'akan'    },
      { nama:'Wawancara KPM',            tgl:'5 Jul 2025',       status:'akan'    },
      { nama:'Pengumuman Hasil Akhir',   tgl:'12 Jul 2025',      status:'akan'    },
    ],
  },
  {
    nama:'Seleksi Komisaris PT BPR Bank Batu',
    kategori:'BUMD', color:'#7C3AED', bg:'#F5F3FF',
    tahapan:[
      { nama:'Pengumuman & Pendaftaran', tgl:'10 – 20 Jun 2025', status:'selesai' },
      { nama:'Verifikasi Administrasi',  tgl:'21 – 25 Jun 2025', status:'aktif'   },
      { nama:'Pengumuman Hasil Adm.',    tgl:'27 Jun 2025',      status:'akan'    },
      { nama:'UKK (Psikotes + Tes)',     tgl:'1 Jul 2025',       status:'akan'    },
      { nama:'Wawancara KPM',            tgl:'5 Jul 2025',       status:'akan'    },
      { nama:'Penetapan',                tgl:'10 Jul 2025',      status:'akan'    },
    ],
  },
  {
    nama:'Seleksi Dewan Pengawas RSUD Kota Batu',
    kategori:'BLUD', color:'#0E6B44', bg:'#EDFAF4',
    tahapan:[
      { nama:'Pengumuman & Pendaftaran', tgl:'5 – 18 Jun 2025',  status:'selesai' },
      { nama:'Verifikasi Administrasi',  tgl:'19 – 23 Jun 2025', status:'selesai' },
      { nama:'UKK',                      tgl:'28 Jun 2025',      status:'aktif'   },
      { nama:'Wawancara KPM',            tgl:'3 Jul 2025',       status:'akan'    },
      { nama:'Penetapan',                tgl:'8 Jul 2025',       status:'akan'    },
    ],
  },
]

const ST_CFG: Record<string,{icon:string;color:string;bg:string;label:string}> = {
  selesai: { icon:'ti-check',       color:'#059669', bg:'#10B981', label:'Selesai'   },
  aktif:   { icon:'ti-loader-2',    color:'#2563EB', bg:'#1E6AB5', label:'Berlangsung' },
  akan:    { icon:'ti-clock-hour-4',color:'#94A3B8', bg:'#E2E8F0', label:'Akan Datang' },
}

export default function JadwalPage() {
  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC'}}>
      {/* Topbar */}
      <header style={{background:'#1E3A5F',padding:'0 32px',display:'flex',alignItems:'center',height:'60px',gap:'16px'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#fff',fontWeight:'900',fontSize:'13px',fontFamily:'Plus Jakarta Sans'}}>S</span>
          </div>
          <span style={{fontWeight:'800',fontSize:'14px',color:'#fff',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA</span>
        </Link>
        <div style={{flex:1}} />
        {[['Beranda','/'],['Pengumuman','/portal/pengumuman'],['Jadwal','/portal/jadwal'],['FAQ','/portal/faq']].map(([l,h])=>(
          <Link key={h} href={h} style={{textDecoration:'none',fontSize:'13px',padding:'6px 12px',borderRadius:'8px',color:'rgba(255,255,255,.8)',fontWeight:'500'}}>{l}</Link>
        ))}
        <Link href="/login" style={{textDecoration:'none',padding:'7px 16px',borderRadius:'10px',background:'rgba(255,255,255,.15)',color:'#fff',fontSize:'13px',fontWeight:'600',border:'1px solid rgba(255,255,255,.2)'}}>Masuk</Link>
      </header>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',padding:'40px 32px 56px',position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto',position:'relative'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',marginBottom:'8px'}}>
            <Link href="/" style={{textDecoration:'none',color:'rgba(255,255,255,.6)'}}>Beranda</Link>
            {' '}<i className="ti ti-chevron-right" style={{fontSize:'11px'}} />{' '}
            <span style={{color:'#fff'}}>Jadwal Seleksi</span>
          </div>
          <h1 style={{fontSize:'2rem',fontWeight:'800',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Jadwal Tahapan Seleksi</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.7)'}}>Timeline lengkap seluruh proses seleksi BUMD dan BLUD Kota Batu</p>
        </div>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'32px 16px'}}>
        {/* Legend */}
        <div style={{display:'flex',gap:'16px',marginBottom:'28px',flexWrap:'wrap'}}>
          {Object.entries(ST_CFG).map(([k,v])=>(
            <div key={k} style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'12px',color:'#64748B',fontWeight:'500'}}>
              <div style={{width:'10px',height:'10px',borderRadius:'50%',background:v.bg}} />
              {v.label}
            </div>
          ))}
        </div>

        {/* Seleksi cards */}
        {SELEKSI.map((sel,si)=>(
          <div key={si} style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{
              padding:'18px 24px',
              background:`linear-gradient(135deg,${sel.color}15,${sel.color}08)`,
              borderBottom:'1px solid #F1F5F9',
              display:'flex',alignItems:'center',gap:'12px',
            }}>
              <div style={{
                width:'42px',height:'42px',borderRadius:'12px',
                background:sel.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
              }}>
                <i className={`ti ${sel.kategori==='BUMD'?'ti-building-factory-2':'ti-building-hospital'}`}
                  style={{fontSize:'22px',color:sel.color}} />
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontSize:'15px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:0}}>{sel.nama}</h3>
                <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',
                  background:sel.kategori==='BUMD'?'#EBF2FA':'#EDFAF4',
                  color:sel.kategori==='BUMD'?'#1E3A5F':'#0E6B44',marginTop:'4px',display:'inline-block'}}>
                  {sel.kategori}
                </span>
              </div>
              {/* Progress indicator */}
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:'11px',color:'#94A3B8',marginBottom:'4px'}}>
                  {sel.tahapan.filter(t=>t.status==='selesai').length}/{sel.tahapan.length} tahap selesai
                </div>
                <div style={{width:'120px',height:'6px',background:'#F1F5F9',borderRadius:'4px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${Math.round(sel.tahapan.filter(t=>t.status==='selesai').length/sel.tahapan.length*100)}%`,background:sel.color,borderRadius:'4px'}} />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{padding:'20px 24px'}}>
              <div style={{position:'relative'}}>
                <div style={{position:'absolute',left:'17px',top:'20px',bottom:'20px',width:'2px',background:'#E2E8F0'}} />
                {sel.tahapan.map((t,ti)=>{
                  const cfg = ST_CFG[t.status]
                  return (
                    <div key={ti} style={{display:'flex',gap:'16px',marginBottom: ti<sel.tahapan.length-1 ? '16px' : '0',position:'relative'}}>
                      <div style={{
                        width:'36px',height:'36px',borderRadius:'50%',flexShrink:0,
                        background: t.status==='selesai' ? '#10B981' : t.status==='aktif' ? '#1E6AB5' : '#E2E8F0',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        position:'relative',zIndex:1,
                        border: t.status==='aktif' ? '3px solid #BFDBFE' : t.status==='selesai' ? 'none' : '2px solid #CBD5E1',
                        boxShadow: t.status==='aktif' ? '0 0 0 4px rgba(30,106,181,.1)' : 'none',
                      }}>
                        {t.status==='selesai'
                          ? <i className="ti ti-check" style={{fontSize:'16px',color:'#fff'}} />
                          : t.status==='aktif'
                          ? <i className="ti ti-loader-2" style={{fontSize:'14px',color:'#fff'}} />
                          : <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#CBD5E1'}} />
                        }
                      </div>
                      <div style={{flex:1,paddingTop:'6px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
                          <span style={{
                            fontSize:'13px',fontWeight: t.status==='aktif' ? '700' : '600',
                            color: t.status==='akan' ? '#94A3B8' : '#1E293B',
                          }}>{t.nama}</span>
                          {t.status==='aktif' && (
                            <span style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',background:'#EFF6FF',color:'#2563EB',animation:'pulse 2s infinite'}}>
                              Sedang Berlangsung
                            </span>
                          )}
                        </div>
                        <div style={{fontSize:'12px',color:'#94A3B8',marginTop:'3px',display:'flex',alignItems:'center',gap:'5px'}}>
                          <i className="ti ti-calendar" style={{fontSize:'12px'}} />{t.tgl}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer style={{background:'#1E293B',padding:'24px 32px',textAlign:'center',marginTop:'20px'}}>
        <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
      </footer>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
