'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/panitia/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',           section:'MENU UTAMA' },
  { href:'/panitia/verifikasi', icon:'ti-clipboard-check',  label:'Verifikasi Adm.',   section:'MENU UTAMA', badge:12 },
  { href:'/panitia/peserta',    icon:'ti-users',            label:'Manajemen Peserta', section:'MENU UTAMA' },
  { href:'/panitia/jadwal',     icon:'ti-calendar-event',   label:'Jadwal Seleksi',    section:'MENU UTAMA' },
  { href:'/panitia/pengumuman', icon:'ti-speakerphone',     label:'Pengumuman',        section:'MENU UTAMA' },
  { href:'/panitia/dokumen',    icon:'ti-file-description', label:'Generate Dokumen',  section:'MENU UTAMA' },
]

const PESERTA = [
  { id:'P001', nama:'Dr. Ahmad Fauzi, M.Kes.',   jabatan:'Direktur Utama',    instansi:'Perumdam Among Tirta', daftar:'10 Jun 2025', status:'menunggu_verifikasi',     telp:'0812-3456-7890' },
  { id:'P002', nama:'Ir. Dewi Rahayu, M.T.',     jabatan:'Komisaris Utama',   instansi:'PT BPR Bank Batu',    daftar:'11 Jun 2025', status:'lulus_administrasi',      telp:'0813-2345-6789' },
  { id:'P003', nama:'Drs. Hendra Wijaya',         jabatan:'Dewan Pengawas',    instansi:'PD Pasar Kota Batu',  daftar:'11 Jun 2025', status:'menunggu_verifikasi',     telp:'0811-3456-7890' },
  { id:'P004', nama:'Siti Nurhaliza, S.E., MM.',  jabatan:'Direktur Keuangan', instansi:'Perumdam Among Tirta',daftar:'12 Jun 2025', status:'ukk',                     telp:'0814-5678-9012' },
  { id:'P005', nama:'Budi Hartoyo, S.H.',         jabatan:'Komisaris',         instansi:'PT BPR Bank Batu',    daftar:'12 Jun 2025', status:'tidak_lulus_administrasi',telp:'0815-6789-0123' },
  { id:'P006', nama:'Rina Kartika, M.Pd.',        jabatan:'Direktur Umum',     instansi:'Perumdam Among Tirta',daftar:'13 Jun 2025', status:'menunggu_verifikasi',     telp:'0816-7890-1234' },
]

const ST: Record<string,{bg:string;color:string;label:string}> = {
  draft:                   {bg:'#F1F5F9',color:'#475569',label:'Draft'},
  menunggu_verifikasi:     {bg:'#FFFBEB',color:'#D97706',label:'Menunggu'},
  lulus_administrasi:      {bg:'#ECFDF5',color:'#059669',label:'Lulus Adm.'},
  tidak_lulus_administrasi:{bg:'#FEF2F2',color:'#DC2626',label:'Tidak Lulus'},
  ukk:                     {bg:'#EFF6FF',color:'#2563EB',label:'UKK'},
  wawancara_kpm:           {bg:'#F5F3FF',color:'#7C3AED',label:'Wawancara'},
  penetapan:               {bg:'#FFF7ED',color:'#C2410C',label:'Penetapan'},
  selesai:                 {bg:'#ECFDF5',color:'#047857',label:'Selesai'},
}

export default function ManajemenPesertaPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('semua')
  const [show,   setShow]   = useState<typeof PESERTA[0]|null>(null)

  const filtered = PESERTA.filter(p => {
    const q = search.toLowerCase()
    const mQ = !q || p.nama.toLowerCase().includes(q) || p.instansi.toLowerCase().includes(q)
    const mF = filter==='semua' || p.status===filter
    return mQ && mF
  })

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Ketua Pansel"
        userRole="Ketua Panitia" initials="KP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Manajemen Peserta"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Manajemen Peserta'}]}
          actions={
            <button style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-download" style={{fontSize:'13px'}} /> Export Excel
            </button>
          }
        />
        <div style={{padding:'24px'}}>
          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px',marginBottom:'20px'}}>
            {[
              {label:'Total',   val:PESERTA.length,                                            color:'#1E3A5F',bg:'#EBF2FA'},
              {label:'Menunggu',val:PESERTA.filter(p=>p.status==='menunggu_verifikasi').length, color:'#D97706',bg:'#FFFBEB'},
              {label:'Lulus Adm.',val:PESERTA.filter(p=>p.status==='lulus_administrasi').length,color:'#059669',bg:'#ECFDF5'},
              {label:'Tdk Lulus', val:PESERTA.filter(p=>p.status==='tidak_lulus_administrasi').length,color:'#DC2626',bg:'#FEF2F2'},
              {label:'UKK',       val:PESERTA.filter(p=>p.status==='ukk').length,              color:'#2563EB',bg:'#EFF6FF'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'14px',padding:'14px 16px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:'10px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase'}}>{s.label}</div>
                  <div style={{fontSize:'1.8rem',fontWeight:'800',color:s.color,fontFamily:'Plus Jakarta Sans',lineHeight:1.1,marginTop:'3px'}}>{s.val}</div>
                </div>
                <div style={{width:'32px',height:'32px',borderRadius:'8px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <i className="ti ti-users" style={{fontSize:'16px',color:s.color}} />
                </div>
              </div>
            ))}
          </div>
          {/* Toolbar */}
          <div style={{display:'flex',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
            <div style={{position:'relative',flex:1,minWidth:'200px'}}>
              <i className="ti ti-search" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',color:'#94A3B8'}} />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari peserta..."
                style={{width:'100%',padding:'9px 12px 9px 36px',borderRadius:'12px',fontSize:'13px',border:'1px solid #E2E8F0',outline:'none',background:'#fff',boxSizing:'border-box'}} />
            </div>
            <select value={filter} onChange={e=>setFilter(e.target.value)}
              style={{padding:'9px 32px 9px 12px',borderRadius:'12px',fontSize:'13px',border:'1px solid #E2E8F0',outline:'none',background:'#fff',cursor:'pointer',appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 10px center'}}>
              <option value="semua">Semua Status</option>
              <option value="menunggu_verifikasi">Menunggu</option>
              <option value="lulus_administrasi">Lulus Adm.</option>
              <option value="tidak_lulus_administrasi">Tidak Lulus</option>
              <option value="ukk">UKK</option>
            </select>
          </div>
          {/* Table */}
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    {['No.','Nama Peserta','Jabatan / Instansi','Tgl. Daftar','Status','Aksi'].map(h=>(
                      <th key={h} style={{padding:'11px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p,i)=>{
                    const cfg = ST[p.status]
                    const initials = p.nama.replace(/[.,]/g,'').split(' ').filter(w=>!['Dr','Ir','Drs','MM','SE','SH','MT'].includes(w)).slice(0,2).map(w=>w[0]).join('').toUpperCase()
                    return (
                      <tr key={p.id} style={{transition:'background .1s'}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F8FAFC'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff'}}>
                        <td style={{padding:'13px 16px',fontSize:'12px',color:'#94A3B8',borderBottom:'1px solid #F1F5F9',fontWeight:'600'}}>{String(i+1).padStart(2,'0')}</td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{initials}</div>
                            <div>
                              <div style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{p.nama}</div>
                              <div style={{fontSize:'11px',color:'#94A3B8'}}>{p.telp}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{fontSize:'12px',fontWeight:'600',color:'#1E293B'}}>{p.jabatan}</div>
                          <div style={{fontSize:'11px',color:'#94A3B8'}}>{p.instansi}</div>
                        </td>
                        <td style={{padding:'13px 16px',fontSize:'12px',color:'#64748B',borderBottom:'1px solid #F1F5F9'}}>{p.daftar}</td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',background:cfg.bg,color:cfg.color}}>{cfg.label}</span>
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'flex',gap:'5px'}}>
                            <button onClick={()=>setShow(p)} style={{padding:'5px 10px',borderRadius:'8px',fontSize:'11px',fontWeight:'600',background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'3px'}}>
                              <i className="ti ti-eye" style={{fontSize:'12px'}} /> Detail
                            </button>
                            <button style={{padding:'5px 10px',borderRadius:'8px',fontSize:'11px',fontWeight:'600',background:'#F5F3FF',color:'#7C3AED',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'3px'}}>
                              <i className="ti ti-file-text" style={{fontSize:'12px'}} /> Dokumen
                            </button>
                          </div>
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

      {/* Modal Detail */}
      {show&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)'}} onClick={()=>setShow(null)}>
          <div style={{background:'#fff',borderRadius:'20px',width:'460px',overflow:'hidden',boxShadow:'0 24px 48px rgba(0,0,0,.18)',animation:'slideUp .3s ease'}} onClick={e=>e.stopPropagation()}>
            <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',padding:'20px 24px',color:'#fff'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)',marginBottom:'4px'}}>ID: {show.id}</div>
              <h2 style={{fontSize:'1.1rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:0}}>{show.nama}</h2>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.7)',marginTop:'3px'}}>{show.jabatan} · {show.instansi}</div>
            </div>
            <div style={{padding:'20px 24px'}}>
              {[['Status',ST[show.status].label],['Tgl. Daftar',show.daftar],['No. HP',show.telp]].map(([l,v],i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #F1F5F9'}}>
                  <span style={{fontSize:'13px',color:'#64748B'}}>{l}</span>
                  <span style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{padding:'12px 24px',borderTop:'1px solid #F1F5F9',display:'flex',gap:'8px'}}>
              <button onClick={()=>setShow(null)} style={{flex:1,padding:'10px',borderRadius:'10px',fontSize:'13px',fontWeight:'600',background:'#F1F5F9',color:'#475569',border:'none',cursor:'pointer'}}>Tutup</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
