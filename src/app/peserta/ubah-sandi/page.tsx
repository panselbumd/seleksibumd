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
  { href:'/peserta/ubah-sandi', icon:'ti-lock',             label:'Ubah Kata Sandi',section:'AKUN' },
]

export default function UbahSandiPage() {
  const [form, setForm]       = useState({ lama:'', baru:'', konfirm:'' })
  const [show, setShow]       = useState({ lama:false, baru:false, konfirm:false })
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  const set = (k:string,v:string) => { setForm(p=>({...p,[k]:v})); setError('') }
  const tog = (k:string) => setShow(p=>({...p,[k]:!(p as any)[k]}))

  const kekuatan = () => {
    const p = form.baru
    if (!p) return 0
    let score = 0
    if (p.length >= 8)  score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }
  const kuat = kekuatan()
  const kekuatanLabel  = ['','Lemah','Cukup','Kuat','Sangat Kuat'][kuat]
  const kekuatanColor  = ['','#DC2626','#D97706','#2563EB','#059669'][kuat]
  const kekuatanWidth  = [0,25,50,75,100][kuat]

  const handleSubmit = () => {
    if (!form.lama)    return setError('Kata sandi lama wajib diisi.')
    if (form.baru.length < 8) return setError('Kata sandi baru minimal 8 karakter.')
    if (form.baru !== form.konfirm) return setError('Konfirmasi kata sandi tidak cocok.')
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  const inp = (show: boolean) => ({
    width:'100%', padding:'11px 44px 11px 44px', borderRadius:'12px', fontSize:'14px',
    border:'1.5px solid #E2E8F0', outline:'none', background:'#F8FAFC',
    transition:'all .15s', boxSizing:'border-box' as const,
  })

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Ubah Kata Sandi"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Ubah Kata Sandi'}]} />
        <div style={{padding:'24px',display:'flex',justifyContent:'center'}}>
          <div style={{width:'100%',maxWidth:'500px'}}>

            {done ? (
              <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'48px 32px',textAlign:'center',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',boxShadow:'0 0 0 12px rgba(16,185,129,.1)'}}>
                  <i className="ti ti-check" style={{fontSize:'32px',color:'#fff'}} />
                </div>
                <h3 style={{fontSize:'1.2rem',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Kata Sandi Berhasil Diubah!</h3>
                <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.7,marginBottom:'24px'}}>Kata sandi akun Anda telah berhasil diperbarui. Gunakan kata sandi baru Anda saat login berikutnya.</p>
                <button onClick={()=>{setDone(false);setForm({lama:'',baru:'',konfirm:''})}}
                  style={{padding:'10px 24px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',border:'none',cursor:'pointer'}}>
                  Kembali
                </button>
              </div>
            ) : (
              <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'28px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px',paddingBottom:'20px',borderBottom:'1px solid #F1F5F9'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'#EBF2FA',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <i className="ti ti-lock-password" style={{fontSize:'24px',color:'#1E3A5F'}} />
                  </div>
                  <div>
                    <div style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Ubah Kata Sandi</div>
                    <div style={{fontSize:'12px',color:'#94A3B8',marginTop:'2px'}}>Perbarui kata sandi akun SIMBUBALADA Anda</div>
                  </div>
                </div>

                {/* Kata sandi lama */}
                {[
                  {label:'KATA SANDI LAMA *',     key:'lama',    ph:'Masukkan kata sandi lama'},
                  {label:'KATA SANDI BARU *',      key:'baru',    ph:'Min. 8 karakter'},
                  {label:'KONFIRMASI KATA SANDI *',key:'konfirm', ph:'Ulangi kata sandi baru'},
                ].map(f=>(
                  <div key={f.key} style={{marginBottom:'16px'}}>
                    <label style={{fontSize:'11px',fontWeight:'700',color:'#475569',display:'block',marginBottom:'6px',letterSpacing:'0.06em'}}>{f.label}</label>
                    <div style={{position:'relative'}}>
                      <i className="ti ti-lock" style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:'#94A3B8'}} />
                      <input
                        type={(show as any)[f.key]?'text':'password'}
                        value={(form as any)[f.key]}
                        onChange={e=>set(f.key,e.target.value)}
                        placeholder={f.ph}
                        style={inp((show as any)[f.key])}
                        onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)';e.target.style.background='#fff'}}
                        onBlur={e=>{e.target.style.borderColor='#E2E8F0';e.target.style.boxShadow='none';e.target.style.background='#F8FAFC'}}
                      />
                      <button onClick={()=>tog(f.key)} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#94A3B8'}}>
                        <i className={`ti ${(show as any)[f.key]?'ti-eye-off':'ti-eye'}`} style={{fontSize:'16px'}} />
                      </button>
                    </div>
                    {/* Indikator kekuatan hanya untuk field baru */}
                    {f.key==='baru' && form.baru && (
                      <div style={{marginTop:'8px'}}>
                        <div style={{height:'4px',background:'#F1F5F9',borderRadius:'4px',overflow:'hidden',marginBottom:'4px'}}>
                          <div style={{height:'100%',width:`${kekuatanWidth}%`,background:kekuatanColor,borderRadius:'4px',transition:'all .3s'}} />
                        </div>
                        <div style={{fontSize:'11px',fontWeight:'600',color:kekuatanColor}}>Kekuatan: {kekuatanLabel}</div>
                      </div>
                    )}
                    {/* Cek cocok untuk konfirm */}
                    {f.key==='konfirm' && form.konfirm && form.baru!==form.konfirm && (
                      <div style={{fontSize:'11px',color:'#DC2626',marginTop:'4px',display:'flex',alignItems:'center',gap:'3px'}}>
                        <i className="ti ti-x-circle" style={{fontSize:'12px'}} /> Kata sandi tidak cocok
                      </div>
                    )}
                    {f.key==='konfirm' && form.konfirm && form.baru===form.konfirm && (
                      <div style={{fontSize:'11px',color:'#059669',marginTop:'4px',display:'flex',alignItems:'center',gap:'3px'}}>
                        <i className="ti ti-check-circle" style={{fontSize:'12px'}} /> Kata sandi cocok
                      </div>
                    )}
                  </div>
                ))}

                {/* Syarat password */}
                <div style={{background:'#F8FAFC',borderRadius:'12px',padding:'14px 16px',marginBottom:'20px',border:'1px solid #E2E8F0'}}>
                  <div style={{fontSize:'11px',fontWeight:'700',color:'#475569',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.06em'}}>Syarat Kata Sandi</div>
                  {[
                    {ok:form.baru.length>=8,          text:'Minimal 8 karakter'},
                    {ok:/[A-Z]/.test(form.baru),      text:'Mengandung huruf kapital (A-Z)'},
                    {ok:/[0-9]/.test(form.baru),      text:'Mengandung angka (0-9)'},
                    {ok:/[^A-Za-z0-9]/.test(form.baru),text:'Mengandung karakter khusus (!@#$...)'},
                  ].map((s,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'5px'}}>
                      <i className={`ti ${form.baru&&s.ok?'ti-check-circle':'ti-circle'}`}
                        style={{fontSize:'14px',color:form.baru&&s.ok?'#059669':'#CBD5E1'}} />
                      <span style={{fontSize:'12px',color:form.baru&&s.ok?'#059669':'#94A3B8'}}>{s.text}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div style={{padding:'10px 14px',borderRadius:'10px',background:'#FEF2F2',border:'1px solid #FECACA',color:'#DC2626',fontSize:'12px',fontWeight:'600',display:'flex',alignItems:'center',gap:'6px',marginBottom:'16px'}}>
                    <i className="ti ti-alert-circle" style={{fontSize:'15px'}} /> {error}
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading}
                  style={{
                    width:'100%',padding:'13px',borderRadius:'13px',fontSize:'14px',fontWeight:'700',border:'none',
                    cursor:loading?'not-allowed':'pointer',
                    background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                    boxShadow:'0 4px 14px rgba(30,106,181,.3)',transition:'all .15s',
                    opacity:loading?0.8:1,
                  }}>
                  {loading
                    ? <><i className="ti ti-loader-2" style={{fontSize:'17px',animation:'spin 1s linear infinite'}} />Memperbarui...</>
                    : <><i className="ti ti-lock-check" style={{fontSize:'17px'}} />Perbarui Kata Sandi</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
