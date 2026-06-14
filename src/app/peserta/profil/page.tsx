'use client'
import { useState } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/peserta/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',        section:'MENU UTAMA' },
  { href:'/peserta/daftar',     icon:'ti-user-plus',        label:'Daftar Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/dokumen',    icon:'ti-upload',           label:'Upload Dokumen', section:'MENU UTAMA' },
  { href:'/peserta/tracking',   icon:'ti-timeline',         label:'Status Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/pengumuman', icon:'ti-bell',             label:'Pengumuman',     section:'MENU UTAMA', badge:2 },
  { href:'/peserta/unduh',      icon:'ti-download',         label:'Unduh Dokumen',  section:'MENU UTAMA' },
  { href:'/peserta/profil',     icon:'ti-user-circle',      label:'Profil Saya',    section:'AKUN' },
]

export default function ProfilPage() {
  const [edit, setEdit] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    nama:'Budi Santoso, S.E., M.M.', email:'budi.santoso@email.com',
    telp:'0812-3456-7890', nik:'3579010203840001',
    ttl:'Kota Batu', tgl:'1984-02-03',
    alamat:'Jl. Diponegoro No.45 RT.02/RW.01, Kel. Sisir, Kec. Batu, Kota Batu 65314',
    pendidikan:'Magister Manajemen (S2)', instansi_asal:'PT Sejahtera Batu',
  })
  const set = (k:string,v:string) => setForm(p=>({...p,[k]:v}))
  const handleSave = () => { setEdit(false); setSaved(true); setTimeout(()=>setSaved(false),3000) }

  const inp = {width:'100%',padding:'10px 13px',borderRadius:'12px',fontSize:'13px',border:'1.5px solid',outline:'none',boxSizing:'border-box' as const,fontFamily:'Inter,sans-serif',transition:'all .15s'}
  const inpStyle = (editable:boolean) => ({...inp, borderColor: editable ? '#C8DDEF' : '#F1F5F9', background: editable ? '#fff' : '#F8FAFC', color: editable ? '#1E293B' : '#64748B'})

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Profil Saya"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Profil Saya'}]}
          actions={
            <button onClick={()=>edit?handleSave():setEdit(true)} style={{
              padding:'6px 16px',borderRadius:'9px',fontSize:'12px',fontWeight:'700',border:'none',cursor:'pointer',
              background:edit?'linear-gradient(135deg,#059669,#10B981)':'#1E3A5F',color:'#fff',
              display:'flex',alignItems:'center',gap:'6px',
              boxShadow:edit?'0 3px 10px rgba(5,150,105,.3)':'0 3px 10px rgba(30,58,95,.3)',
            }}>
              <i className={`ti ${edit?'ti-device-floppy':'ti-pencil'}`} style={{fontSize:'13px'}} />
              {edit?'Simpan Perubahan':'Edit Profil'}
            </button>
          }
        />
        <div style={{padding:'24px',maxWidth:'900px'}}>
          {saved&&(
            <div style={{background:'#ECFDF5',border:'1px solid #A7F3D0',borderRadius:'12px',padding:'11px 16px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px',animation:'fadeIn .3s ease'}}>
              <i className="ti ti-check-circle" style={{fontSize:'18px',color:'#059669'}} />
              <span style={{fontSize:'13px',fontWeight:'600',color:'#065F46'}}>Profil berhasil diperbarui.</span>
            </div>
          )}
          {/* Avatar card */}
          <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'24px',marginBottom:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
              <div style={{
                width:'72px',height:'72px',borderRadius:'20px',flexShrink:0,
                background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'26px',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',
              }}>BS</div>
              <div style={{flex:1}}>
                <h2 style={{fontSize:'1.2rem',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',margin:'0 0 4px'}}>{form.nama}</h2>
                <div style={{fontSize:'13px',color:'#64748B',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
                  <span><i className="ti ti-mail" style={{marginRight:'4px',color:'#94A3B8'}} />{form.email}</span>
                  <span><i className="ti ti-phone" style={{marginRight:'4px',color:'#94A3B8'}} />{form.telp}</span>
                </div>
                <div style={{marginTop:'8px',display:'flex',gap:'8px'}}>
                  <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',background:'#EBF2FA',color:'#1E3A5F'}}>Peserta Aktif</span>
                  <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',background:'#FFFBEB',color:'#D97706'}}>Menunggu Verifikasi</span>
                </div>
              </div>
              {edit && (
                <button style={{padding:'8px 14px',borderRadius:'10px',fontSize:'12px',fontWeight:'600',background:'#EBF2FA',color:'#1E3A5F',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
                  <i className="ti ti-camera" /> Ganti Foto
                </button>
              )}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
            {/* Data pribadi */}
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px',display:'flex',alignItems:'center',gap:'6px'}}>
                <i className="ti ti-user-circle" style={{fontSize:'16px',color:'#1E6AB5'}} /> Data Pribadi
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {[
                  {label:'Nama Lengkap',key:'nama'},
                  {label:'NIK',key:'nik'},
                  {label:'Tempat Lahir',key:'ttl'},
                  {label:'Tanggal Lahir',key:'tgl',type:'date'},
                  {label:'Alamat Lengkap',key:'alamat',multiline:true},
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',display:'block',marginBottom:'4px',letterSpacing:'0.04em',textTransform:'uppercase'}}>{f.label}</label>
                    {f.multiline?(
                      <textarea value={(form as any)[f.key]} onChange={e=>set(f.key,e.target.value)}
                        disabled={!edit} rows={3}
                        style={{...inpStyle(edit),resize:'vertical'}} />
                    ):(
                      <input type={f.type||'text'} value={(form as any)[f.key]} onChange={e=>set(f.key,e.target.value)}
                        disabled={!edit} style={inpStyle(edit)} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Data kontak & pendidikan */}
            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px',display:'flex',alignItems:'center',gap:'6px'}}>
                  <i className="ti ti-address-book" style={{fontSize:'16px',color:'#1E6AB5'}} /> Kontak & Akun
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {[{label:'Email',key:'email',type:'email'},{label:'No. HP / WhatsApp',key:'telp'}].map(f=>(
                    <div key={f.key}>
                      <label style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',display:'block',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.04em'}}>{f.label}</label>
                      <input type={f.type||'text'} value={(form as any)[f.key]} onChange={e=>set(f.key,e.target.value)} disabled={!edit} style={inpStyle(edit)} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'22px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{fontSize:'13px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'16px',display:'flex',alignItems:'center',gap:'6px'}}>
                  <i className="ti ti-school" style={{fontSize:'16px',color:'#1E6AB5'}} /> Pendidikan & Karir
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {[{label:'Pendidikan Terakhir',key:'pendidikan'},{label:'Instansi/Perusahaan Asal',key:'instansi_asal'}].map(f=>(
                    <div key={f.key}>
                      <label style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',display:'block',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.04em'}}>{f.label}</label>
                      <input value={(form as any)[f.key]} onChange={e=>set(f.key,e.target.value)} disabled={!edit} style={inpStyle(edit)} />
                    </div>
                  ))}
                </div>
              </div>
              {!edit && (
                <div style={{background:'linear-gradient(135deg,#EBF2FA,#F0F7FF)',borderRadius:'16px',padding:'16px',border:'1px solid #BFDBFE'}}>
                  <div style={{fontSize:'12px',fontWeight:'700',color:'#1E40AF',marginBottom:'4px',display:'flex',alignItems:'center',gap:'5px'}}>
                    <i className="ti ti-lock" style={{fontSize:'14px'}} /> Keamanan Akun
                  </div>
                  <div style={{fontSize:'12px',color:'#3730A3',marginBottom:'10px'}}>Perbarui kata sandi Anda secara berkala untuk keamanan akun.</div>
                  <button style={{width:'100%',padding:'8px',borderRadius:'9px',fontSize:'12px',fontWeight:'600',background:'#1E3A5F',color:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
                    <i className="ti ti-lock-password" /> Ubah Kata Sandi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
