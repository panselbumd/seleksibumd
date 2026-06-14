# SIMBUBALADA v2.0
**Sistem Informasi Manajemen Seleksi BUMD dan BLUD Kota Batu**

Platform seleksi digital terintegrasi untuk Direksi, Komisaris, dan Dewan Pengawas BUMD/BLUD Pemerintah Kota Batu.

---

## 🚀 Teknologi

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript |
| Styling | Tailwind CSS, Custom Design System |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Deployment | Vercel |
| Icons | Tabler Icons |

---

## 📋 Modul Sistem

| Portal | Role | Fitur Utama |
|--------|------|-------------|
| **Portal Publik** | Umum | Beranda, Profil BUMD/BLUD, Pengumuman, Jadwal, FAQ |
| **Portal Peserta** | Peserta | Daftar Seleksi, Upload Dokumen, Tracking Status, Unduh |
| **Portal Panitia** | Ketua/Sekretaris/Admin | Verifikasi, Manajemen Peserta, Jadwal, Generate Dokumen |
| **Portal UKK** | Tim Penilai | Input Nilai, Rekap, Ranking Otomatis |
| **Portal KPM** | KPM/RUPS | Dashboard Eksekutif, Penetapan, BA, SK |

---

## 🏗️ Struktur Proyek

```
src/
├── app/
│   ├── page.tsx              # Landing page portal publik
│   ├── login/                # Halaman login multi-role
│   ├── register/             # Registrasi peserta + OTP
│   ├── portal/               # Portal publik
│   │   ├── profil-bumd/
│   │   ├── profil-blud/
│   │   ├── pengumuman/
│   │   ├── jadwal/
│   │   ├── faq/
│   │   └── kontak/
│   ├── peserta/              # Portal peserta
│   │   ├── dashboard/
│   │   ├── daftar/
│   │   ├── dokumen/
│   │   ├── tracking/
│   │   ├── pengumuman/
│   │   ├── unduh/
│   │   ├── profil/
│   │   └── ubah-sandi/
│   ├── panitia/              # Portal panitia seleksi
│   │   ├── dashboard/
│   │   ├── verifikasi/
│   │   ├── peserta/
│   │   ├── jadwal/
│   │   ├── pengumuman/
│   │   ├── dokumen/
│   │   ├── laporan/
│   │   ├── berita-acara/
│   │   └── pengaturan/
│   ├── ukk/                  # Portal tim penilai UKK
│   │   ├── dashboard/
│   │   ├── penilaian/
│   │   ├── ranking/
│   │   └── rekap/
│   └── kpm/                  # Portal KPM/RUPS
│       ├── dashboard/
│       ├── penetapan/
│       ├── laporan/
│       ├── berita-acara/
│       └── sk/
├── components/
│   └── layout/
│       ├── AppSidebar.tsx    # Sidebar navigasi dinamis
│       └── TopBar.tsx        # Header dengan breadcrumb
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Supabase browser client
│   │   ├── server.ts         # Supabase server client
│   │   ├── middleware.ts     # Auth middleware
│   │   └── database.sql      # Schema lengkap PostgreSQL
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   └── utils/
│       ├── cn.ts             # Class merger utility
│       └── format.ts         # Format helpers + status config
├── styles/
│   └── globals.css           # Design system + CSS variables
└── middleware.ts             # Next.js middleware (auth guard)
```

---

## ⚙️ Instalasi & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/pemkot-batu/simbubalada.git
cd simbubalada
npm install
```

### 2. Konfigurasi Environment
```bash
cp .env.local.example .env.local
# Edit .env.local dan isi dengan credentials Supabase Anda
```

### 3. Setup Database Supabase
1. Buat project baru di [Supabase Dashboard](https://supabase.com)
2. Buka **SQL Editor**
3. Copy-paste isi file `src/lib/supabase/database.sql`
4. Jalankan query

### 4. Konfigurasi Supabase Auth
- Aktifkan **Email Auth** di Authentication > Providers
- Set **Site URL** ke domain Anda
- Konfigurasi SMTP untuk email OTP

### 5. Jalankan Development Server
```bash
npm run dev
# Akses: http://localhost:3000
```

---

## 🌐 Deployment ke Vercel

```bash
npm i -g vercel
vercel --prod
```

Atau connect repository GitHub ke Vercel Dashboard dan set environment variables.

---

## 🔐 Role & Akses

| Role | Email Login | Akses Portal |
|------|-------------|--------------|
| Peserta | akun peserta | /peserta/* |
| Ketua Pansel | ketua@batukota.go.id | /panitia/* |
| Sekretaris | sekretaris@batukota.go.id | /panitia/* |
| Admin | admin@batukota.go.id | /panitia/* |
| Penilai Psikotes | psikotes@batukota.go.id | /ukk/penilaian |
| Penilai Tes Tulis | tulis@batukota.go.id | /ukk/penilaian |
| Penilai Paparan | paparan@batukota.go.id | /ukk/penilaian |
| Penilai Wawancara | wawancara@batukota.go.id | /ukk/penilaian |
| Penilai Integritas | integritas@batukota.go.id | /ukk/penilaian |
| KPM/RUPS | kpm@batukota.go.id | /kpm/* |

---

## 📄 Dokumen yang Dapat Digenerate

- Pengumuman Seleksi (PDF/DOCX)
- Pengumuman Hasil Administrasi (PDF/DOCX)
- Undangan UKK (PDF/DOCX)
- Undangan Wawancara (PDF/DOCX)
- Berita Acara Administrasi (PDF/DOCX)
- Berita Acara UKK (PDF/DOCX)
- Berita Acara Wawancara (PDF/DOCX)
- Berita Acara Penetapan (PDF/DOCX)
- SK Penetapan (PDF/DOCX)

> Semua dokumen memiliki area kosong ±5 cm untuk kop surat eksternal Panitia Seleksi.

---

## 👨‍💻 Tim Pengembang

Dikembangkan untuk **Pemerintah Kota Batu**  
Dinas Terkait: Bagian Organisasi dan BUMD  
Tahun: 2025

---

*SIMBUBALADA v2.0 – Transparan · Profesional · Akuntabel*
