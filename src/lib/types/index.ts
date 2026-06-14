export type UserRole = 'peserta'|'ketua_pansel'|'sekretaris'|'admin'|'penilai_psikotes'|'penilai_tulis'|'penilai_paparan'|'penilai_wawancara'|'penilai_integritas'|'kpm'
export type JenisOrganisasi = 'BUMD'|'BLUD'
export type JenisSeleksi = 'Direksi'|'Komisaris'|'Dewan Pengawas'
export type StatusPendaftaran = 'draft'|'menunggu_verifikasi'|'lulus_administrasi'|'tidak_lulus_administrasi'|'ukk'|'wawancara_kpm'|'penetapan'|'selesai'|'ditolak'
export type StatusDokumen = 'belum_upload'|'uploaded'|'valid'|'tidak_valid'

export interface Profile { id:string; nama:string; email:string; telp?:string; nik?:string; tempat_lahir?:string; tanggal_lahir?:string; alamat?:string; role:UserRole; avatar_url?:string; is_active:boolean; created_at:string }
export interface Instansi { id:string; nama:string; singkatan?:string; jenis:JenisOrganisasi; deskripsi?:string; alamat?:string; logo_url?:string; is_active:boolean }
export interface Lowongan { id:string; instansi_id:string; judul:string; jabatan:string; jenis_seleksi:JenisSeleksi; kuota:number; tgl_buka:string; tgl_tutup:string; is_active:boolean; instansi?:Instansi }
export interface Pendaftaran { id:string; peserta_id:string; lowongan_id:string; nomor_urut:number; status:StatusPendaftaran; catatan_pansel?:string; tgl_daftar:string; peserta?:Profile; lowongan?:Lowongan }
export interface Dokumen { id:string; pendaftaran_id:string; jenis:string; nama_file?:string; file_url?:string; ukuran_bytes?:number; status:StatusDokumen; catatan?:string }
export interface PenilaianUkk { id:string; pendaftaran_id:string; penilai_id:string; komponen:string; nilai:number; catatan?:string }
export interface RekapNilai { id:string; pendaftaran_id:string; nilai_psikotes?:number; nilai_tes_tulis?:number; nilai_paparan?:number; nilai_wawancara?:number; nilai_integritas?:number; nilai_akhir?:number; ranking?:number; lulus_ukk?:boolean }
export interface Pengumuman { id:string; lowongan_id?:string; judul:string; isi?:string; kategori?:string; file_url?:string; is_published:boolean; published_at?:string }
export interface Notification { id:string; user_id:string; judul:string; pesan?:string; tipe:string; is_read:boolean; link?:string; created_at:string }
