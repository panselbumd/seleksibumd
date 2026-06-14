export const formatTanggal = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(n)

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024**2) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/1024**2).toFixed(1) + ' MB'
}

export const getInitials = (nama: string) =>
  nama.replace(/[.,]/g,'').split(' ')
    .filter(w => !['Dr','Ir','Drs','MM','SE','SH','MT','MKes','MBA','MSi'].includes(w))
    .slice(0,2).map(w => w[0]).join('').toUpperCase()

export const STATUS_LABEL: Record<string, string> = {
  draft:'Draft', menunggu_verifikasi:'Menunggu Verifikasi',
  lulus_administrasi:'Lulus Administrasi', tidak_lulus_administrasi:'Tidak Lulus Administrasi',
  ukk:'Tahap UKK', wawancara_kpm:'Wawancara KPM',
  penetapan:'Penetapan', selesai:'Selesai', ditolak:'Ditolak',
}

export const STATUS_COLOR: Record<string,{bg:string;color:string;border:string}> = {
  draft:                   {bg:'#F1F5F9',color:'#475569',border:'#CBD5E1'},
  menunggu_verifikasi:     {bg:'#FFFBEB',color:'#D97706',border:'#FDE68A'},
  lulus_administrasi:      {bg:'#ECFDF5',color:'#059669',border:'#A7F3D0'},
  tidak_lulus_administrasi:{bg:'#FEF2F2',color:'#DC2626',border:'#FECACA'},
  ukk:                     {bg:'#EFF6FF',color:'#2563EB',border:'#BFDBFE'},
  wawancara_kpm:           {bg:'#F5F3FF',color:'#7C3AED',border:'#DDD6FE'},
  penetapan:               {bg:'#FFF7ED',color:'#C2410C',border:'#FED7AA'},
  selesai:                 {bg:'#ECFDF5',color:'#047857',border:'#6EE7B7'},
  ditolak:                 {bg:'#FEF2F2',color:'#DC2626',border:'#FECACA'},
}
