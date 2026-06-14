'use client'
import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['Informasi Akun','Data Pribadi','Verifikasi OTP']

export default function RegisterPage() {
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState({ nama:'', email:'', telp:'', nik:'', ttl:'', tgl:'', alamat:'', password:'', confirm:'' })
  const [otp, setOtp]           = useState(['','','','','',''])
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)

  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}))

  const setOtpDigit = (i:number, v:string) => {
    if (v.length > 1) return
    const next = [...otp]; next[i]=v; setOtp(next)
    if (v && i<5) (document.getElementById(`otp-${i+1}`) as HTMLInputElement)?.focus()
  }

  const nextStep = () => {
    if (step === 1) {
      setLoading(true)
      setTimeout(() => { setLoading(false); setStep(2) }, 1000)
    } else setStep(s=>s+1)
  }

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/peserta/dashboard'
    }, 1500)
  }

  const inputStyle = {
    width:'100%', padding:'11px 14px', borderRadius:'12px', fontSize:'14px',
    border:'1.5px solid #E2E8F0', outline:'none', background:'#F8FAFC',
    transition:'all .15s', boxSizing:'border-box' as const,
  }
  const focusStyle = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor='#1E6AB5'; e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor='#E2E8F0'; e.target.style.boxShadow='none'
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#F8FAFC'}}>
      {/* Left branding */}
      <div style={{
        width:'38%',background:'linear-gradient(160deg,#095330 0%,#0E6B44 45%,#1EA870 100%)',
        display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px',
        position:'relative',overflow:'hidden',
      }}>
        <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',backgroundSize:'50px 50px'}} />
        <div style={{position:'absolute',top:'5%',right:'-10%',width:'280px',height:'280px',borderRadius:'50%',background:'radial-gradient(circle,rgba(62,187,143,.3) 0%,transparent 70%)'}} />
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'40px'}}>
            <div style={{width:'44px',height:'44px',borderRadius:'14px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,.2)'}}>
              <span style={{color:'#fff',fontWeight:'900',fontSize:'18px',fontFamily:'Plus Jakarta Sans'}}>S</span>
            </div>
            <div>
              <div style={{fontWeight:'900',fontSize:'18px',color:'#fff',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',letterSpacing:'0.1em'}}>PEMERINTAH KOTA BATU</div>
            </div>
          </div>
          <h1 style={{fontSize:'2rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',lineHeight:1.1,marginBottom:'14px'}}>
            Daftar Peserta<br/><span style={{color:'#6EE7B7'}}>Seleksi BUMD/BLUD</span>
          </h1>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,.7)',lineHeight:1.8,marginBottom:'32px'}}>
            Bergabunglah dalam proses seleksi yang transparan dan profesional untuk menjadi pemimpin BUMD/BLUD Kota Batu.
          </p>
          {/* Stepper info */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {STEPS.map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background: step===i ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.08)',borderRadius:'12px',border:`1px solid ${step===i?'rgba(255,255,255,.3)':'rgba(255,255,255,.1)'}`}}>
                <div style={{
                  width:'26px',height:'26px',borderRadius:'50%',flexShrink:0,
                  background: step>i ? '#10B981' : step===i ? '#fff' : 'rgba(255,255,255,.2)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'12px',fontWeight:'800',
                  color: step>i ? '#fff' : step===i ? '#0E6B44' : 'rgba(255,255,255,.5)',
                }}>
                  {step>i ? <i className="ti ti-check" style={{fontSize:'13px'}} /> : i+1}
                </div>
                <span style={{fontSize:'13px',fontWeight: step===i?'700':'500',color: step===i?'#fff':'rgba(255,255,255,.6)'}}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – form */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 80px',overflowY:'auto'}}>
        <div style={{maxWidth:'440px',width:'100%',margin:'0 auto'}}>
          <div style={{marginBottom:'28px'}}>
            <h2 style={{fontSize:'1.6rem',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'4px'}}>
              {STEPS[step]}
            </h2>
            <p style={{fontSize:'13px',color:'#64748B'}}>
              {step===0 && 'Buat akun untuk mengikuti seleksi BUMD/BLUD'}
              {step===1 && 'Lengkapi data pribadi Anda'}
              {step===2 && 'Masukkan kode OTP yang dikirim ke email Anda'}
            </p>
          </div>

          {/* Progress bar */}
          <div style={{height:'4px',background:'#E2E8F0',borderRadius:'4px',marginBottom:'28px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${((step+1)/STEPS.length)*100}%`,background:'linear-gradient(90deg,#0E6B44,#1EA870)',borderRadius:'4px',transition:'width .4s ease'}} />
          </div>

          {/* Step 0: Informasi Akun */}
          {step===0 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>NAMA LENGKAP (Sesuai KTP) *</label>
                <input value={form.nama} onChange={e=>set('nama',e.target.value)} placeholder="Dr. Nama Lengkap, M.M." style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>ALAMAT EMAIL *</label>
                <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="nama@email.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>NOMOR HP / WhatsApp *</label>
                <input type="tel" value={form.telp} onChange={e=>set('telp',e.target.value)} placeholder="0812-xxxx-xxxx" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>KATA SANDI *</label>
                <div style={{position:'relative'}}>
                  <input type={showPass?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)}
                    placeholder="Min. 8 karakter" style={{...inputStyle,paddingRight:'40px'}} onFocus={focusStyle} onBlur={blurStyle} />
                  <button onClick={()=>setShowPass(!showPass)} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#94A3B8'}}>
                    <i className={`ti ${showPass?'ti-eye-off':'ti-eye'}`} style={{fontSize:'16px'}} />
                  </button>
                </div>
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>KONFIRMASI KATA SANDI *</label>
                <input type="password" value={form.confirm} onChange={e=>set('confirm',e.target.value)}
                  placeholder="Ulangi kata sandi" style={{...inputStyle, borderColor: form.confirm && form.confirm!==form.password ? '#EF4444' : '#E2E8F0'}} onFocus={focusStyle} onBlur={blurStyle} />
                {form.confirm && form.confirm!==form.password && <div style={{fontSize:'11px',color:'#EF4444',marginTop:'4px'}}>Kata sandi tidak cocok</div>}
              </div>
            </div>
          )}

          {/* Step 1: Data Pribadi */}
          {step===1 && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>NIK (Nomor Induk Kependudukan) *</label>
                <input value={form.nik} onChange={e=>set('nik',e.target.value)} placeholder="16 digit NIK" maxLength={16} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>TEMPAT LAHIR *</label>
                  <input value={form.ttl} onChange={e=>set('ttl',e.target.value)} placeholder="Kota Batu" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>TANGGAL LAHIR *</label>
                  <input type="date" value={form.tgl} onChange={e=>set('tgl',e.target.value)} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>
              <div>
                <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>ALAMAT LENGKAP *</label>
                <textarea value={form.alamat} onChange={e=>set('alamat',e.target.value)} placeholder="Jl. Nama Jalan No.xx, RT/RW, Kel., Kec., Kota" rows={3}
                  style={{...inputStyle, resize:'vertical', fontFamily:'Inter, sans-serif'}} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div style={{padding:'14px 16px',background:'#FFFBEB',borderRadius:'12px',border:'1px solid #FDE68A',fontSize:'12px',color:'#92400E',display:'flex',alignItems:'flex-start',gap:'8px'}}>
                <i className="ti ti-info-circle" style={{fontSize:'16px',flexShrink:0,marginTop:'1px'}} />
                <span>Pastikan data Anda sesuai dengan KTP. Data ini akan digunakan untuk verifikasi identitas selama proses seleksi.</span>
              </div>
            </div>
          )}

          {/* Step 2: OTP */}
          {step===2 && (
            <div style={{textAlign:'center'}}>
              <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,#095330,#1EA870)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                <i className="ti ti-mail" style={{fontSize:'32px',color:'#fff'}} />
              </div>
              <h3 style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Cek Email Anda</h3>
              <p style={{fontSize:'13px',color:'#64748B',marginBottom:'28px',lineHeight:1.7}}>
                Kode verifikasi 6 digit telah dikirim ke<br/>
                <strong style={{color:'#1E293B'}}>{form.email || 'email Anda'}</strong>
              </p>
              {/* OTP inputs */}
              <div style={{display:'flex',gap:'10px',justifyContent:'center',marginBottom:'24px'}}>
                {otp.map((digit,i)=>(
                  <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={e=>setOtpDigit(i,e.target.value)}
                    style={{
                      width:'48px',height:'56px',textAlign:'center',fontSize:'1.4rem',fontWeight:'800',
                      borderRadius:'12px',border:`2px solid ${digit?'#1EA870':'#E2E8F0'}`,
                      outline:'none',fontFamily:'Plus Jakarta Sans',
                      background: digit ? '#EDFAF4' : '#F8FAFC',
                      color: digit ? '#0E6B44' : '#94A3B8',
                      transition:'all .15s',
                    }}
                    onFocus={e=>{e.target.style.borderColor='#1EA870';e.target.style.boxShadow='0 0 0 3px rgba(30,168,112,.15)'}}
                    onBlur={e=>{if(!digit){e.target.style.borderColor='#E2E8F0';e.target.style.boxShadow='none'}}}
                  />
                ))}
              </div>
              <p style={{fontSize:'12px',color:'#94A3B8',marginBottom:'8px'}}>Tidak menerima kode?</p>
              <button style={{background:'none',border:'none',cursor:'pointer',fontSize:'12px',fontWeight:'700',color:'#0E6B44'}}>
                Kirim Ulang (00:45)
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{display:'flex',gap:'10px',marginTop:'28px'}}>
            {step > 0 && (
              <button onClick={()=>setStep(s=>s-1)} style={{
                flex:1,padding:'12px',borderRadius:'12px',fontSize:'14px',fontWeight:'600',
                background:'#fff',color:'#475569',border:'1.5px solid #E2E8F0',cursor:'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
              }}>
                <i className="ti ti-arrow-left" style={{fontSize:'16px'}} /> Kembali
              </button>
            )}
            {step < 2 && (
              <button onClick={nextStep} disabled={loading}
                style={{
                  flex:2,padding:'12px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
                  background:'linear-gradient(135deg,#095330,#1EA870)',color:'#fff',
                  border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                  boxShadow:'0 4px 16px rgba(30,168,112,.3)',transition:'all .15s',
                }}>
                {loading
                  ? <><i className="ti ti-loader-2" style={{fontSize:'16px',animation:'spin 1s linear infinite'}} /> Memproses...</>
                  : <>{step===1?'Kirim Kode OTP':'Lanjut'} <i className="ti ti-arrow-right" style={{fontSize:'16px'}} /></>}
              </button>
            )}
            {step === 2 && (
              <button onClick={handleRegister} disabled={otp.some(d=>!d) || loading}
                style={{
                  flex:2,padding:'12px',borderRadius:'12px',fontSize:'14px',fontWeight:'700',
                  background: otp.every(d=>d) ? 'linear-gradient(135deg,#095330,#1EA870)' : '#E2E8F0',
                  color: otp.every(d=>d) ? '#fff' : '#94A3B8',
                  border:'none',cursor: otp.every(d=>d) ? 'pointer' : 'not-allowed',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                  boxShadow: otp.every(d=>d) ? '0 4px 16px rgba(30,168,112,.3)' : 'none',
                }}>
                {loading
                  ? <><i className="ti ti-loader-2" style={{fontSize:'16px',animation:'spin 1s linear infinite'}} /> Mendaftarkan...</>
                  : <><i className="ti ti-check" style={{fontSize:'16px'}} /> Selesai Daftar</>}
              </button>
            )}
          </div>

          <div style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:'#64748B'}}>
            Sudah punya akun?{' '}
            <Link href="/login" style={{color:'#0E6B44',fontWeight:'700',textDecoration:'none'}}>Masuk</Link>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
