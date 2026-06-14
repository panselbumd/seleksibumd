'use client'
import { useState } from 'react'
import Link from 'next/link'

const DATA = [
  { id:1, judul:'Pengumuman Seleksi Direksi Perumdam Among Tirta Kota Batu Tahun 2025',      instansi:'Perumdam Among Tirta', tipe:'Direksi',     tanggal:'1 Jun 2025', status:'Aktif',      file:true,  kategori:'BUMD' },
  { id:2, judul:'Pengumuman Hasil Seleksi Administrasi Komisaris PT BPR Bank Batu',          instansi:'PT BPR Bank Batu',     tipe:'Komisaris',   tanggal:'16 Jun 2025',status:'Aktif',      file:true,  kategori:'BUMD' },
  { id:3, judul:'Jadwal Pelaksanaan UKK Dewan Pengawas RSUD Kota Batu',                      instansi:'RSUD Kota Batu',       tipe:'Dewan Pengawas',tanggal:'20 Jun 2025',status:'Akan Datang',file:false, kategori:'BLUD' },
  { id:4, judul:'Pengumuman Peserta yang Lulus Seleksi Administrasi – Dewan Pengawas BLUD',  instansi:'BLUD Kota Batu',       tipe:'Dewan Pengawas',tanggal:'18 Jun 2025',status:'Aktif',      file:true,  kategori:'BLUD' },
  { id:5, judul:'Undangan Wawancara KPM – Seleksi Direksi Perumdam Among Tirta',             instansi:'Perumdam Among Tirta', tipe:'Direksi',     tanggal:'5 Jul 2025', status:'Akan Datang',file:false, kategori:'BUMD' },
  { id:6, judul:'Pengumuman Penetapan Direksi PD Pasar Kota Batu Hasil Seleksi 2024',        instansi:'PD Pasar Kota Batu',   tipe:'Direksi',     tanggal:'1 Apr 2025', status:'Selesai',    file:true,  kategori:'BUMD' },
]

export default function PengumumanPage() {
  const [search, setSearch]     = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [tipe, setTipe]         = useState('Semua')

  const filtered = DATA.filter(d => {
    const q = search.toLowerCase()
    const matchQ = !q || d.judul.toLowerCase().includes(q) || d.instansi.toLowerCase().includes(q)
    const matchK = kategori==='Semua' || d.kategori===kategori
    const matchT = tipe==='Semua' || d.tipe===tipe
    return matchQ && matchK && matchT
  })

  const statusColor: Record<string,{bg:string;color:string}> = {
    'Aktif':       {bg:'#ECFDF5',color:'#059669'},
    'Akan Datang': {bg:'#EFF6FF',color:'#2563EB'},
    'Selesai':     {bg:'#F1F5F9',color:'#64748B'},
  }

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC'}}>
      {/* Topbar simple */}
      <header style={{background:'#1E3A5F',padding:'0 32px',display:'flex',alignItems:'center',height:'60px',gap:'16px'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#fff',fontWeight:'900',fontSize:'13px',fontFamily:'Plus Jakarta Sans'}}>S</span>
          </div>
          <span style={{fontWeight:'800',fontSize:'14px',color:'#fff',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA</span>
        </Link>
        <div style={{flex:1}} />
        <nav style={{display:'flex',gap:'4px'}}>
          {[['Beranda','/'],['Profil BUMD','/portal/profil-bumd'],['Pengumuman','/portal/pengumuman'],['Jadwal','/portal/jadwal'],['FAQ','/portal/faq']].map(([l,h])=>(
            <Link key={h} href={h} style={{textDecoration:'none',fontSize:'13px',padding:'6px 12px',borderRadius:'8px',color:'rgba(255,255,255,.8)',fontWeight:'500'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.1)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}
            >{l}</Link>
          ))}
        </nav>
        <Link href="/login" style={{textDecoration:'none',padding:'7px 16px',borderRadius:'10px',background:'rgba(255,255,255,.15)',color:'#fff',fontSize:'13px',fontWeight:'600',border:'1px solid rgba(255,255,255,.2)'}}>Masuk</Link>
      </header>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',padding:'40px 32px 60px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-40,right:-40,width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
        <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,.6)',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
            <Link href="/" style={{textDecoration:'none',color:'rgba(255,255,255,.6)'}}>Beranda</Link>
            <i className="ti ti-chevron-right" style={{fontSize:'11px'}} />
            <span style={{color:'#fff'}}>Pengumuman</span>
          </div>
          <h1 style={{fontSize:'2rem',fontWeight:'800',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Pengumuman Seleksi</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.7)'}}>Informasi resmi seleksi BUMD dan BLUD Pemerintah Kota Batu</p>
          {/* Search */}
          <div style={{marginTop:'24px',position:'relative',maxWidth:'500px'}}>
            <i className="ti ti-search" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:'#94A3B8'}} />
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Cari pengumuman..."
              style={{width:'100%',padding:'12px 14px 12px 42px',borderRadius:'14px',fontSize:'14px',border:'none',outline:'none',background:'rgba(255,255,255,.95)',boxSizing:'border-box'}}
            />
          </div>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 16px'}}>
        {/* Filters */}
        <div style={{display:'flex',gap:'12px',marginBottom:'24px',flexWrap:'wrap',alignItems:'center'}}>
          <span style={{fontSize:'13px',fontWeight:'600',color:'#475569'}}>Filter:</span>
          <div style={{display:'flex',gap:'6px'}}>
            {['Semua','BUMD','BLUD'].map(k=>(
              <button key={k} onClick={()=>setKategori(k)} style={{
                padding:'5px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',cursor:'pointer',
                background: kategori===k ? '#1E3A5F' : '#fff',
                color:      kategori===k ? '#fff' : '#64748B',
                border:`1px solid ${kategori===k?'#1E3A5F':'#E2E8F0'}`,
              }}>{k}</button>
            ))}
          </div>
          <div style={{display:'flex',gap:'6px'}}>
            {['Semua','Direksi','Komisaris','Dewan Pengawas'].map(t=>(
              <button key={t} onClick={()=>setTipe(t)} style={{
                padding:'5px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',cursor:'pointer',
                background: tipe===t ? '#1E6AB5' : '#fff',
                color:      tipe===t ? '#fff' : '#64748B',
                border:`1px solid ${tipe===t?'#1E6AB5':'#E2E8F0'}`,
              }}>{t}</button>
            ))}
          </div>
          <span style={{marginLeft:'auto',fontSize:'12px',color:'#94A3B8'}}>{filtered.length} pengumuman</span>
        </div>

        {/* Cards */}
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {filtered.map(item=>{
            const sc = statusColor[item.status]
            return (
              <div key={item.id} style={{
                background:'#fff',borderRadius:'16px',padding:'20px 24px',
                border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,.04)',
                transition:'all .15s',cursor:'pointer',
              }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(0,0,0,.08)';(e.currentTarget as HTMLElement).style.borderColor='#C8DDEF'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 1px 3px rgba(0,0,0,.04)';(e.currentTarget as HTMLElement).style.borderColor='#E2E8F0'}}
              >
                <div style={{display:'flex',alignItems:'flex-start',gap:'16px'}}>
                  <div style={{
                    width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,
                    background: item.kategori==='BUMD' ? '#EBF2FA' : '#EDFAF4',
                    display:'flex',alignItems:'center',justifyContent:'center',
                  }}>
                    <i className={`ti ${item.kategori==='BUMD'?'ti-building-factory-2':'ti-building-hospital'}`}
                      style={{fontSize:'22px',color:item.kategori==='BUMD'?'#1E3A5F':'#0E6B44'}} />
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 8px',borderRadius:'6px',background:item.kategori==='BUMD'?'#EBF2FA':'#EDFAF4',color:item.kategori==='BUMD'?'#1E3A5F':'#0E6B44'}}>
                        {item.kategori}
                      </span>
                      <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 8px',borderRadius:'6px',background:'#F1F5F9',color:'#64748B'}}>{item.tipe}</span>
                      <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 8px',borderRadius:'6px',background:sc.bg,color:sc.color}}>{item.status}</span>
                    </div>
                    <h3 style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:'0 0 6px',lineHeight:1.4}}>{item.judul}</h3>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'12px',color:'#94A3B8'}}>
                      <span style={{display:'flex',alignItems:'center',gap:'4px'}}><i className="ti ti-building" style={{fontSize:'12px'}} /> {item.instansi}</span>
                      <span style={{display:'flex',alignItems:'center',gap:'4px'}}><i className="ti ti-calendar" style={{fontSize:'12px'}} /> {item.tanggal}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'6px',flexShrink:0}}>
                    {item.file && (
                      <button style={{
                        padding:'7px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',
                        background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer',
                        display:'flex',alignItems:'center',gap:'5px',
                      }}>
                        <i className="ti ti-download" style={{fontSize:'13px'}} /> Unduh PDF
                      </button>
                    )}
                    <button style={{
                      padding:'7px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',
                      background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',
                      display:'flex',alignItems:'center',gap:'5px',
                    }}>
                      <i className="ti ti-eye" style={{fontSize:'13px'}} /> Detail
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          {filtered.length===0 && (
            <div style={{textAlign:'center',padding:'60px 20px',color:'#94A3B8'}}>
              <i className="ti ti-search" style={{fontSize:'48px',marginBottom:'12px',display:'block',color:'#CBD5E1'}} />
              <div style={{fontSize:'15px',fontWeight:'600',color:'#64748B'}}>Tidak ada pengumuman ditemukan</div>
              <div style={{fontSize:'13px',marginTop:'4px'}}>Coba ubah filter atau kata kunci pencarian</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer minimal */}
      <footer style={{background:'#1E293B',padding:'24px 32px',textAlign:'center',marginTop:'40px'}}>
        <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
      </footer>
    </div>
  )
}
