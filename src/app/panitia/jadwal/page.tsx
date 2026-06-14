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

type Jadwal = { id:string; nama:string; tgl_mulai:string; tgl_selesai:string; tempat:string; ket:string; status:'belum'|'aktif'|'selesai' }

const INIT: Jadwal[] = [
  { id:'J01', nama:'Pengumuman & Pendaftaran',  tgl_mulai:'2025-06-01', tgl_selesai:'2025-06-15', tempat:'Online – Portal SIMBUBALADA',  ket:'Pendaftaran dilakukan secara online',      status:'selesai' },
  { id:'J02', nama:'Verifikasi Administrasi',   tgl_mulai:'2025-06-16', tgl_selesai:'2025-06-20', tempat:'Kantor Panitia Seleksi',        ket:'Verifikasi kelengkapan berkas peserta',   status:'aktif'  },
  { id:'J03', nama:'Pengumuman Hasil Adm.',     tgl_mulai:'2025-06-22', tgl_selesai:'2025-06-22', tempat:'Portal SIMBUBALADA & Website',  ket:'Diumumkan via portal dan website resmi', status:'belum'  },
  { id:'J04', nama:'Psikotes',                  tgl_mulai:'2025-06-25', tgl_selesai:'2025-06-25', tempat:'Gedung DPRD Kota Batu',         ket:'Psikotes dilaksanakan oleh Tim Psikolog', status:'belum' },
  { id:'J05', nama:'Tes Tulis',                 tgl_mulai:'2025-06-27', tgl_selesai:'2025-06-27', tempat:'Aula Balai Kota Batu',          ket:'Pengetahuan umum dan manajerial',         status:'belum'  },
  { id:'J06', nama:'Paparan Makalah',           tgl_mulai:'2025-07-01', tgl_selesai:'2025-07-01', tempat:'Ruang Rapat Pemkot Batu',       ket:'Masing-masing peserta 30 menit',          status:'belum'  },
  { id:'J07', nama:'Wawancara KPM',             tgl_mulai:'2025-07-05', tgl_selesai:'2025-07-06', tempat:'Ruang Rapat Pemkot Batu',       ket:'Wawancara mendalam dengan KPM/RUPS',      status:'belum'  },
  { id:'J08', nama:'Pengumuman Hasil Akhir',    tgl_mulai:'2025-07-12', tgl_selesai:'2025-07-12', tempat:'Portal SIMBUBALADA',            ket:'Pengumuman resmi hasil seleksi',          status:'belum'  },
]

const ST: Record<string,{label:string;bg:string;color:string;border:string}> = {
  selesai:{label:'Selesai',     bg:'#ECFDF5',color:'#059669',border:'#A7F3D0'},
  aktif:  {label:'Berlangsung', bg:'#EFF6FF',color:'#2563EB',border:'#BFDBFE'},
  belum:  {label:'Akan Datang', bg:'#F1F5F9',color:'#64748B',border:'#E2E8F0'},
}

export default function JadwalPage() {
  const [list, setList]       = useState<Jadwal[]>(INIT)
  const [modal, setModal]     = useState<Jadwal|null|'new'>(null)
  const [form, setForm]       = useState<Omit<Jadwal,'id'>>({nama:'',tgl_mulai:'',tgl_selesai:'',tempat:'',ket:'',status:'belum'})

  const openEdit = (j: Jadwal) => { setModal(j); setForm({nama:j.nama,tgl_mulai:j.tgl_mulai,tgl_selesai:j.tgl_selesai,tempat:j.tempat,ket:j.ket,status:j.status}) }
  const openNew  = () => { setModal('new'); setForm({nama:'',tgl_mulai:'',tgl_selesai:'',tempat:'',ket:'',status:'belum'}) }

  const save = () => {
    if (modal==='new') {
      setList(p=>[...p,{...form,id:'J'+String(p.length+1).padStart(2,'0')}])
    } else if (modal) {
      setList(p=>p.map(j=>j.id===modal.id?{...j,...form}:j))
    }
    setModal(null)
  }
  const del = (id:string) => { setList(p=>p.filter(j=>j.id!==id)) }

  const inp = {width:'100%',padding:'9px 12px',borderRadius:'10px',fontSize:'13px',border:'1px solid #E2E8F0',outline:'none',boxSizing:'border-box' as const}

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Sekretaris Pansel"
        userRole="Sekretaris Panitia" initials="SP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Jadwal Seleksi"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Jadwal Seleksi'}]}
          actions={
            <button onClick={openNew} style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-plus" style={{fontSize:'13px'}} /> Tambah Jadwal
            </button>
          }
        />
        <div style={{padding:'24px'}}>
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    {['#','Kegiatan','Tanggal','Tempat','Status','Aksi'].map(h=>(
                      <th key={h} style={{padding:'11px 16px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#64748B',borderBottom:'1px solid #E2E8F0',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((j,i)=>{
                    const cfg=ST[j.status]
                    return (
                      <tr key={j.id} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#F8FAFC'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff'}}>
                        <td style={{padding:'13px 16px',fontSize:'12px',color:'#94A3B8',borderBottom:'1px solid #F1F5F9',fontWeight:'700'}}>{i+1}</td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{j.nama}</div>
                          {j.ket&&<div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{j.ket}</div>}
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9',fontSize:'12px',color:'#475569',whiteSpace:'nowrap'}}>
                          {j.tgl_mulai===j.tgl_selesai?j.tgl_mulai:`${j.tgl_mulai} s/d ${j.tgl_selesai}`}
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9',fontSize:'12px',color:'#475569',maxWidth:'180px'}}>{j.tempat}</td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`}}>{cfg.label}</span>
                        </td>
                        <td style={{padding:'13px 16px',borderBottom:'1px solid #F1F5F9'}}>
                          <div style={{display:'flex',gap:'5px'}}>
                            <button onClick={()=>openEdit(j)} style={{padding:'5px 10px',borderRadius:'8px',fontSize:'11px',fontWeight:'600',background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer'}}>
                              <i className="ti ti-pencil" /> Edit
                            </button>
                            <button onClick={()=>del(j.id)} style={{padding:'5px 8px',borderRadius:'8px',fontSize:'11px',background:'#FEF2F2',color:'#DC2626',border:'none',cursor:'pointer'}}>
                              <i className="ti ti-trash" />
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

      {modal&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)'}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:'20px',width:'500px',overflow:'hidden',boxShadow:'0 24px 48px rgba(0,0,0,.18)',animation:'slideUp .3s ease'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'18px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{modal==='new'?'Tambah Jadwal':'Edit Jadwal'}</span>
              <button onClick={()=>setModal(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#94A3B8',fontSize:'18px'}}>&times;</button>
            </div>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:'14px'}}>
              {[['Nama Kegiatan','nama','text'],['Tempat','tempat','text'],['Keterangan','ket','text']].map(([l,k,t])=>(
                <div key={k}>
                  <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>{l}</label>
                  <input type={t} value={(form as any)[k]} onChange={e=>setForm((p:any)=>({...p,[k]:e.target.value}))} style={inp} />
                </div>
              ))}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                {[['Tanggal Mulai','tgl_mulai'],['Tanggal Selesai','tgl_selesai']].map(([l,k])=>(
                  <div key={k}>
                    <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>{l}</label>
                    <input type="date" value={(form as any)[k]} onChange={e=>setForm((p:any)=>({...p,[k]:e.target.value}))} style={inp} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>Status</label>
                <select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value as any}))} style={{...inp,appearance:'none'}}>
                  <option value="belum">Akan Datang</option>
                  <option value="aktif">Berlangsung</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>
            </div>
            <div style={{padding:'14px 24px',borderTop:'1px solid #F1F5F9',display:'flex',gap:'8px'}}>
              <button onClick={()=>setModal(null)} style={{flex:1,padding:'10px',borderRadius:'10px',fontSize:'13px',fontWeight:'600',background:'#F1F5F9',color:'#475569',border:'none',cursor:'pointer'}}>Batal</button>
              <button onClick={save} style={{flex:2,padding:'10px',borderRadius:'10px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                <i className="ti ti-device-floppy" /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
