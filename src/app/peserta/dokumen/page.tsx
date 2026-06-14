'use client'
import { useState, useRef } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const PESERTA_NAV = [
  { href: '/peserta/dashboard',  icon: 'ti-layout-dashboard', label: 'Beranda',        section: 'MENU UTAMA' },
  { href: '/peserta/daftar',     icon: 'ti-user-plus',        label: 'Daftar Seleksi', section: 'MENU UTAMA' },
  { href: '/peserta/dokumen',    icon: 'ti-upload',           label: 'Upload Dokumen', section: 'MENU UTAMA' },
  { href: '/peserta/tracking',   icon: 'ti-timeline',         label: 'Status Seleksi', section: 'MENU UTAMA' },
  { href: '/peserta/pengumuman', icon: 'ti-bell',             label: 'Pengumuman',     section: 'MENU UTAMA', badge: 2 },
  { href: '/peserta/unduh',      icon: 'ti-download',         label: 'Unduh Dokumen',  section: 'MENU UTAMA' },
  { href: '/peserta/profil',     icon: 'ti-user-circle',      label: 'Profil Saya',    section: 'AKUN' },
]

type DocFile = {
  key:      string
  label:    string
  required: boolean
  accept:   string
  desc:     string
  maxMB:    number
  file:     File | null
  status:   'empty' | 'uploaded' | 'verified' | 'rejected'
  note?:    string
}

const INITIAL_DOCS: DocFile[] = [
  { key: 'ktp',         label: 'KTP',                  required: true,  accept: '.pdf,.jpg,.png', desc: 'Kartu Tanda Penduduk yang masih berlaku', maxMB: 2,  file: null, status: 'empty' },
  { key: 'cv',          label: 'Curriculum Vitae',      required: true,  accept: '.pdf,.doc,.docx', desc: 'CV lengkap dengan riwayat pengalaman', maxMB: 5,  file: null, status: 'empty' },
  { key: 'ijazah',      label: 'Ijazah Terakhir',       required: true,  accept: '.pdf,.jpg,.png', desc: 'Ijazah pendidikan terakhir (min. S1)', maxMB: 5,  file: null, status: 'empty' },
  { key: 'foto',        label: 'Pas Foto 4×6',          required: true,  accept: '.jpg,.png',      desc: 'Foto formal terbaru, latar merah/biru', maxMB: 2,  file: null, status: 'empty' },
  { key: 'npwp',        label: 'NPWP',                  required: true,  accept: '.pdf,.jpg,.png', desc: 'Nomor Pokok Wajib Pajak', maxMB: 2,  file: null, status: 'empty' },
  { key: 'lamaran',     label: 'Surat Lamaran',         required: true,  accept: '.pdf,.doc,.docx', desc: 'Surat lamaran yang ditandatangani', maxMB: 3,  file: null, status: 'empty' },
  { key: 'skck',        label: 'SKCK',                  required: true,  accept: '.pdf,.jpg,.png', desc: 'Surat Keterangan Catatan Kepolisian', maxMB: 3,  file: null, status: 'empty' },
  { key: 'kesehatan',   label: 'Surat Kesehatan',       required: true,  accept: '.pdf,.jpg,.png', desc: 'Surat keterangan sehat dari dokter/RS', maxMB: 3,  file: null, status: 'empty' },
]

function UploadZone({ doc, onUpload, onRemove }: {
  doc: DocFile;
  onUpload: (key: string, file: File) => void;
  onRemove: (key: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) onUpload(doc.key, f)
  }

  const statusConfig = {
    empty:    { border: '#E2E8F0', bg: '#F8FAFC', icon: 'ti-cloud-upload', color: '#94A3B8' },
    uploaded: { border: '#A7F3D0', bg: '#ECFDF5', icon: 'ti-check-circle',  color: '#059669' },
    verified: { border: '#BFDBFE', bg: '#EFF6FF', icon: 'ti-shield-check',  color: '#2563EB' },
    rejected: { border: '#FECACA', bg: '#FEF2F2', icon: 'ti-x-circle',      color: '#DC2626' },
  }

  const cfg = statusConfig[doc.status]

  return (
    <div style={{
      borderRadius: '14px', border: `2px dashed ${dragging ? '#1E6AB5' : cfg.border}`,
      background: dragging ? '#EBF2FA' : cfg.bg,
      padding: '16px', transition: 'all .15s',
    }}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Doc icon */}
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
          background: doc.status === 'empty' ? '#F1F5F9' : cfg.bg.replace('FC', 'E5'),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${cfg.border}`,
        }}>
          <i className={`ti ${cfg.icon}`} style={{ fontSize: '20px', color: cfg.color }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>{doc.label}</span>
            {doc.required && (
              <span style={{ fontSize: '9px', fontWeight: '700', color: '#EF4444', padding: '1px 5px', background: '#FEF2F2', borderRadius: '4px' }}>WAJIB</span>
            )}
            {doc.status === 'uploaded'  && <span style={{ fontSize: '10px', color: '#059669', fontWeight: '600' }}>✓ Diunggah</span>}
            {doc.status === 'verified'  && <span style={{ fontSize: '10px', color: '#2563EB', fontWeight: '600' }}>✓ Terverifikasi</span>}
            {doc.status === 'rejected'  && <span style={{ fontSize: '10px', color: '#DC2626', fontWeight: '600' }}>✗ Ditolak</span>}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{doc.desc}</div>
          <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '1px' }}>
            Format: {doc.accept.replace(/\./g, '').toUpperCase()} · Maks. {doc.maxMB} MB
          </div>
          {doc.note && doc.status === 'rejected' && (
            <div style={{ marginTop: '6px', fontSize: '11px', color: '#DC2626', padding: '6px 10px', background: '#FEF2F2', borderRadius: '6px', border: '1px solid #FECACA' }}>
              <i className="ti ti-alert-triangle" style={{ fontSize: '12px' }} /> {doc.note}
            </div>
          )}
          {doc.file && (
            <div style={{ marginTop: '6px', fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <i className="ti ti-paperclip" style={{ fontSize: '12px' }} />
              {doc.file.name}
              <span style={{ color: '#94A3B8' }}>({(doc.file.size / 1024 / 1024).toFixed(1)} MB)</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {doc.status !== 'verified' && (
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '600',
                background: '#1E3A5F', color: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <i className="ti ti-upload" style={{ fontSize: '12px' }} />
              {doc.file ? 'Ganti' : 'Upload'}
            </button>
          )}
          {doc.file && doc.status !== 'verified' && (
            <button
              onClick={() => onRemove(doc.key)}
              style={{
                padding: '6px 10px', borderRadius: '8px', fontSize: '11px',
                background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer',
              }}
            >
              <i className="ti ti-trash" style={{ fontSize: '12px' }} />
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef} type="file" accept={doc.accept} style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(doc.key, f) }}
      />
    </div>
  )
}

export default function UploadDokumenPage() {
  const [docs, setDocs] = useState<DocFile[]>(INITIAL_DOCS)
  const [hasSertifikat, setHasSertifikat] = useState<boolean | null>(null)
  const [sertifFiles, setSertifFiles] = useState<File[]>([])
  const sertifRef = useRef<HTMLInputElement>(null)

  const handleUpload = (key: string, file: File) => {
    setDocs(prev => prev.map(d => d.key === key ? { ...d, file, status: 'uploaded' } : d))
  }
  const handleRemove = (key: string) => {
    setDocs(prev => prev.map(d => d.key === key ? { ...d, file: null, status: 'empty' } : d))
  }

  const uploaded  = docs.filter(d => d.required && d.file).length
  const total     = docs.filter(d => d.required).length
  const pct       = Math.round(uploaded / total * 100)
  const allFilled = uploaded === total && hasSertifikat !== null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      <AppSidebar
        theme="bumd" role="peserta"
        userName="Budi Santoso, S.E., M.M."
        userRole="Peserta Seleksi"
        initials="BS"
        navItems={PESERTA_NAV}
        bottomItems={[{ href: '/logout', icon: 'ti-logout', label: 'Keluar' }]}
      />

      <main style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          theme="bumd" title="Upload Dokumen"
          breadcrumb={[{ label: 'Portal Peserta', href: '/peserta' }, { label: 'Beranda', href: '/peserta/dashboard' }, { label: 'Upload Dokumen' }]}
        />

        <div style={{ padding: '24px', flex: 1 }}>
          {/* Info banner */}
          <div style={{
            background: 'linear-gradient(135deg, #EBF2FA, #EFF6FF)',
            borderRadius: '16px', padding: '16px 20px', marginBottom: '20px',
            border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <i className="ti ti-info-circle" style={{ fontSize: '22px', color: '#2563EB', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E40AF' }}>Petunjuk Upload Dokumen</div>
              <div style={{ fontSize: '12px', color: '#3730A3', marginTop: '2px' }}>
                Pastikan semua dokumen wajib diunggah sebelum batas waktu pendaftaran. Dokumen harus terbaca jelas, format PDF/JPG/PNG, maksimal sesuai batas ukuran.
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px 24px', marginBottom: '20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>Kelengkapan Dokumen</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: pct === 100 ? '#059669' : '#1E6AB5', fontFamily: 'Plus Jakarta Sans' }}>{pct}%</span>
            </div>
            <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, borderRadius: '6px',
                background: pct === 100 ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #1E6AB5, #4E8EC7)',
                transition: 'width .6s cubic-bezier(.22,1,.36,1)',
              }} />
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
              {uploaded} dari {total} dokumen wajib telah diunggah
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Documents list */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans', marginBottom: '12px' }}>
                Dokumen Wajib
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {docs.map(doc => (
                  <UploadZone key={doc.key} doc={doc} onUpload={handleUpload} onRemove={handleRemove} />
                ))}
              </div>

              {/* Sertifikat Kompetensi – conditional */}
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans', marginBottom: '12px' }}>
                Dokumen Tambahan
              </h3>
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '20px',
                border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,.04)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>
                  Sertifikat Kompetensi / Profesi
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '14px' }}>
                  Sertifikat pelatihan, kompetensi, atau profesi yang relevan dengan jabatan yang dilamar
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: hasSertifikat ? '14px' : '0' }}>
                  {[true, false].map(val => (
                    <button
                      key={String(val)}
                      onClick={() => setHasSertifikat(val)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: '10px', cursor: 'pointer',
                        border: `2px solid ${hasSertifikat === val ? (val ? '#A7F3D0' : '#CBD5E1') : '#E2E8F0'}`,
                        background: hasSertifikat === val ? (val ? '#ECFDF5' : '#F8FAFC') : '#fff',
                        color: hasSertifikat === val ? (val ? '#059669' : '#475569') : '#94A3B8',
                        fontWeight: '600', fontSize: '13px', transition: 'all .15s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      }}
                    >
                      <i className={`ti ${val ? 'ti-check' : 'ti-x'}`} style={{ fontSize: '14px' }} />
                      {val ? 'Ada Sertifikat' : 'Tidak Ada'}
                    </button>
                  ))}
                </div>

                {/* Conditional upload zone */}
                {hasSertifikat === true && (
                  <div style={{
                    padding: '16px', borderRadius: '12px', border: '2px dashed #A7F3D0',
                    background: '#ECFDF5', animation: 'fadeIn .3s ease',
                  }}>
                    <div style={{ textAlign: 'center', color: '#059669', marginBottom: '10px' }}>
                      <i className="ti ti-cloud-upload" style={{ fontSize: '28px' }} />
                      <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>Upload Sertifikat (Maks. 5 file, 3 MB/file)</div>
                      <div style={{ fontSize: '11px', color: '#6EE7B7' }}>PDF, JPG, atau PNG</div>
                    </div>
                    <button
                      onClick={() => sertifRef.current?.click()}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto',
                        padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                        background: '#059669', color: '#fff', border: 'none', cursor: 'pointer',
                      }}
                    >
                      <i className="ti ti-upload" style={{ fontSize: '13px' }} /> Pilih File
                    </button>
                    {sertifFiles.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        {sertifFiles.map((f, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '6px 10px', background: '#fff', borderRadius: '6px',
                            marginTop: '4px', fontSize: '11px', color: '#065F46',
                          }}>
                            <i className="ti ti-file" style={{ fontSize: '12px' }} />
                            {f.name}
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      ref={sertifRef} type="file" multiple accept=".pdf,.jpg,.png" style={{ display: 'none' }}
                      onChange={e => setSertifFiles(Array.from(e.target.files ?? []))}
                    />
                  </div>
                )}

                {hasSertifikat === false && (
                  <div style={{
                    padding: '12px', borderRadius: '10px', background: '#F8FAFC',
                    border: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    animation: 'fadeIn .3s ease',
                  }}>
                    <i className="ti ti-info-circle" style={{ fontSize: '14px', color: '#94A3B8' }} />
                    Sertifikat tidak diwajibkan. Anda dapat melanjutkan tanpa mengunggah sertifikat.
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  disabled={!allFilled}
                  style={{
                    flex: 1, padding: '13px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700',
                    background: allFilled ? 'linear-gradient(135deg, #1E3A5F, #1E6AB5)' : '#E2E8F0',
                    color: allFilled ? '#fff' : '#94A3B8',
                    border: 'none', cursor: allFilled ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all .15s',
                    boxShadow: allFilled ? '0 4px 16px rgba(30,106,181,.3)' : 'none',
                  }}
                >
                  <i className="ti ti-send" style={{ fontSize: '16px' }} />
                  Kirim Berkas Pendaftaran
                </button>
                <button style={{
                  padding: '13px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '600',
                  background: '#fff', color: '#475569', border: '1px solid #E2E8F0', cursor: 'pointer',
                }}>
                  <i className="ti ti-device-floppy" style={{ fontSize: '15px' }} /> Simpan Draft
                </button>
              </div>
            </div>

            {/* Right sidebar – tips */}
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
                borderRadius: '16px', padding: '20px', color: '#fff', marginBottom: '16px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', fontFamily: 'Plus Jakarta Sans' }}>
                  <i className="ti ti-calendar-check" style={{ fontSize: '16px', marginRight: '6px' }} />
                  Batas Waktu
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Plus Jakarta Sans', marginBottom: '4px' }}>15</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.75)' }}>Juli 2025 · Pukul 23.59 WIB</div>
                <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(255,255,255,.12)', borderRadius: '8px', fontSize: '11px' }}>
                  <i className="ti ti-clock" style={{ fontSize: '12px' }} /> Tersisa 12 hari lagi
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', marginBottom: '12px', fontFamily: 'Plus Jakarta Sans' }}>
                  Ketentuan Dokumen
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { icon: 'ti-file-check', text: 'Dokumen harus asli atau legalisir terbaru (maks. 3 bulan)' },
                    { icon: 'ti-zoom-in',    text: 'Pastikan dokumen terbaca jelas, tidak blur atau terpotong' },
                    { icon: 'ti-file-type-pdf', text: 'Lebih disarankan menggunakan format PDF' },
                    { icon: 'ti-shield-check', text: 'SKCK & Surat Kesehatan diterbitkan paling lama 6 bulan terakhir' },
                    { icon: 'ti-photo', text: 'Pas foto formal, berbaju resmi, latar polos' },
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <i className={`ti ${tip.icon}`} style={{ fontSize: '14px', color: '#4E8EC7', flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}
