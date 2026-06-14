'use client'
import { useState } from 'react'
import Link from 'next/link'

const BUMD = [
  {
    id:'perumdam', nama:'Perumdam Among Tirta', singkat:'Perumdam Among Tirta',
    jenis:'Perusahaan Umum Daerah (Perumda)', sk:'Perda No.4 Tahun 2011',
    bidang:'Pengelolaan Air Minum', modal:'Rp 45,2 Miliar', pelanggan:'28.450',
    direksi:[{nama:'Dr. H. Samsul Hadi, M.M.', jabatan:'Direktur Utama'},{nama:'Ir. Rini Astuti, M.T.', jabatan:'Direktur Teknik'},{nama:'Drs. Bambang Setiawan', jabatan:'Direktur Keuangan'}],
    komisaris:[{nama:'H. Imam Buchori, S.H.', jabatan:'Komisaris Utama'},{nama:'Dra. Sri Wahyuni, M.Si.', jabatan:'Komisaris'}],
    color:'#1E3A5F', bg:'#EBF2FA', icon:'ti-droplet',
  },
  {
    id:'bpr', nama:'PT BPR Bank Batu', singkat:'PT BPR Bank Batu',
    jenis:'Perseroan Daerah (Perseroda)', sk:'Perda No.7 Tahun 2008',
    bidang:'Perbankan & Keuangan Daerah', modal:'Rp 28,5 Miliar', pelanggan:'12.300',
    direksi:[{nama:'Drs. Eko Prasetyo, M.M.', jabatan:'Direktur Utama'},{nama:'Dra. Siti Aminah, M.Si.', jabatan:'Direktur Kepatuhan'}],
    komisaris:[{nama:'H. Ahmad Fauzan, S.H.', jabatan:'Komisaris Utama'},{nama:'Dr. Lestari Wulandari', jabatan:'Komisaris Independen'}],
    color:'#7C3AED', bg:'#F5F3FF', icon:'ti-building-bank',
  },
  {
    id:'pasar', nama:'PD Pasar Kota Batu', singkat:'PD Pasar Kota Batu',
    jenis:'Perusahaan Daerah (PD)', sk:'Perda No.2 Tahun 2005',
    bidang:'Pengelolaan Pasar Tradisional', modal:'Rp 12,8 Miliar', pelanggan:'3.200',
    direksi:[{nama:'Drs. Heru Santosa, M.M.', jabatan:'Direktur Utama'}],
    komisaris:[{nama:'H. Sugeng Raharjo', jabatan:'Komisaris Utama'}],
    color:'#D97706', bg:'#FFFBEB', icon:'ti-building-store',
  },
]

function PublicHeader() {
  return (
    <header style={{background:'#1E3A5F',padding:'0 32px',display:'flex',alignItems:'center',height:'60px',gap:'16px',position:'sticky',top:0,zIndex:50}}>
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

export default function ProfilBUMDPage() {
  const [active, setActive] = useState('perumdam')
  const bumd = BUMD.find(b=>b.id===active)!

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC'}}>
      <PublicHeader />
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${bumd.color}ee,${bumd.color}bb)`,padding:'40px 32px 60px',position:'relative',overflow:'hidden',transition:'background .4s'}}>
        <div style={{position:'absolute',top:-40,right:-40,width:'240px',height:'240px',borderRadius:'50%',background:'rgba(255,255,255,.06)'}} />
        <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',marginBottom:'8px'}}>
            <Link href="/" style={{textDecoration:'none',color:'rgba(255,255,255,.6)'}}>Beranda</Link>
            {' → '}<span style={{color:'#fff'}}>Profil BUMD</span>
          </div>
          <h1 style={{fontSize:'2rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'6px'}}>Profil BUMD Kota Batu</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.75)'}}>Badan Usaha Milik Daerah Pemerintah Kota Batu</p>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'32px 16px'}}>
        {/* Tab BUMD */}
        <div style={{display:'flex',gap:'10px',marginBottom:'28px',flexWrap:'wrap'}}>
          {BUMD.map(b=>(
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

        {/* Konten */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'20px',animation:'fadeIn .3s ease'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {/* Info utama */}
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{background:`linear-gradient(135deg,${bumd.color}12,${bumd.color}06)`,padding:'20px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'52px',height:'52px',borderRadius:'16px',background:bumd.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <i className={`ti ${bumd.icon}`} style={{fontSize:'26px',color:bumd.color}} />
                </div>
                <div>
                  <h2 style={{fontSize:'1.2rem',fontWeight:'900',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:0}}>{bumd.nama}</h2>
                  <div style={{fontSize:'12px',color:'#64748B',marginTop:'3px'}}>{bumd.jenis}</div>
                </div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'}}>
                  {[['Dasar Hukum',bumd.sk],['Bidang Usaha',bumd.bidang],['Modal Dasar',bumd.modal],['Jumlah Pelanggan',bumd.pelanggan]].map(([l,v])=>(
                    <div key={l} style={{padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                      <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'4px'}}>{l}</div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direksi */}
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{padding:'16px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'8px'}}>
                <i className="ti ti-users" style={{fontSize:'18px',color:bumd.color}} />
                <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Susunan Direksi</span>
              </div>
              <div style={{padding:'16px 24px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {bumd.direksi.map((d,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'12px',background:`linear-gradient(135deg,${bumd.color},${bumd.color}aa)`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'14px',fontWeight:'800',flexShrink:0}}>
                      {d.nama.replace(/[.,]/g,'').split(' ').filter((w:string)=>!['Dr','Ir','Drs','MM','SE','SH','MT','MSi','MPd','H'].includes(w)).slice(0,2).map((w:string)=>w[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{d.nama}</div>
                      <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'1px'}}>{d.jabatan}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Komisaris */}
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{padding:'16px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'8px'}}>
                <i className="ti ti-shield-check" style={{fontSize:'18px',color:bumd.color}} />
                <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Dewan Komisaris</span>
              </div>
              <div style={{padding:'16px 24px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {bumd.komisaris.map((k,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'12px',background:`${bumd.color}20`,display:'flex',alignItems:'center',justifyContent:'center',color:bumd.color,fontSize:'14px',fontWeight:'800',flexShrink:0}}>
                      {k.nama.replace(/[.,]/g,'').split(' ').filter((w:string)=>!['H','Drs','Dr','Ir'].includes(w)).slice(0,2).map((w:string)=>w[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B'}}>{k.nama}</div>
                      <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'1px'}}>{k.jabatan}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – info seleksi */}
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:`linear-gradient(135deg,${bumd.color},${bumd.color}bb)`,borderRadius:'20px',padding:'22px',color:'#fff'}}>
              <div style={{fontSize:'13px',fontWeight:'700',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
                <i className="ti ti-certificate" style={{fontSize:'16px'}} /> Seleksi Aktif
              </div>
              <div style={{fontSize:'15px',fontWeight:'800',fontFamily:'Plus Jakarta Sans',lineHeight:1.3,marginBottom:'12px'}}>Seleksi Direksi {bumd.singkat} Periode 2025</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.75)',marginBottom:'16px'}}>Pendaftaran dibuka s.d. 15 Juli 2025</div>
              <Link href="/register" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'10px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'rgba(255,255,255,.2)',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,.3)',backdropFilter:'blur(8px)'}}>
                <i className="ti ti-user-plus" /> Daftar Seleksi
              </Link>
            </div>
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'12px'}}>
                <i className="ti ti-info-circle" style={{marginRight:'6px',color:bumd.color}} />Informasi Kontak
              </div>
              {[['Alamat','Jl. Panglima Sudirman No.507, Kota Batu'],['Telepon','(0341) 512223'],['Email',`info@${bumd.id}.batukota.go.id`],['Website',`www.${bumd.id}.batukota.go.id`]].map(([l,v])=>(
                <div key={l} style={{display:'flex',gap:'10px',marginBottom:'10px',fontSize:'12px'}}>
                  <span style={{color:'#94A3B8',width:'60px',flexShrink:0}}>{l}</span>
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
