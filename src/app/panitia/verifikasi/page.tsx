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

type DS = 'belum'|'valid'|'tidak_valid'
type DocCheck = { key:string; label:string; status:DS; note:string }
type Peserta  = { id:string; nama:string; jabatan:string; instansi:string; daftar:string; status:'menunggu'|'proses'|'lulus'|'tidak_lulus' }

const INIT_PESERTA: Peserta[] = [
  { id:'P001', nama:'Dr. Ahmad Fauzi, M.Kes.',   jabatan:'Direktur Utama',    instansi:'Perumdam Among Tirta', daftar:'10 Jun 2025', status:'menunggu' },
  { id:'P002', nama:'Ir. Dewi Rahayu, M.T.',     jabatan:'Komisaris Utama',   instansi:'PT BPR Bank Batu',    daftar:'11 Jun 2025', status:'proses' },
  { id:'P003', nama:'Drs. Hendra Wijaya',         jabatan:'Dewan Pengawas',    instansi:'PD Pasar Kota Batu',  daftar:'11 Jun 2025', status:'menunggu' },
  { id:'P004', nama:'Siti Nurhaliza, S.E., MM.',  jabatan:'Direktur Keuangan', instansi:'Perumdam Among Tirta',daftar:'12 Jun 2025', status:'lulus' },
  { id:'P005', nama:'Budi Hartoyo, S.H.',         jabatan:'Komisaris',         instansi:'PT BPR Bank Batu',    daftar:'12 Jun 2025', status:'menunggu' },
]

const DOC_TPL: DocCheck[] = [
  { key:'ktp',       label:'KTP (Kartu Tanda Penduduk)',         status:'belum', note:'' },
  { key:'cv',        label:'Curriculum Vitae (CV)',              status:'belum', note:'' },
  { key:'ijazah',    label:'Ijazah Terakhir (min. S1)',          status:'belum', note:'' },
  { key:'foto',      label:'Pas Foto 4×6 (Terbaru)',            status:'belum', note:'' },
  { key:'npwp',      label:'NPWP',                              status:'belum', note:'' },
  { key:'lamaran',   label:'Surat Lamaran Resmi',               status:'belum', note:'' },
  { key:'skck',      label:'SKCK (maks. 6 bulan)',              status:'belum', note:'' },
  { key:'kesehatan', label:'Surat Keterangan Sehat (Dokter/RS)',status:'belum', note:'' },
]

const ST_CFG: Record<string,{bg:string;color:string;label:string}> = {
  menunggu:    {bg:'#FFFBEB',color:'#D97706',label:'Menunggu'},
  proses:      {bg:'#EFF6FF',color:'#2563EB',label:'Diproses'},
  lulus:       {bg:'#ECFDF5',color:'#059669',label:'Lulus Adm.'},
  tidak_lulus: {bg:'#FEF2F2',color:'#DC2626',label:'Tidak Lulus'},
}

export default function VerifikasiPage() {
  const [list, setList]         = useState<Peserta[]>(INIT_PESERTA)
  const [selected, setSelected] = useState<Peserta|null>(null)
  const [docs, setDocs]         = useState<DocCheck[]>(DOC_TPL)
  const [catatan, setCatatan]   = useState('')
  const [filter, setFilter]     = useState('semua')
  const [saved, setSaved]       = useState(false)

  const shown = filter==='semua' ? list : list.filter(p=>p.status===filter)

  const pick = (p:Peserta) => {
    setSelected(p); setSaved(false)
    const demo = DOC_TPL.map((d,i)=>({
      ...d,
      status: p.id==='P004' ? 'valid' as DS
            : p.id==='P002' ? (i<5?'valid':'belum') as DS
            : p.id==='P003' ? (i<3?'valid':i===4?'tidak_valid':'belum') as DS
            : 'belum' as DS,
    }))
    setDocs(demo)
    setCatatan(p.id==='P003'?'NPWP tidak terbaca jelas. Mohon upload ulang.':'')
  }

  const setDS = (key:string, status:DS) => setDocs(d=>d.map(x=>x.key===key?{...x,status}:x))
  const setNote = (key:string, note:string) => setDocs(d=>d.map(x=>x.key===key?{...x,note}:x))

  const validCount   = docs.filter(d=>d.status==='valid').length
  const invalidCount = docs.filter(d=>d.status==='tidak_valid').length
  const belumCount   = docs.filter(d=>d.status==='belum').length
  const allChecked   = belumCount===0

  const putus = (hasil:'lulus'|'tidak_lulus') => {
    if(!selected) return
    setList(prev=>prev.map(p=>p.id===selected.id?{...p,status:hasil}:p))
    setSelected(prev=>prev?{...prev,status:hasil}:null)
    setSaved(true)
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="panitia" userName="Sekretaris Pansel"
        userRole="Sekretaris Panitia" initials="SP" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />

      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Verifikasi Administrasi"
          breadcrumb={[{label:'Panitia Seleksi',href:'/panitia/dashboard'},{label:'Verifikasi Administrasi'}]} />

        <div style={{padding:'24px',flex:1,display:'flex',gap:'20px'}}>
          {/* ── Kiri: list peserta ── */}
          <div style={{width:'300px',flexShrink:0,display:'flex',flexDirection:'column',gap:'10px'}}>
            {/* Filter */}
            <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
              {['semua','menunggu','proses','lulus','tidak_lulus'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{
                  padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',cursor:'pointer',
                  background:filter===f?'#1E3A5F':'#fff',
                  color:filter===f?'#fff':'#64748B',
                  border:`1px solid ${filter===f?'#1E3A5F':'#E2E8F0'}`,
                }}>
                  {f==='tidak_lulus'?'Tdk Lulus':f.charAt(0).toUpperCase()+f.slice(1)}
                  {' '}({f==='semua'?list.length:list.filter(p=>p.status===f).length})
                </button>
              ))}
            </div>
            {/* Cards */}
            <div style={{display:'flex',flexDirection:'column',gap:'8px',overflowY:'auto'}}>
              {shown.map(p=>{
                const cfg=ST_CFG[p.status]
                const initials=p.nama.replace(/[.,]/g,'').split(' ').filter(w=>!['Dr','Ir','Drs','MM','SE','SH','MT'].includes(w)).slice(0,2).map(w=>w[0]).join('').toUpperCase()
                const active=selected?.id===p.id
                return (
                  <div key={p.id} onClick={()=>pick(p)} style={{
                    background:active?'#EBF2FA':'#fff',borderRadius:'14px',padding:'14px',
                    border:`1.5px solid ${active?'#1E6AB5':'#E2E8F0'}`,cursor:'pointer',
                    boxShadow:active?'0 0 0 3px rgba(30,106,181,.1)':'none',
                  }}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{
                        width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,
                        background:active?'linear-gradient(135deg,#1E3A5F,#1E6AB5)':'#EBF2FA',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        color:active?'#fff':'#1E3A5F',fontSize:'13px',fontWeight:'700',
                      }}>{initials}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:'12px',fontWeight:'600',color:'#1E293B',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.nama}</div>
                        <div style={{fontSize:'11px',color:'#64748B'}}>{p.jabatan}</div>
                        <div style={{fontSize:'10px',color:'#94A3B8'}}>{p.instansi}</div>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'8px'}}>
                      <span style={{fontSize:'10px',color:'#94A3B8'}}>{p.daftar}</span>
                      <span style={{fontSize:'10px',fontWeight:'600',padding:'2px 8px',borderRadius:'20px',background:cfg.bg,color:cfg.color}}>{cfg.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Kanan: panel verifikasi ── */}
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:'14px'}}>
            {!selected ? (
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',color:'#94A3B8',textAlign:'center',padding:'60px'}}>
                <i className="ti ti-clipboard-check" style={{fontSize:'56px',marginBottom:'16px',color:'#CBD5E1'}} />
                <div style={{fontSize:'16px',fontWeight:'600',color:'#64748B',fontFamily:'Plus Jakarta Sans'}}>Pilih Peserta</div>
                <div style={{fontSize:'13px',marginTop:'6px'}}>Klik nama peserta untuk mulai verifikasi dokumen</div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{
                  background:'linear-gradient(135deg,#1E3A5F 0%,#1E6AB5 100%)',
                  borderRadius:'18px',padding:'20px 24px',color:'#fff',
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                }}>
                  <div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)',marginBottom:'2px'}}>ID: {selected.id}</div>
                    <h2 style={{fontSize:'1.2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:0}}>{selected.nama}</h2>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,.75)',marginTop:'3px'}}>{selected.jabatan} · {selected.instansi}</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:'2.2rem',fontWeight:'800',fontFamily:'Plus Jakarta Sans',lineHeight:1}}>
                      {validCount}<span style={{fontSize:'1rem',color:'rgba(255,255,255,.5)'}>/{docs.length}</span>
                    </div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,.65)',marginTop:'3px'}}>Dokumen Valid</div>
                    <div style={{height:'4px',background:'rgba(255,255,255,.2)',borderRadius:'4px',marginTop:'8px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${Math.round(validCount/docs.length*100)}%`,background:'#10B981',borderRadius:'4px'}} />
                    </div>
                  </div>
                </div>

                {/* Pills */}
                <div style={{display:'flex',gap:'8px'}}>
                  {[
                    {label:`${validCount} Valid`,bg:'#ECFDF5',color:'#059669',icon:'ti-check'},
                    {label:`${invalidCount} Tidak Valid`,bg:'#FEF2F2',color:'#DC2626',icon:'ti-x'},
                    {label:`${belumCount} Belum`,bg:'#FFFBEB',color:'#D97706',icon:'ti-clock'},
                  ].map((s,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',padding:'5px 12px',borderRadius:'20px',background:s.bg,color:s.color,fontSize:'12px',fontWeight:'600'}}>
                      <i className={`ti ${s.icon}`} style={{fontSize:'12px'}} />{s.label}
                    </div>
                  ))}
                </div>

                {/* Checklist table */}
                <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
                  <div style={{padding:'14px 20px',borderBottom:'1px solid #F1F5F9'}}>
                    <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Checklist Dokumen</span>
                  </div>
                  {docs.map((doc,i)=>(
                    <div key={doc.key} style={{
                      padding:'12px 20px',
                      borderBottom: i<docs.length-1 ? '1px solid #F8FAFC' : 'none',
                      background: doc.status==='valid' ? '#FAFFFE' : doc.status==='tidak_valid' ? '#FFFAFA' : '#fff',
                    }}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:'13px',fontWeight:'600',color:'#1E293B'}}>{doc.label}</div>
                          {doc.status==='tidak_valid' && (
                            <input value={doc.note} onChange={e=>setNote(doc.key,e.target.value)}
                              placeholder="Alasan penolakan..."
                              style={{marginTop:'6px',width:'100%',padding:'6px 10px',borderRadius:'8px',fontSize:'12px',
                                border:'1px solid #FECACA',background:'#FEF2F2',color:'#DC2626',outline:'none'}} />
                          )}
                        </div>
                        <div style={{display:'flex',gap:'5px',flexShrink:0}}>
                          {(['valid','tidak_valid','belum'] as const).map(st=>{
                            const c3 = {valid:{bg:'#059669',lbl:'Valid'},tidak_valid:{bg:'#DC2626',lbl:'Tdk Valid'},belum:{bg:'#94A3B8',lbl:'Belum'}}[st]
                            return (
                              <button key={st} onClick={()=>setDS(doc.key,st)} style={{
                                padding:'4px 10px',borderRadius:'7px',fontSize:'11px',fontWeight:'600',cursor:'pointer',
                                background: doc.status===st ? c3.bg : '#F1F5F9',
                                color:      doc.status===st ? '#fff' : '#94A3B8',
                                border:'none',transition:'all .1s',
                              }}>{c3.lbl}</button>
                            )
                          })}
                          <button style={{padding:'4px 8px',borderRadius:'7px',fontSize:'11px',cursor:'pointer',background:'#EBF2FA',color:'#1E6AB5',border:'none',display:'flex',alignItems:'center',gap:'3px'}}>
                            <i className="ti ti-eye" style={{fontSize:'12px'}} /> Lihat
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Catatan */}
                <textarea value={catatan} onChange={e=>setCatatan(e.target.value)}
                  placeholder="Catatan verifikasi untuk peserta..."
                  rows={2} style={{
                    width:'100%',padding:'10px 14px',borderRadius:'12px',fontSize:'13px',
                    border:'1px solid #E2E8F0',resize:'vertical',outline:'none',
                    fontFamily:'Inter,sans-serif',background:'#fff',
                  }} />

                {/* Tombol */}
                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={()=>putus('lulus')} disabled={!allChecked||invalidCount>0}
                    style={{flex:1,padding:'12px 20px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
                      background: allChecked&&invalidCount===0 ? 'linear-gradient(135deg,#059669,#10B981)' : '#E2E8F0',
                      color: allChecked&&invalidCount===0 ? '#fff' : '#94A3B8',
                      border:'none',cursor: allChecked&&invalidCount===0 ? 'pointer' : 'not-allowed',
                      display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      boxShadow: allChecked&&invalidCount===0 ? '0 4px 16px rgba(5,150,105,.3)' : 'none',
                    }}>
                    <i className="ti ti-check-circle" style={{fontSize:'17px'}} /> Lulus Administrasi
                  </button>
                  <button onClick={()=>putus('tidak_lulus')} disabled={!allChecked}
                    style={{flex:1,padding:'12px 20px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
                      background: allChecked ? 'linear-gradient(135deg,#DC2626,#EF4444)' : '#E2E8F0',
                      color: allChecked ? '#fff' : '#94A3B8',
                      border:'none',cursor: allChecked ? 'pointer' : 'not-allowed',
                      display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      boxShadow: allChecked ? '0 4px 16px rgba(220,38,38,.3)' : 'none',
                    }}>
                    <i className="ti ti-x-circle" style={{fontSize:'17px'}} /> Tidak Lulus
                  </button>
                </div>

                {saved && (
                  <div style={{
                    padding:'12px 16px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',
                    background: selected.status==='lulus' ? '#ECFDF5' : '#FEF2F2',
                    color:      selected.status==='lulus' ? '#059669' : '#DC2626',
                    border:`1px solid ${selected.status==='lulus'?'#A7F3D0':'#FECACA'}`,
                    display:'flex',alignItems:'center',gap:'8px',animation:'slideUp .3s ease',
                  }}>
                    <i className={`ti ${selected.status==='lulus'?'ti-check-circle':'ti-x-circle'}`} style={{fontSize:'18px'}} />
                    {selected.status==='lulus'
                      ? `${selected.nama} dinyatakan LULUS seleksi administrasi.`
                      : `${selected.nama} dinyatakan TIDAK LULUS seleksi administrasi.`}
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
