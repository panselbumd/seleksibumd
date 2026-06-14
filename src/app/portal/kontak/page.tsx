'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function KontakPage() {
  const [form, setForm] = useState({nama:'',email:'',subjek:'',pesan:''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k:string,v:string) => setForm(p=>({...p,[k]:v}))

  const handleSubmit = () => {
    if(!form.nama||!form.email||!form.pesan) return
    setLoading(true)
    setTimeout(()=>{setLoading(false);setSent(true)},1500)
  }

  const inp = {
    width:'100%',padding:'11px 14px',borderRadius:'12px',fontSize:'14px',
    border:'1.5px solid #E2E8F0',outline:'none',background:'#fff',
    boxSizing:'border-box' as const,fontFamily:'Inter,sans-serif',transition:'all .15s',
  }
  const focus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {e.target.style.borderColor='#1E6AB5';e.target.style.boxShadow='0 0 0 3px rgba(30,106,181,.1)'}
  const blur  = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {e.target.style.borderColor='#E2E8F0';e.target.style.boxShadow='none'}

  return (
    <div style={{minHeight:'100vh',background:'#F8FAFC'}}>
      <header style={{background:'#1E3A5F',padding:'0 32px',display:'flex',alignItems:'center',height:'60px',gap:'16px',position:'sticky',top:0,zIndex:50}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#fff',fontWeight:'900',fontSize:'13px',fontFamily:'Plus Jakarta Sans'}}>S</span>
          </div>
          <span style={{fontWeight:'800',fontSize:'14px',color:'#fff',fontFamily:'Plus Jakarta Sans'}}>SIMBUBALADA</span>
        </Link>
        <div style={{flex:1}} />
        {[['Beranda','/'],['Pengumuman','/portal/pengumuman'],['Jadwal','/portal/jadwal'],['FAQ','/portal/faq'],['Kontak','/portal/kontak']].map(([l,h])=>(
          <Link key={h} href={h} style={{textDecoration:'none',fontSize:'13px',padding:'6px 12px',borderRadius:'8px',color:'rgba(255,255,255,.8)',fontWeight:'500'}}>{l}</Link>
        ))}
        <Link href="/login" style={{textDecoration:'none',padding:'7px 16px',borderRadius:'10px',background:'rgba(255,255,255,.15)',color:'#fff',fontSize:'13px',fontWeight:'600',border:'1px solid rgba(255,255,255,.2)'}}>Masuk</Link>
      </header>

      <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',padding:'48px 32px 64px'}}>
        <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center'}}>
          <h1 style={{fontSize:'2rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Hubungi Kami</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.75)'}}>Panitia Seleksi BUMD/BLUD Pemerintah Kota Batu</p>
        </div>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'40px 16px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'28px'}}>
          {/* Info kontak */}
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'24px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
              <div style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'18px'}}>Informasi Kontak Panitia</div>
              {[
                {icon:'ti-building-community',label:'Alamat',val:'Jl. Panglima Sudirman No.507, Sisir, Kec. Batu, Kota Batu, Jawa Timur 65314',color:'#1E3A5F'},
                {icon:'ti-phone',             label:'Telepon',val:'(0341) 512223 ext. 120',color:'#059669'},
                {icon:'ti-mail',              label:'Email',  val:'pansel@batukota.go.id',color:'#1E6AB5'},
                {icon:'ti-brand-whatsapp',    label:'WhatsApp',val:'0812-3456-7890 (Jam Kerja)',color:'#25D366'},
                {icon:'ti-clock',             label:'Jam Kerja',val:'Senin–Jumat, 08.00–16.00 WIB',color:'#D97706'},
              ].map((c,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'14px'}}>
                  <div style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,background:`${c.color}15`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <i className={`ti ${c.icon}`} style={{fontSize:'18px',color:c.color}} />
                  </div>
                  <div>
                    <div style={{fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'2px'}}>{c.label}</div>
                    <div style={{fontSize:'13px',color:'#1E293B',fontWeight:'500',lineHeight:1.4}}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'20px',padding:'22px',color:'#fff'}}>
              <i className="ti ti-map-pin" style={{fontSize:'32px',marginBottom:'10px',display:'block',color:'rgba(255,255,255,.7)'}} />
              <div style={{fontSize:'14px',fontWeight:'700',fontFamily:'Plus Jakarta Sans',marginBottom:'6px'}}>Kantor Panitia Seleksi</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,.75)',lineHeight:1.6}}>Gedung Sekretariat Daerah, Lt. 3<br/>Jl. Panglima Sudirman No.507<br/>Kota Batu, Jawa Timur 65314</div>
            </div>
          </div>

          {/* Form */}
          <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'28px',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'40px 20px'}}>
                <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',boxShadow:'0 0 0 12px rgba(16,185,129,.1)'}}>
                  <i className="ti ti-check" style={{fontSize:'32px',color:'#fff'}} />
                </div>
                <h3 style={{fontSize:'18px',fontWeight:'800',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'8px'}}>Pesan Terkirim!</h3>
                <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.7,marginBottom:'20px'}}>
                  Terima kasih telah menghubungi kami. Panitia seleksi akan merespons dalam 1-2 hari kerja ke email <strong>{form.email}</strong>.
                </p>
                <button onClick={()=>{setSent(false);setForm({nama:'',email:'',subjek:'',pesan:''})}}
                  style={{padding:'10px 24px',borderRadius:'12px',fontSize:'13px',fontWeight:'700',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',border:'none',cursor:'pointer'}}>
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <>
                <div style={{fontSize:'15px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans',marginBottom:'20px'}}>Kirim Pesan</div>
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                    <div>
                      <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>NAMA LENGKAP *</label>
                      <input value={form.nama} onChange={e=>set('nama',e.target.value)} placeholder="Nama Anda" style={inp} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>EMAIL *</label>
                      <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@domain.com" style={inp} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>
                  <div>
                    <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>SUBJEK</label>
                    <select value={form.subjek} onChange={e=>set('subjek',e.target.value)} style={{...inp,appearance:'none'}} onFocus={focus} onBlur={blur}>
                      <option value="">-- Pilih Subjek --</option>
                      <option>Pertanyaan Pendaftaran</option>
                      <option>Dokumen Persyaratan</option>
                      <option>Jadwal Seleksi</option>
                      <option>Teknis Sistem</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:'12px',fontWeight:'600',color:'#475569',display:'block',marginBottom:'6px'}}>PESAN *</label>
                    <textarea value={form.pesan} onChange={e=>set('pesan',e.target.value)}
                      placeholder="Tuliskan pertanyaan atau pesan Anda di sini..." rows={5}
                      style={{...inp,resize:'vertical'}} onFocus={focus} onBlur={blur} />
                  </div>
                  <button onClick={handleSubmit}
                    disabled={!form.nama||!form.email||!form.pesan||loading}
                    style={{
                      padding:'13px',borderRadius:'13px',fontSize:'14px',fontWeight:'700',border:'none',
                      cursor:(!form.nama||!form.email||!form.pesan||loading)?'not-allowed':'pointer',
                      background:(!form.nama||!form.email||!form.pesan)?'#E2E8F0':'linear-gradient(135deg,#1E3A5F,#1E6AB5)',
                      color:(!form.nama||!form.email||!form.pesan)?'#94A3B8':'#fff',
                      display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      boxShadow:(form.nama&&form.email&&form.pesan&&!loading)?'0 4px 14px rgba(30,106,181,.3)':'none',
                      transition:'all .15s',
                    }}>
                    {loading?<><i className="ti ti-loader-2" style={{fontSize:'16px',animation:'spin 1s linear infinite'}} />Mengirim...</>:<><i className="ti ti-send" style={{fontSize:'16px'}} />Kirim Pesan</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{background:'#1E293B',padding:'24px 32px',textAlign:'center',marginTop:'40px'}}>
        <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
      </footer>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
