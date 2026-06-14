'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQ = [
  { q:'Siapa saja yang bisa mendaftar seleksi BUMD/BLUD?',
    a:'Warga Negara Indonesia yang memenuhi persyaratan umum: pendidikan minimal S1, pengalaman kerja relevan minimal 5 tahun, tidak sedang menjabat di instansi lain yang berbenturan kepentingan, dan memenuhi persyaratan khusus sesuai jabatan yang dilamar.' },
  { q:'Apa saja dokumen yang wajib diunggah saat pendaftaran?',
    a:'Dokumen wajib meliputi: KTP, Curriculum Vitae (CV), Ijazah terakhir (min. S1), Pas foto 4×6 terbaru, NPWP, Surat Lamaran ditandatangani, SKCK (maks. 6 bulan), dan Surat Keterangan Sehat dari dokter/RS. Sertifikat kompetensi bersifat opsional.' },
  { q:'Bagaimana mekanisme verifikasi administrasi?',
    a:'Setelah peserta mengupload seluruh dokumen, Panitia Seleksi akan memeriksa kelengkapan dan keabsahan berkas dalam waktu 3-5 hari kerja. Peserta akan mendapatkan notifikasi email dan dapat memantau status di portal SIMBUBALADA.' },
  { q:'Apa itu UKK (Uji Kelayakan dan Kepatutan)?',
    a:'UKK adalah tahapan seleksi yang mencakup 5 komponen penilaian: Psikotes (bobot 20%), Tes Tulis (20%), Paparan Makalah (20%), Wawancara KPM (25%), dan Penilaian Integritas (15%). Nilai akhir dihitung berdasarkan bobot masing-masing komponen.' },
  { q:'Berapa lama proses seleksi berlangsung?',
    a:'Proses seleksi umumnya berlangsung 6-8 minggu, mulai dari pengumuman dan pendaftaran hingga penetapan pejabat terpilih. Jadwal lengkap dapat dipantau di menu Jadwal pada portal ini.' },
  { q:'Apakah seorang peserta bisa mendaftar lebih dari satu posisi?',
    a:'Tidak. Setiap peserta hanya diperbolehkan mendaftar pada satu posisi/jabatan dalam satu periode seleksi. Pendaftaran yang telah disubmit tidak dapat dibatalkan.' },
  { q:'Bagaimana jika dokumen yang diunggah dinyatakan tidak valid?',
    a:'Panitia akan memberikan catatan penolakan dan peserta dapat mengganti dokumen yang bermasalah selama masih dalam batas waktu upload. Jika batas waktu telah habis, peserta dinyatakan tidak lulus administrasi.' },
  { q:'Kapan peserta dapat mengetahui hasil akhir seleksi?',
    a:'Hasil akhir seleksi akan diumumkan melalui portal SIMBUBALADA setelah Komite Pemangku Modal (KPM) atau RUPS menetapkan pejabat terpilih. Peserta juga akan mendapatkan notifikasi email resmi.' },
]

def PublicHeader(): return ""

export default function FAQPage() {
  const [open, setOpen] = useState<number|null>(null)
  const [search, setSearch] = useState('')

  const filtered = FAQ.filter(f=>!search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))

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
        {[['Beranda','/'],['Profil BUMD','/portal/profil-bumd'],['Profil BLUD','/portal/profil-blud'],['Pengumuman','/portal/pengumuman'],['Jadwal','/portal/jadwal'],['FAQ','/portal/faq']].map(([l,h])=>(
          <Link key={h} href={h} style={{textDecoration:'none',fontSize:'13px',padding:'6px 12px',borderRadius:'8px',color:h==='/portal/faq'?'#fff':'rgba(255,255,255,.8)',fontWeight:h==='/portal/faq'?'700':'500',background:h==='/portal/faq'?'rgba(255,255,255,.15)':'transparent'}}>{l}</Link>
        ))}
        <Link href="/login" style={{textDecoration:'none',padding:'7px 16px',borderRadius:'10px',background:'rgba(255,255,255,.15)',color:'#fff',fontSize:'13px',fontWeight:'600',border:'1px solid rgba(255,255,255,.2)'}}>Masuk</Link>
      </header>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',padding:'48px 32px 64px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-30,right:-30,width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,.05)'}} />
        <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center',position:'relative'}}>
          <h1 style={{fontSize:'2.2rem',fontWeight:'900',color:'#fff',fontFamily:'Plus Jakarta Sans',marginBottom:'10px'}}>Pertanyaan yang Sering Diajukan</h1>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,.75)',marginBottom:'28px'}}>Temukan jawaban atas pertanyaan seputar proses seleksi BUMD/BLUD Kota Batu</p>
          <div style={{position:'relative',maxWidth:'480px',margin:'0 auto'}}>
            <i className="ti ti-search" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:'#94A3B8'}} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari pertanyaan..."
              style={{width:'100%',padding:'13px 14px 13px 42px',borderRadius:'14px',fontSize:'14px',border:'none',outline:'none',background:'rgba(255,255,255,.95)',boxSizing:'border-box'}} />
          </div>
        </div>
      </div>

      <div style={{maxWidth:'760px',margin:'0 auto',padding:'40px 16px'}}>
        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'60px',color:'#94A3B8'}}>
            <i className="ti ti-search" style={{fontSize:'48px',display:'block',marginBottom:'12px',color:'#CBD5E1'}} />
            <div style={{fontSize:'15px',fontWeight:'600',color:'#64748B'}}>Tidak ada hasil</div>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {filtered.map((item,i)=>{
              const isOpen = open===i
              return (
                <div key={i} style={{background:'#fff',borderRadius:'16px',border:`1.5px solid ${isOpen?'#1E6AB5':'#E2E8F0'}`,overflow:'hidden',boxShadow:isOpen?'0 4px 16px rgba(30,106,181,.1)':'0 1px 3px rgba(0,0,0,.04)',transition:'all .2s'}}>
                  <button onClick={()=>setOpen(isOpen?null:i)}
                    style={{width:'100%',padding:'18px 20px',display:'flex',alignItems:'center',gap:'14px',background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'9px',flexShrink:0,background:isOpen?'#1E3A5F':'#EBF2FA',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}>
                      <i className="ti ti-help-circle" style={{fontSize:'17px',color:isOpen?'#fff':'#1E6AB5'}} />
                    </div>
                    <span style={{flex:1,fontSize:'14px',fontWeight:isOpen?'700':'600',color:isOpen?'#1E3A5F':'#1E293B',lineHeight:1.4}}>{item.q}</span>
                    <i className={`ti ${isOpen?'ti-chevron-up':'ti-chevron-down'}`} style={{fontSize:'16px',color:'#94A3B8',flexShrink:0,transition:'transform .2s'}} />
                  </button>
                  {isOpen && (
                    <div style={{padding:'0 20px 20px 66px',animation:'fadeIn .2s ease'}}>
                      <div style={{fontSize:'14px',color:'#475569',lineHeight:1.75,padding:'14px 16px',background:'#F8FAFC',borderRadius:'10px',border:'1px solid #E2E8F0'}}>
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div style={{marginTop:'40px',background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',borderRadius:'20px',padding:'28px 32px',color:'#fff',textAlign:'center'}}>
          <i className="ti ti-headset" style={{fontSize:'36px',marginBottom:'12px',display:'block',color:'rgba(255,255,255,.8)'}} />
          <h3 style={{fontSize:'16px',fontWeight:'800',fontFamily:'Plus Jakarta Sans',margin:'0 0 8px'}}>Masih ada pertanyaan?</h3>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,.75)',margin:'0 0 20px'}}>Hubungi Panitia Seleksi melalui email atau telepon pada hari dan jam kerja.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="mailto:pansel@batukota.go.id" style={{padding:'9px 20px',borderRadius:'11px',fontSize:'13px',fontWeight:'700',background:'rgba(255,255,255,.2)',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,.3)',display:'flex',alignItems:'center',gap:'6px'}}>
              <i className="ti ti-mail" /> pansel@batukota.go.id
            </a>
            <a href="tel:+62341512223" style={{padding:'9px 20px',borderRadius:'11px',fontSize:'13px',fontWeight:'700',background:'rgba(255,255,255,.2)',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,.3)',display:'flex',alignItems:'center',gap:'6px'}}>
              <i className="ti ti-phone" /> (0341) 512223
            </a>
          </div>
        </div>
      </div>

      <footer style={{background:'#1E293B',padding:'24px 32px',textAlign:'center',marginTop:'20px'}}>
        <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>© 2025 Pemerintah Kota Batu · SIMBUBALADA v2.0</div>
      </footer>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
