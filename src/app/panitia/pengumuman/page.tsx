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

type Pengumuman = { id:string; judul:string; isi:string; kategori:string; published:boolean; tgl:string }
const INIT: Pengumuman[] = [
  { id:'A01', judul:'Pembukaan Seleksi Direksi Perumdam Among Tirta 2025',          isi:'Panitia Seleksi membuka pendaftaran...',   kategori:'Umum',           published:true,  tgl:'1 Jun 2025' },
  { id:'A02', judul:'Pengumuman Hasil Seleksi Administrasi – Direksi Perumdam',     isi:'Berikut nama-nama peserta yang lulus...',  kategori:'Administrasi',   published:true,  tgl:'22 Jun 2025' },
  { id:'A03', judul:'Jadwal Pelaksanaan Psikotes – Direksi Perumdam Among Tirta',   isi:'Psikotes akan dilaksanakan pada...',        kategori:'UKK',            published:false, tgl:'24 Jun 2025' },
]
const KAT_COLOR: Record<string,{bg:string;color:string}> = {
  Umum:         {bg:'#EBF2FA',color:'#1E3A5F'},
  Administrasi: {bg:'#ECFDF5',color:'#059669'},
  UKK:          {bg:'#EFF6FF',color:'#2563EB'},
  Wawancara:    {bg:'#F5F3FF',color:'#7C3AED'},
  Penetapan:    {bg:'#FFF7ED',color:'#C2410C'},
}

export default function PengumumanPanitiaPage() {
  const [list, setList]   = useState<Pengumuman[]>(INIT)
  const [modal, setModal] = useState<Pengumuman|null|'new'>(null)
  const [form, setForm]   = useState<Omit<Pengumuman,'id'>>({judul:'',isi:'',kategori:'Umum',published:false,tgl:''})

  const openNew  = () => { setModal('new'); setForm({judul:'',isi:'',kategori:'Umum',published:false,tgl:new Date().toLocaleDateString('id-ID')}) }
  const openEdit = (p: Pengumuman) => { setModal(p); setForm({judul:p.judul,isi:p.isi,kategori:p.kategori,published:p.published,tgl:p.tgl}) }
  const toggle   = (id:string) => setList(p=>p.map(x=>x.id===id?{...x,published:!x.published}:x))
  const save = () => {
    if (modal==='new') setList(p=>[...p,{...form,id:'A'+String(p.length+1).padStart(2,'0')}])
    else if (modal) setList(p=>p.map(x=>x.id===modal.id?{...x,...form}:x))
    setModal(null)
  }
  const del = (id:string) => setList(p=>p.filter(x=>x.id!==id))
  const inp = {width:'100%',padding:'9px 12px',borderRadius:'10px',fontSize:'13px',border:'1px solid #E2E8F0',outline:'none',boxSizing:'border-box' as const}

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Ketua Pansel"
        userRole="Ketua Panitia" initials="KP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Manajemen Pengumuman"
          breadcrumb={[{label:'Panitia',href:'/panitia/dashboard'},{label:'Pengumuman'}]}
          actions={
            <button onClick={openNew} style={{padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
              <i className="ti ti-plus" style={{fontSize:'13px'}} /> Buat Pengumuman
            </button>
          }
        />
        <div style={{padding:'24px',display:'flex',flexDirection:'column',gap:'12px'}}>
          {list.map(p=>{
            const kc = KAT_COLOR[p.kategori] ?? KAT_COLOR.Umum
            return (
              <div key={p.id} style={{background:'#fff',borderRadius:'16px',padding:'18px 22px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{display:'flex',alignItems:'flex-start',gap:'14px'}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',background:kc.bg,color:kc.color}}>{p.kategori}</span>
                      <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'6px',background:p.published?'#ECFDF5':'#FEF2F2',color:p.published?'#059669':'#DC2626'}}>
                        {p.published?'✓ Dipublikasikan':'✗ Draft'}
                      </span>
                      <span style={{fontSize:'11px',color:'#94A3B8'}}>{p.tgl}</span>
                    </div>
                    <h3 style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:'0 0 4px',lineHeight:1.4}}>{p.judul}</h3>
                    <p style={{fontSize:'12px',color:'#64748B',margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.isi}</p>
                  </div>
                  <div style={{display:'flex',gap:'6px',flexShrink:0}}>
                    <button onClick={()=>toggle(p.id)} style={{
                      padding:'6px 12px',borderRadius:'8px',fontSize:'11px',fontWeight:'600',border:'none',cursor:'pointer',
                      background:p.published?'#FEF2F2':'#ECFDF5',
                      color:p.published?'#DC2626':'#059669',
                      display:'flex',alignItems:'center',gap:'4px',
                    }}>
                      <i className={`ti ${p.published?'ti-eye-off':'ti-eye'}`} style={{fontSize:'12px'}} />
                      {p.published?'Cabut':'Publish'}
                    </button>
                    <button onClick={()=>openEdit(p)} style={{padding:'6px 10px',borderRadius:'8px',fontSize:'11px',background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer'}}>
                      <i className="ti ti-pencil" style={{fontSize:'13px'}} />
                    </button>
                    <button onClick={()=>del(p.id)} style={{padding:'6px 10px',borderRadius:'8px',fontSize:'11px',background:'#FEF2F2',color:'#DC2626',border:'none',cursor:'pointer'}}>
                      <i className="ti ti-trash" style={{fontSize:'13px'}} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
      {modal&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)'}} onClick={()=>setModal(null)}>
          <div style={{background:'#fff',borderRadius:'20px',width:'540px',overflow:'hidden',boxShadow:'0 24px 48px rgba(0,0,0,.18)',animation:'slideUp .3s ease'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'18px 24px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>{modal==='new'?'Buat Pengumuman':'Edit Pengumuman'}</span>
              <button onClick={()=>setModal(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#94A3B8',fontSize:'18px'}}>&times;</button>
            </div>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:'14px'}}>
              <div><label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>JUDUL *</label>
                <input value={form.judul} onChange={e=>setForm(p=>({...p,judul:e.target.value}))} style={inp} /></div>
              <div><label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>KATEGORI</label>
                <select value={form.kategori} onChange={e=>setForm(p=>({...p,kategori:e.target.value}))} style={{...inp,appearance:'none'}}>
                  {['Umum','Administrasi','UKK','Wawancara','Penetapan'].map(k=><option key={k}>{k}</option>)}
                </select></div>
              <div><label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'5px'}}>ISI PENGUMUMAN</label>
                <textarea value={form.isi} onChange={e=>setForm(p=>({...p,isi:e.target.value}))} rows={5} style={{...inp,resize:'vertical',fontFamily:'Inter,sans-serif'}} /></div>
              <label style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                <input type="checkbox" checked={form.published} onChange={e=>setForm(p=>({...p,published:e.target.checked}))} style={{width:'16px',height:'16px',accentColor:'#059669'}} />
                <span style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>Langsung publikasikan</span>
              </label>
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
