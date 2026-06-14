'use client'
import { useState } from 'react'
import Link from 'next/link'

const BLUD = [
  {
    id:'rsud', nama:'RSUD Kota Batu', singkat:'RSUD Kota Batu',
    jenis:'Badan Layanan Umum Daerah', kelas:'Kelas C',
    layanan:'Rawat Inap, Rawat Jalan, IGD 24 Jam, Bedah, Kebidanan',
    tempat_tidur:'120 TT', staff:'350 orang', blud_sejak:'2015',
    dewas:[{nama:'Dr. H. Susilo, Sp.PD.', jabatan:'Ketua Dewan Pengawas'},{nama:'Dr. Endah Wulandari', jabatan:'Anggota Dewan Pengawas'}],
    color:'#0E6B44', bg:'#EDFAF4', icon:'ti-building-hospital',
  },
  {
    id:'puskesmas-batu', nama:'Puskesmas Kec. Batu', singkat:'Puskesmas Batu',
    jenis:'BLUD Puskesmas', kelas:'Puskesmas Rawat Inap',
    layanan:'Kesehatan Dasar, KIA, Imunisasi, Gizi, Kesling',
    tempat_tidur:'10 TT', staff:'85 orang', blud_sejak:'2018',
    dewas:[{nama:'Dr. Hj. Rahmawati, M.Kes.', jabatan:'Ketua Dewan Pengawas'},{nama:'Drs. Sugeng Priyono', jabatan:'Anggota Dewan Pengawas'}],
    color:'#0891B2', bg:'#ECFEFF', icon:'ti-stethoscope',
  },
  {
    id:'puskesmas-bumiaji', nama:'Puskesmas Kec. Bumiaji', singkat:'Puskesmas Bumiaji',
    jenis:'BLUD Puskesmas', kelas:'Puskesmas Rawat Jalan',
    layanan:'Kesehatan Dasar, Prolanis, UGD, Laboratorium',
    tempat_tidur:'5 TT', staff:'62 orang', blud_sejak:'2019',
    dewas:[{nama:'Dr. Bambang Irianto, M.M.', jabatan:'Ketua Dewan Pengawas'}],
    color:'#1EA870', bg:'#EDFAF4', icon:'ti-heart-rate-monitor',
  },
]

function PublicHeader() {
  return (
    <header style={{background:'#0E6B44',padding:'0 32px',display:'flex',alignItems:'center',height:'60px',gap:'16px',position:'sticky',top:0,zIndex:50}}>
      <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{color:'#fff',fontWeight:'900',fontSize:'13px',fontFamily:'Plus Jakarta Sans'}}>S</span>
        </div>
        <span style={{fontWeight:'800',fontSize:'14px',color:'#fff',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA</span>
      </Link>
      <div style={{flex:1}} />
      {[['Beranda','/'],['Profil BUMD','/portal/profil-bumd'],['Profil BLUD','/portal/profil-blud'],['Pengumuman','/portal/pengumuman'],['Jadwal','/portal/jadwal'],['FAQ','/portal/faq']].map(([l,h])=>(
        <Link key={h} href={h} style={{textDecoration:'none',fontSize:'13px',padding:'6px 12px',borderRadius:'8px',color:'rgba(255,255,255,.8)',fontWeight:'500'}}>{l}</Link>
      ))}
      <Link href="/login" style={{textDecoration:'none',padding:'7px 16px',borderRadius:'10px',background:'rgba(255,255,255,.15)',color:'#fff',fontSize:'13px',fontWeight:'600',border:'1px solid rgba(255,255,255,.2)'}}>Masuk</Link>
    </header>
  )
}

export default function ProfilBLUDPage() {
  const [active, setActive] = useState('rsud')
  const blud = BLUD.find(b=>b.id===active)!

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC'}}>
      <PublicHeader />
      <div style={{background:`linear-gradient(135deg,${blud.color}ee,${blud.color}bb)`,padding:'40px 32px 56px',transition:'background .4s',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-40,right:-40,width:'220px',height:'220px',borderRadius:'50%',background:'rgba(255,255,255,.06)'}} />
        <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',marginBottom:'8px'}}>
            <Link href="/" style={{textDecoration:'none',color:'rgba(255,255,255,.6)'}}>Beranda</Link>
            {' → '}<span style={{color:'#fff'}}>Profil BLUD</span>
          </div>
          <h1 style={{fontSize:'2rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'6px'}}>Profil BLUD Kota Batu</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.75)'}}>Badan Layanan Umum Daerah Pemerintah Kota Batu</p>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 16px'}}>
        <div style={{display:'flex',gap:'10px',marginBottom:'28px',flexWrap:'wrap'}}>
          {BLUD.map(b=>(
            <button key={b.id} onClick={()=>setActive(b.id)} style={{
              padding:'10px 20px',borderRadius:'14px',fontSize:'13px',fontWeight:'700',cursor:'pointer',transition:'all .2s',
              background: active===b.id ? b.color : '#fff',
              color:      active===b.id ? '#fff'  : '#64748B',
              border:`2px solid ${active===b.id ? b.color : '#E2E8F0'}`,
              boxShadow: active===b.id ? `0 4px 14px ${b.color}40` : 'none',
              display:'flex',alignItems:'center',gap:'8px',
            }}>
              <i className={`ti ${b.icon}`} style={{fontSize:'16px'}} />
              {b.singkat}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'20px',animation:'fadeIn .3s ease'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{background:`linear-gradient(135deg,${blud.color}12,${blud.color}06)`,padding:'20px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'52px',height:'52px',borderRadius:'16px',background:blud.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <i className={`ti ${blud.icon}`} style={{fontSize:'26px',color:blud.color}} />
                </div>
                <div>
                  <h2 style={{fontSize:'1.2rem',fontWeight:'900',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:0}}>{blud.nama}</h2>
                  <div style={{fontSize:'12px',color:'#64748B',marginTop:'3px'}}>{blud.jenis} · {blud.kelas}</div>
                </div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'}}>
                  {[['Kelas Fasilitas',blud.kelas],['BLUD Sejak',blud.blud_sejak],['Kapasitas TT',blud.tempat_tidur],['Jumlah Staff',blud.staff]].map(([l,v])=>(
                    <div key={l} style={{padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                      <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'4px'}}>{l}</div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:'14px',padding:'14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                  <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'6px'}}>Layanan Tersedia</div>
                  <div style={{fontSize:'13px',fontWeight:'500',color:'#1E293B',lineHeight:1.6}}>{blud.layanan}</div>
                </div>
              </div>
            </div>

            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{padding:'16px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'8px'}}>
                <i className="ti ti-shield-check" style={{fontSize:'18px',color:blud.color}} />
                <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Dewan Pengawas BLUD</span>
              </div>
              <div style={{padding:'16px 24px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {blud.dewas.map((d,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'12px',background:`linear-gradient(135deg,${blud.color},${blud.color}aa)`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'14px',fontWeight:'800',flexShrink:0}}>
                      {d.nama.replace(/[.,]/g,'').split(' ').filter((w:string)=>!['Dr','H','Hj','Drs'].includes(w)).slice(0,2).map((w:string)=>w[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{d.nama}</div>
                      <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'1px'}}>{d.jabatan}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:`linear-gradient(135deg,${blud.color},${blud.color}bb)`,borderRadius:'20px',padding:'22px',color:'#fff'}}>
              <div style={{fontSize:'13px',fontWeight:'700',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
                <i className="ti ti-certificate" style={{fontSize:'16px'}} /> Seleksi Dewan Pengawas
              </div>
              <div style={{fontSize:'15px',fontWeight:'800',fontFamily:'Plus Jakarta Sans',lineHeight:1.3,marginBottom:'12px'}}>
                Seleksi Dewan Pengawas {blud.singkat} Periode 2025
              </div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.75)',marginBottom:'16px'}}>Pendaftaran dibuka s.d. 18 Juli 2025</div>
              <Link href="/register" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'10px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'rgba(255,255,255,.2)',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,.3)'}}>
                <i className="ti ti-user-plus" /> Daftar Seleksi
              </Link>
            </div>
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'12px'}}>
                <i className="ti ti-map-pin" style={{marginRight:'6px',color:blud.color}} />Lokasi & Kontak
              </div>
              {[['Alamat','Jl. Sudirman No.4, Kota Batu'],['Telepon','(0341) 512444'],['Email',`info@${blud.id.replace('-','')}.batukota.go.id`],['Jam Pelayanan','24 Jam']].map(([l,v])=>(
                <div key={l} style={{display:'flex',gap:'10px',marginBottom:'10px',fontSize:'12px'}}>
                  <span style={{color:'#94A3B8',width:'70px',flexShrink:0}}>{l}</span>
                  <span style={{color:'#475569',flex:1}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer style={{background:'#1E293B',padding:'24px 32px',textAlign:'center',marginTop:'40px'}}>
        <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
      </footer>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
