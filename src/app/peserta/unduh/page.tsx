'use client'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const NAV = [
  { href:'/peserta/dashboard',  icon:'ti-layout-dashboard', label:'Beranda',        section:'MENU UTAMA' },
  { href:'/peserta/daftar',     icon:'ti-user-plus',        label:'Daftar Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/dokumen',    icon:'ti-upload',           label:'Upload Dokumen', section:'MENU UTAMA' },
  { href:'/peserta/tracking',   icon:'ti-timeline',         label:'Status Seleksi', section:'MENU UTAMA' },
  { href:'/peserta/pengumuman', icon:'ti-bell',             label:'Pengumuman',     section:'MENU UTAMA', badge:2 },
  { href:'/peserta/unduh',      icon:'ti-download',         label:'Unduh Dokumen',  section:'MENU UTAMA' },
]

const DOKUMEN = [
  { nama:'Kartu Peserta Seleksi',          tgl:'12 Jun 2025', ukuran:'124 KB', format:'PDF', tersedia:true,  ikon:'ti-id-badge',       warna:'#1E3A5F' },
  { nama:'Bukti Pendaftaran',              tgl:'12 Jun 2025', ukuran:'89 KB',  format:'PDF', tersedia:true,  ikon:'ti-file-check',     warna:'#059669' },
  { nama:'Pengumuman Hasil Administrasi',  tgl:'–',           ukuran:'–',      format:'PDF', tersedia:false, ikon:'ti-speakerphone',   warna:'#94A3B8' },
  { nama:'Undangan UKK',                   tgl:'–',           ukuran:'–',      format:'PDF', tersedia:false, ikon:'ti-calendar-event', warna:'#94A3B8' },
  { nama:'Undangan Wawancara KPM',         tgl:'–',           ukuran:'–',      format:'PDF', tersedia:false, ikon:'ti-microphone',     warna:'#94A3B8' },
  { nama:'Berita Acara Penetapan',         tgl:'–',           ukuran:'–',      format:'PDF', tersedia:false, ikon:'ti-writing',        warna:'#94A3B8' },
]

export default function UnduhPage() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F8FAFC'}}>
      <AppSidebar theme="bumd" role="peserta" userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi" initials="BS" navItems={NAV}
        bottomItems={[{href:'/logout',icon:'ti-logout',label:'Keluar'}]} />
      <main style={{marginLeft:'240px',flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar theme="bumd" title="Unduh Dokumen"
          breadcrumb={[{label:'Portal Peserta',href:'/peserta/dashboard'},{label:'Unduh Dokumen'}]} />
        <div style={{padding:'24px'}}>
          <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E2E8F0',overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.04)'}}>
            <div style={{padding:'16px 24px',borderBottom:'1px solid #F1F5F9',background:'#F8FAFC',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#1E293B',fontFamily:'Plus Jakarta Sans'}}>Dokumen Seleksi Anda</span>
              <span style={{fontSize:'12px',color:'#94A3B8'}}>{DOKUMEN.filter(d=>d.tersedia).length} dari {DOKUMEN.length} tersedia</span>
            </div>
            <div>
              {DOKUMEN.map((d,i)=>(
                <div key={i} style={{
                  padding:'16px 24px',
                  borderBottom:i<DOKUMEN.length-1?'1px solid #F8FAFC':'none',
                  display:'flex',alignItems:'center',gap:'16px',
                  opacity:d.tersedia?1:.5,
                }}>
                  <div style={{width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,background:d.tersedia?`${d.warna}15`:'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <i className={`ti ${d.ikon}`} style={{fontSize:'22px',color:d.tersedia?d.warna:'#CBD5E1'}} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'13px',fontWeight:'600',color:d.tersedia?'#1E293B':'#94A3B8'}}>{d.nama}</div>
                    <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px',display:'flex',gap:'12px'}}>
                      {d.tersedia?(<>
                        <span><i className="ti ti-calendar" style={{marginRight:'3px'}} />{d.tgl}</span>
                        <span><i className="ti ti-file" style={{marginRight:'3px'}} />{d.format} · {d.ukuran}</span>
                      </>):<span>Belum tersedia – menunggu tahapan terkait</span>}
                    </div>
                  </div>
                  {d.tersedia?(
                    <button style={{
                      padding:'8px 16px',borderRadius:'10px',fontSize:'12px',fontWeight:'600',
                      background:'linear-gradient(135deg,#1E3A5F,#1E6AB5)',color:'#fff',
                      border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',
                      boxShadow:'0 2px 8px rgba(30,106,181,.25)',
                    }}>
                      <i className="ti ti-download" style={{fontSize:'14px'}} /> Unduh PDF
                    </button>
                  ):(
                    <span style={{fontSize:'11px',fontWeight:'600',padding:'5px 12px',borderRadius:'20px',background:'#F1F5F9',color:'#94A3B8'}}>
                      Belum Tersedia
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
