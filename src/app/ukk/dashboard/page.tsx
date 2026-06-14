'use client'
import { useState, useMemo } from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import TopBar from '@/components/layout/TopBar'

const UKK_NAV = [
  { href: '/ukk/dashboard',  icon: 'ti-layout-dashboard', label: 'Beranda',       section: 'MENU UTAMA' },
  { href: '/ukk/penilaian',  icon: 'ti-pencil',           label: 'Input Nilai',   section: 'MENU UTAMA' },
  { href: '/ukk/ranking',    icon: 'ti-trophy',           label: 'Ranking Final', section: 'MENU UTAMA' },
  { href: '/ukk/rekap',      icon: 'ti-chart-bar',        label: 'Rekap Nilai',   section: 'MENU UTAMA' },
]

/* Bobot komponen */
const KOMPONEN = [
  { key: 'psikotes',    label: 'Psikotes',         bobot: 20, icon: 'ti-brain',       color: '#7C3AED', bg: '#F5F3FF' },
  { key: 'tes_tulis',   label: 'Tes Tulis',        bobot: 20, icon: 'ti-pencil',      color: '#2563EB', bg: '#EFF6FF' },
  { key: 'paparan',     label: 'Paparan Makalah',  bobot: 20, icon: 'ti-presentation',color: '#0891B2', bg: '#ECFEFF' },
  { key: 'wawancara',   label: 'Wawancara KPM',    bobot: 25, icon: 'ti-microphone',  color: '#059669', bg: '#ECFDF5' },
  { key: 'integritas',  label: 'Integritas',       bobot: 15, icon: 'ti-shield-check',color: '#D97706', bg: '#FFFBEB' },
]

type Peserta = {
  id: string; nama: string; posisi: string; instansi: string
  nilai: { psikotes: number|null; tes_tulis: number|null; paparan: number|null; wawancara: number|null; integritas: number|null }
}

const INITIAL_PESERTA: Peserta[] = [
  { id:'P001', nama:'Budi Santoso, S.E., M.M.',  posisi:'Direktur Utama', instansi:'Perumdam Among Tirta', nilai:{psikotes:82, tes_tulis:78, paparan:85, wawancara:88, integritas:90} },
  { id:'P003', nama:'Arif Rahman, M.M.',           posisi:'Direktur Utama', instansi:'Perumdam Among Tirta', nilai:{psikotes:75, tes_tulis:80, paparan:72, wawancara:79, integritas:85} },
  { id:'P006', nama:'Drs. H. Mulyono, M.Si.',      posisi:'Direktur Utama', instansi:'Perumdam Among Tirta', nilai:{psikotes:88, tes_tulis:86, paparan:90, wawancara:92, integritas:88} },
  { id:'P007', nama:'Ir. Sujatmiko, M.T.',         posisi:'Direktur Utama', instansi:'Perumdam Among Tirta', nilai:{psikotes:70, tes_tulis:65, paparan:68, wawancara:72, integritas:80} },
  { id:'P008', nama:'Dr. Retno Wulandari, M.M.',  posisi:'Direktur Utama', instansi:'Perumdam Among Tirta', nilai:{psikotes:91, tes_tulis:89, paparan:87, wawancara:85, integritas:92} },
]

function calcNilaiAkhir(nilai: Peserta['nilai']): number {
  const n = nilai
  if (!n.psikotes || !n.tes_tulis || !n.paparan || !n.wawancara || !n.integritas) return 0
  return (n.psikotes * 0.20) + (n.tes_tulis * 0.20) + (n.paparan * 0.20) + (n.wawancara * 0.25) + (n.integritas * 0.15)
}

function ScoreBadge({ value }: { value: number | null }) {
  if (value == null) return <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: '500' }}>—</span>
  const color = value >= 85 ? '#059669' : value >= 75 ? '#2563EB' : value >= 65 ? '#D97706' : '#DC2626'
  const bg    = value >= 85 ? '#ECFDF5' : value >= 75 ? '#EFF6FF' : value >= 65 ? '#FFFBEB' : '#FEF2F2'
  return (
    <span style={{
      display: 'inline-block', minWidth: '44px', textAlign: 'center',
      padding: '3px 8px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
      background: bg, color,
    }}>{value.toFixed(1)}</span>
  )
}

function RankBadge({ rank }: { rank: number }) {
  const styles = [
    { bg: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#fff', shadow: '0 2px 8px rgba(245,158,11,.4)' },
    { bg: 'linear-gradient(135deg, #94A3B8, #64748B)', color: '#fff', shadow: '0 2px 8px rgba(148,163,184,.4)' },
    { bg: 'linear-gradient(135deg, #C27A2D, #A0612A)', color: '#fff', shadow: '0 2px 8px rgba(194,122,45,.4)' },
  ]
  const s = styles[rank - 1] ?? { bg: '#F1F5F9', color: '#64748B', shadow: 'none' }
  return (
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: s.bg, color: s.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '14px', fontWeight: '800', fontFamily: 'Plus Jakarta Sans',
      boxShadow: s.shadow, flexShrink: 0,
    }}>
      {rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : rank}
    </div>
  )
}

function NilaiInputModal({ peserta, onClose, onSave }: {
  peserta: Peserta
  onClose: () => void
  onSave: (id: string, nilai: Peserta['nilai']) => void
}) {
  const [nilai, setNilai] = useState({ ...peserta.nilai })
  const nilaiAkhir = calcNilaiAkhir(nilai)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(15,23,42,.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '560px',
        boxShadow: '0 24px 48px rgba(0,0,0,.18)',
        animation: 'slideUp .3s cubic-bezier(.22,1,.36,1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
          padding: '20px 24px', color: '#fff',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'Plus Jakarta Sans', marginBottom: '4px' }}>
            Input Nilai UKK
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)' }}>
            {peserta.nama} · {peserta.posisi} · {peserta.instansi}
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Nilai inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {KOMPONEN.map(k => (
              <div key={k.key} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '12px',
                background: '#F8FAFC', border: '1px solid #E2E8F0',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`ti ${k.icon}`} style={{ fontSize: '16px', color: k.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B' }}>{k.label}</div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Bobot {k.bobot}%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number" min={0} max={100} step={0.5}
                    value={nilai[k.key as keyof typeof nilai] ?? ''}
                    onChange={e => setNilai(prev => ({ ...prev, [k.key]: e.target.value ? Number(e.target.value) : null }))}
                    style={{
                      width: '72px', padding: '7px 10px', borderRadius: '8px', textAlign: 'center',
                      border: '1.5px solid #E2E8F0', fontSize: '14px', fontWeight: '700', color: k.color,
                      background: '#fff', outline: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = k.color }}
                    onBlur={e => { e.target.style.borderColor = '#E2E8F0' }}
                  />
                  <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', width: '40px' }}>
                    {nilai[k.key as keyof typeof nilai] != null
                      ? `× ${k.bobot}% = ${((nilai[k.key as keyof typeof nilai] ?? 0) * k.bobot / 100).toFixed(1)}`
                      : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Nilai Akhir display */}
          <div style={{
            padding: '16px 20px', borderRadius: '14px',
            background: nilaiAkhir >= 75 ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' : 'linear-gradient(135deg, #FFF7ED, #FED7AA)',
            border: `1px solid ${nilaiAkhir >= 75 ? '#A7F3D0' : '#FED7AA'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: nilaiAkhir >= 75 ? '#065F46' : '#92400E' }}>Nilai Akhir Tertimbang</div>
              <div style={{ fontSize: '10px', color: nilaiAkhir >= 75 ? '#6EE7B7' : '#FCD34D', marginTop: '2px' }}>
                Psi×20% + TT×20% + Pap×20% + Waw×25% + Int×15%
              </div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'Plus Jakarta Sans', color: nilaiAkhir >= 75 ? '#059669' : '#D97706' }}>
              {nilaiAkhir > 0 ? nilaiAkhir.toFixed(2) : '—'}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              onClick={() => onSave(peserta.id, nilai)}
              style={{
                flex: 1, padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '700',
                background: 'linear-gradient(135deg, #1E3A5F, #1E6AB5)', color: '#fff',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                boxShadow: '0 4px 12px rgba(30,106,181,.3)',
              }}
            >
              <i className="ti ti-device-floppy" style={{ fontSize: '15px' }} /> Simpan Nilai
            </button>
            <button onClick={onClose} style={{
              padding: '12px 18px', borderRadius: '10px', fontSize: '13px',
              background: '#fff', color: '#64748B', border: '1px solid #E2E8F0', cursor: 'pointer',
            }}>
              Batal
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  )
}

export default function UKKDashboard() {
  const [pesertaList, setPesertaList] = useState<Peserta[]>(INITIAL_PESERTA)
  const [editTarget, setEditTarget]   = useState<Peserta | null>(null)
  const [activeTab, setActiveTab]     = useState<'input' | 'ranking'>('ranking')

  const ranking = useMemo(() => {
    return [...pesertaList]
      .map(p => ({ ...p, nilaiAkhir: calcNilaiAkhir(p.nilai) }))
      .sort((a, b) => b.nilaiAkhir - a.nilaiAkhir)
      .map((p, i) => ({ ...p, rank: i + 1 }))
  }, [pesertaList])

  const handleSave = (id: string, nilai: Peserta['nilai']) => {
    setPesertaList(prev => prev.map(p => p.id === id ? { ...p, nilai } : p))
    setEditTarget(null)
  }

  const totalInput = pesertaList.filter(p => calcNilaiAkhir(p.nilai) > 0).length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      <AppSidebar
        theme="bumd" role="penilai"
        userName="Tim UKK Seleksi 2025"
        userRole="Penilai UKK"
        initials="UKK"
        navItems={UKK_NAV}
        bottomItems={[{ href: '/logout', icon: 'ti-logout', label: 'Keluar' }]}
      />

      <main style={{ marginLeft: '240px', flex: 1 }}>
        <TopBar
          theme="bumd" title="Dashboard UKK & Ranking"
          breadcrumb={[{ label: 'UKK', href: '/ukk' }, { label: 'Dashboard' }]}
        />

        <div style={{ padding: '24px' }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '20px' }}>
            {KOMPONEN.map(k => (
              <div key={k.key} style={{
                background: '#fff', borderRadius: '16px', padding: '16px 18px',
                border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`ti ${k.icon}`} style={{ fontSize: '15px', color: k.color }} />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>{k.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: k.color, fontFamily: 'Plus Jakarta Sans', margin: '3px 0' }}>
                  {k.bobot}<span style={{ fontSize: '12px', color: '#CBD5E1' }}>%</span>
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Bobot penilaian</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {[
              { key: 'ranking', label: 'Ranking Final', icon: 'ti-trophy' },
              { key: 'input',   label: 'Input & Edit Nilai', icon: 'ti-pencil' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  padding: '9px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                  background: activeTab === tab.key ? '#1E3A5F' : '#fff',
                  color:      activeTab === tab.key ? '#fff' : '#64748B',
                  border: `1px solid ${activeTab === tab.key ? '#1E3A5F' : '#E2E8F0'}`,
                  cursor: 'pointer', transition: 'all .15s',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <i className={`ti ${tab.icon}`} style={{ fontSize: '14px' }} />
                {tab.label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
              <i className="ti ti-info-circle" style={{ fontSize: '14px' }} />
              {totalInput} / {pesertaList.length} nilai telah diinput
            </div>
          </div>

          {/* Ranking Tab */}
          {activeTab === 'ranking' && (
            <div>
              {/* Top 3 podium */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {ranking.slice(0, 3).map(p => (
                  <div key={p.id} style={{
                    background: p.rank === 1
                      ? 'linear-gradient(135deg, #1E3A5F, #1E6AB5)'
                      : p.rank === 2
                      ? 'linear-gradient(135deg, #475569, #64748B)'
                      : 'linear-gradient(135deg, #92400E, #B45309)',
                    borderRadius: '20px', padding: '20px',
                    color: '#fff', position: 'relative', overflow: 'hidden',
                    boxShadow: p.rank === 1 ? '0 8px 32px rgba(30,106,181,.3)' : '0 4px 16px rgba(0,0,0,.15)',
                    order: p.rank === 1 ? -1 : p.rank,
                  }}>
                    <div style={{ position: 'absolute', top: -15, right: -15, width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
                        {['🥇','🥈','🥉'][p.rank - 1]}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.6)', fontWeight: '600', letterSpacing: '0.06em' }}>
                        PERINGKAT {p.rank}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'Plus Jakarta Sans', marginBottom: '3px' }}>{p.nama}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.65)' }}>{p.posisi}</div>
                      <div style={{
                        marginTop: '12px', fontSize: '2rem', fontWeight: '900',
                        fontFamily: 'Plus Jakarta Sans',
                      }}>
                        {p.nilaiAkhir.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)', marginTop: '2px' }}>Nilai Akhir</div>
                    </div>
                    {/* Breakdown mini */}
                    <div style={{ marginTop: '14px', display: 'flex', gap: '4px' }}>
                      {KOMPONEN.map(k => {
                        const v = p.nilai[k.key as keyof typeof p.nilai]
                        return (
                          <div key={k.key} style={{
                            flex: 1, textAlign: 'center', padding: '5px 2px',
                            background: 'rgba(255,255,255,.1)', borderRadius: '6px',
                          }}>
                            <div style={{ fontSize: '11px', fontWeight: '700' }}>{v ?? '—'}</div>
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.55)', marginTop: '1px' }}>
                              {k.label.split(' ')[0]}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Full ranking table */}
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>Tabel Ranking Seleksi</span>
                  <button style={{
                    padding: '7px 14px', borderRadius: '9px', fontSize: '12px', fontWeight: '600',
                    background: '#1E3A5F', color: '#fff', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}>
                    <i className="ti ti-download" style={{ fontSize: '13px' }} /> Ekspor PDF
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC' }}>
                        {['#', 'Peserta', 'Psikotes\n(20%)', 'Tes Tulis\n(20%)', 'Paparan\n(20%)', 'Wawancara\n(25%)', 'Integritas\n(15%)', 'Nilai Akhir', 'Rekomendasi'].map((h, i) => (
                          <th key={i} style={{
                            padding: '10px 16px', textAlign: i > 1 ? 'center' : 'left',
                            fontSize: '10px', fontWeight: '700', color: '#94A3B8',
                            letterSpacing: '0.04em', textTransform: 'uppercase',
                            borderBottom: '1px solid #E2E8F0', whiteSpace: 'pre',
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ranking.map((p, i) => (
                        <tr key={p.id} style={{
                          borderBottom: i < ranking.length - 1 ? '1px solid #F1F5F9' : 'none',
                          background: p.rank <= 3 ? '#FFFAF0' : 'transparent',
                        }}>
                          <td style={{ padding: '14px 16px' }}>
                            <RankBadge rank={p.rank} />
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>{p.nama}</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>{p.posisi} · {p.instansi}</div>
                          </td>
                          {(['psikotes','tes_tulis','paparan','wawancara','integritas'] as const).map(k => (
                            <td key={k} style={{ padding: '14px 16px', textAlign: 'center' }}>
                              <ScoreBadge value={p.nilai[k]} />
                            </td>
                          ))}
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span style={{
                              fontSize: '16px', fontWeight: '900', fontFamily: 'Plus Jakarta Sans',
                              color: p.nilaiAkhir >= 80 ? '#059669' : p.nilaiAkhir >= 70 ? '#2563EB' : '#D97706',
                            }}>
                              {p.nilaiAkhir.toFixed(2)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span style={{
                              fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px',
                              background: p.rank <= 3 ? '#ECFDF5' : '#F1F5F9',
                              color: p.rank <= 3 ? '#059669' : '#94A3B8',
                            }}>
                              {p.rank <= 3 ? `Direkomendasikan` : 'Cadangan'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Input Tab */}
          {activeTab === 'input' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pesertaList.map(p => {
                const na = calcNilaiAkhir(p.nilai)
                const hasAll = na > 0
                return (
                  <div key={p.id} style={{
                    background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0',
                    padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0,
                      background: hasAll ? 'linear-gradient(135deg, #059669, #10B981)' : 'linear-gradient(135deg, #475569, #64748B)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: '14px', fontWeight: '700',
                    }}>
                      {hasAll
                        ? <i className="ti ti-check" style={{ fontSize: '18px' }} />
                        : p.nama.split(' ').slice(0,2).map((n: string) => n[0]).join('')
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', fontFamily: 'Plus Jakarta Sans' }}>{p.nama}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{p.posisi} · {p.instansi}</div>
                    </div>
                    {/* Mini nilai pills */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {KOMPONEN.map(k => (
                        <div key={k.key} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '9px', color: '#94A3B8', marginBottom: '3px' }}>{k.label.split(' ')[0]}</div>
                          <ScoreBadge value={p.nilai[k.key as keyof typeof p.nilai]} />
                        </div>
                      ))}
                    </div>
                    {hasAll && (
                      <div style={{ textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontSize: '9px', color: '#94A3B8', marginBottom: '2px' }}>Nilai Akhir</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1E6AB5', fontFamily: 'Plus Jakarta Sans' }}>
                          {na.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => setEditTarget(p)}
                      style={{
                        padding: '9px 18px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                        background: hasAll ? '#EBF2FA' : 'linear-gradient(135deg, #1E3A5F, #1E6AB5)',
                        color: hasAll ? '#1E6AB5' : '#fff',
                        border: hasAll ? '1px solid #C8DDEF' : 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '5px',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`ti ${hasAll ? 'ti-edit' : 'ti-pencil'}`} style={{ fontSize: '13px' }} />
                      {hasAll ? 'Edit Nilai' : 'Input Nilai'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {editTarget && (
        <NilaiInputModal
          peserta={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
