'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [role, setRole]         = useState('peserta')

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const routes: Record<string,string> = {
        peserta:'/peserta/dashboard', panitia:'/panitia/dashboard',
        ukk:'/ukk/penilaian', kpm:'/kpm/dashboard',
      }
      window.location.href = routes[role] ?? '/peserta/dashboard'
    }, 1200)
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#F8FAFC'}}>
      {/* Left – branding */}
      <div style={{
        width:'45%',background:'linear-gradient(160deg, #0D1F38 0%, #1E3A5F 45%, #1E6AB5 100%)',
        display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px',
        position:'relative',overflow:'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position:'absolute',inset:0,opacity:.04,
          backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize:'50px 50px',
        }} />
        {/* Orbs */}
        <div style={{position:'absolute',top:'10%',right:'-10%',width:'300px',height:'300px',borderRadius:'50%',background:'radial-gradient(circle,rgba(78,142,199,.3) 0%,transparent 70%)'}} />
        <div style={{position:'absolute',bottom:'10%',left:'-5%',width:'200px',height:'200px',borderRadius:'50%',background:'radial-gradient(circle,rgba(62,187,143,.2) 0%,transparent 70%)'}} />

        <div style={{position:'relative',zIndex:1}}>
          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'48px'}}>
            <div style={{width:'44px',height:'44px',borderRadius:'14px',background:'rgba(255,255,255,.15)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,.2)'}}>
              <span style={{color:'#fff',fontWeight:'900',fontSize:'18px',fontFamily:'Plus Jakarta Sans, sans-serif'}}>S</span>
            </div>
            <div>
              <div style={{fontWeight:'900',fontSize:'18px',color:'#fff',fontFamily:'Plus Jakarta Sans, sans-serif'}}>SIMBUBALADA</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',letterSpacing:'0.1em'}}>PEMERINTAH KOTA BATU</div>
            </div>
          </div>

          <h1 style={{fontSize:'2.4rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',lineHeight:1.1,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            Sistem Seleksi<br/>
            <span style={{color:'#7DB3DA'}}>BUMD & BLUD</span>
          </h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.65)',lineHeight:1.8,marginBottom:'40px',maxWidth:'340px'}}>
            Platform seleksi digital terintegrasi untuk Direksi, Komisaris, dan Dewan Pengawas BUMD/BLUD Pemerintah Kota Batu.
          </p>

          {/* Feature pills */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[
              {icon:'ti-shield-check',text:'Proses seleksi transparan & akuntabel'},
              {icon:'ti-clock',       text:'Monitoring realtime setiap tahapan'},
              {icon:'ti-file-check',  text:'Generate dokumen otomatis (PDF/DOCX)'},
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:'rgba(255,255,255,.08)',borderRadius:'12px',border:'1px solid rgba(255,255,255,.1)'}}>
                <i className={`ti ${f.icon}`} style={{fontSize:'16px',color:'#7DB3DA',flexShrink:0}} />
                <span style={{fontSize:'13px',color:'rgba(255,255,255,.8)'}}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – form */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 80px'}}>
        <div style={{maxWidth:'400px',width:'100%',margin:'0 auto'}}>
          <div style={{marginBottom:'32px'}}>
            <h2 style={{fontSize:'1.8rem',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'6px'}}>
              Selamat Datang
            </h2>
            <p style={{fontSize:'14px',color:'#64748B'}}>Masuk ke portal SIMBUBALADA</p>
          </div>

          {/* Role selector */}
          <div style={{marginBottom:'24px'}}>
            <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'8px',letterSpacing:'0.04em'}}>MASUK SEBAGAI</label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'8px'}}>
              {[
                {val:'peserta', icon:'ti-user',            label:'Peserta',  desc:'Calon pejabat'},
                {val:'panitia', icon:'ti-clipboard-list',  label:'Panitia',  desc:'Tim verifikasi'},
                {val:'ukk',     icon:'ti-star',            label:'Tim UKK',  desc:'Penilai UKK'},
                {val:'kpm',     icon:'ti-crown',           label:'KPM/RUPS', desc:'Penetapan'},
              ].map(r=>(
                <button key={r.val} onClick={()=>setRole(r.val)} style={{
                  padding:'12px',borderRadius:'12px',textAlign:'left',cursor:'pointer',
                  background: role===r.val ? '#EBF2FA' : '#F8FAFC',
                  border: `2px solid ${role===r.val ? '#1E6AB5' : '#E2E8F0'}`,
                  transition:'all .15s',
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'8px',background:role===r.val?'#1E6AB5':'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <i className={`ti ${r.icon}`} style={{fontSize:'14px',color:role===r.val?'#fff':'#94A3B8'}} />
                    </div>
                    <div>
                      <div style={{fontSize:'12px',fontWeight:'700',color:role===r.val?'#1E3A5F':'#334155'}}>{r.label}</div>
                      <div style={{fontSize:'10px',color:'#94A3B8'}}>{r.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>EMAIL</label>
            <div style={{position:'relative'}}>
              <i className="ti ti-mail" style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:'#94A3B8'}} />
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="nama@email.com"
                style={{
                  width:'100%',padding:'11px 12px 11px 40px',borderRadius:'12px',fontSize:'14px',
                  border:'1.5px solid #E2E8F0',outline:'none',background:'#F8FAFC',
                  transition:'all .15s',boxSizing:'border-box',
                }}
                onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                onBlur={e=>{e.target.style.borderColor='#E2E8F0';e.target.style.boxShadow='none'}}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{marginBottom:'8px'}}>
            <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>KATA SANDI</label>
            <div style={{position:'relative'}}>
              <i className="ti ti-lock" style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:'#94A3B8'}} />
              <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width:'100%',padding:'11px 40px 11px 40px',borderRadius:'12px',fontSize:'14px',
                  border:'1.5px solid #E2E8F0',outline:'none',background:'#F8FAFC',
                  transition:'all .15s',boxSizing:'border-box',
                }}
                onFocus={e=>{e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}}
                onBlur={e=>{e.target.style.borderColor='#E2E8F0';e.target.style.boxShadow='none'}}
              />
              <button onClick={()=>setShowPass(!showPass)} style={{
                position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',
                background:'none',border:'none',cursor:'pointer',color:'#94A3B8',
              }}>
                <i className={`ti ${showPass?'ti-eye-off':'ti-eye'}`} style={{fontSize:'16px'}} />
              </button>
            </div>
          </div>

          <div style={{textAlign:'right',marginBottom:'24px'}}>
            <Link href="/lupa-sandi" style={{fontSize:'12px',color:'#1E6AB5',textDecoration:'none',fontWeight:'600'}}>
              Lupa kata sandi?
            </Link>
          </div>

          {/* Submit */}
          <button onClick={handleLogin} disabled={loading || !email || !password}
            style={{
              width:'100%',padding:'13px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
              background: (!email||!password) ? '#E2E8F0' : 'linear-gradient(135deg,#1E3A5F,#1E6AB5)',
              color: (!email||!password) ? '#94A3B8' : '#fff',
              border:'none',cursor: (!email||!password) ? 'not-allowed' : 'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
              boxShadow: (email&&password) ? '0 4px 16px rgba(30,106,181,.3)' : 'none',
              transition:'all .15s',
            }}>
            {loading
              ? <><i className="ti ti-loader-2" style={{fontSize:'17px',animation:'spin 1s linear infinite'}} /> Memproses...</>
              : <><i className="ti ti-login" style={{fontSize:'17px'}} /> Masuk</>
            }
          </button>

          <div style={{textAlign:'center',marginTop:'24px',fontSize:'13px',color:'#64748B'}}>
            Belum punya akun?{' '}
            <Link href="/register" style={{color:'#1E6AB5',fontWeight:'700',textDecoration:'none'}}>
              Daftar Peserta
            </Link>
          </div>

          <div style={{marginTop:'32px',paddingTop:'24px',borderTop:'1px solid #F1F5F9',textAlign:'center'}}>
            <div style={{fontSize:'11px',color:'#94A3B8'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
