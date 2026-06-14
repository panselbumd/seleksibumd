-- ============================================================
-- SIMBUBALADA – Database Schema PostgreSQL (Supabase)
-- Pemerintah Kota Batu · 2025
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── ENUM TYPES ─────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('peserta','ketua_pansel','sekretaris','admin','penilai_psikotes','penilai_tulis','penilai_paparan','penilai_wawancara','penilai_integritas','kpm');
CREATE TYPE jenis_organisasi AS ENUM ('BUMD','BLUD');
CREATE TYPE jenis_seleksi AS ENUM ('Direksi','Komisaris','Dewan Pengawas');
CREATE TYPE status_pendaftaran AS ENUM ('draft','menunggu_verifikasi','lulus_administrasi','tidak_lulus_administrasi','ukk','wawancara_kpm','penetapan','selesai','ditolak');
CREATE TYPE status_dokumen AS ENUM ('belum_upload','uploaded','valid','tidak_valid');
CREATE TYPE status_tahapan AS ENUM ('belum','aktif','selesai');

-- ─── PROFILES ───────────────────────────────────────────────
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  telp          TEXT,
  nik           TEXT UNIQUE,
  tempat_lahir  TEXT,
  tanggal_lahir DATE,
  alamat        TEXT,
  role          user_role NOT NULL DEFAULT 'peserta',
  avatar_url    TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INSTANSI (BUMD/BLUD) ───────────────────────────────────
CREATE TABLE instansi (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama          TEXT NOT NULL,
  singkatan     TEXT,
  jenis         jenis_organisasi NOT NULL,
  deskripsi     TEXT,
  alamat        TEXT,
  logo_url      TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── LOWONGAN SELEKSI ───────────────────────────────────────
CREATE TABLE lowongan (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instansi_id     UUID NOT NULL REFERENCES instansi(id),
  judul           TEXT NOT NULL,
  jabatan         TEXT NOT NULL,
  jenis_seleksi   jenis_seleksi NOT NULL,
  deskripsi       TEXT,
  syarat          JSONB DEFAULT '[]',
  kuota           INT NOT NULL DEFAULT 1,
  tgl_buka        DATE NOT NULL,
  tgl_tutup       DATE NOT NULL,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PENDAFTARAN ────────────────────────────────────────────
CREATE TABLE pendaftaran (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  peserta_id      UUID NOT NULL REFERENCES profiles(id),
  lowongan_id     UUID NOT NULL REFERENCES lowongan(id),
  nomor_urut      SERIAL,
  status          status_pendaftaran NOT NULL DEFAULT 'draft',
  catatan_pansel  TEXT,
  tgl_daftar      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(peserta_id, lowongan_id)
);

-- ─── DOKUMEN PERSYARATAN ─────────────────────────────────────
CREATE TABLE dokumen (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pendaftaran_id  UUID NOT NULL REFERENCES pendaftaran(id) ON DELETE CASCADE,
  jenis           TEXT NOT NULL,  -- 'ktp','cv','ijazah','foto','npwp','lamaran','skck','kesehatan','sertifikat'
  nama_file       TEXT,
  file_url        TEXT,
  ukuran_bytes    BIGINT,
  mime_type       TEXT,
  status          status_dokumen NOT NULL DEFAULT 'belum_upload',
  catatan         TEXT,
  verified_by     UUID REFERENCES profiles(id),
  verified_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TAHAPAN SELEKSI ─────────────────────────────────────────
CREATE TABLE tahapan (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lowongan_id     UUID NOT NULL REFERENCES lowongan(id),
  nama            TEXT NOT NULL,
  urutan          INT NOT NULL,
  tgl_mulai       DATE,
  tgl_selesai     DATE,
  tempat          TEXT,
  keterangan      TEXT,
  status          status_tahapan NOT NULL DEFAULT 'belum',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PENILAIAN UKK ───────────────────────────────────────────
CREATE TABLE penilaian_ukk (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pendaftaran_id  UUID NOT NULL REFERENCES pendaftaran(id),
  penilai_id      UUID NOT NULL REFERENCES profiles(id),
  komponen        TEXT NOT NULL,   -- 'psikotes','tes_tulis','paparan','wawancara','integritas'
  nilai           NUMERIC(5,2) CHECK (nilai BETWEEN 0 AND 100),
  catatan         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(pendaftaran_id, komponen)
);

-- ─── REKAP NILAI ─────────────────────────────────────────────
CREATE TABLE rekap_nilai (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pendaftaran_id      UUID NOT NULL REFERENCES pendaftaran(id) UNIQUE,
  nilai_psikotes      NUMERIC(5,2),
  nilai_tes_tulis     NUMERIC(5,2),
  nilai_paparan       NUMERIC(5,2),
  nilai_wawancara     NUMERIC(5,2),
  nilai_integritas    NUMERIC(5,2),
  nilai_akhir         NUMERIC(5,2) GENERATED ALWAYS AS (
    COALESCE(nilai_psikotes,0)*0.20 +
    COALESCE(nilai_tes_tulis,0)*0.20 +
    COALESCE(nilai_paparan,0)*0.20 +
    COALESCE(nilai_wawancara,0)*0.25 +
    COALESCE(nilai_integritas,0)*0.15
  ) STORED,
  ranking             INT,
  lulus_ukk           BOOLEAN,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PENETAPAN ───────────────────────────────────────────────
CREATE TABLE penetapan (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pendaftaran_id    UUID NOT NULL REFERENCES pendaftaran(id),
  ditetapkan_oleh   UUID REFERENCES profiles(id),
  keputusan         TEXT NOT NULL CHECK (keputusan IN ('ditetapkan','ditolak','ditangguhkan')),
  catatan           TEXT,
  tgl_penetapan     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  nomor_sk          TEXT,
  file_sk_url       TEXT
);

-- ─── PENGUMUMAN ──────────────────────────────────────────────
CREATE TABLE pengumuman (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lowongan_id     UUID REFERENCES lowongan(id),
  judul           TEXT NOT NULL,
  isi             TEXT,
  kategori        TEXT,  -- 'administrasi','ukk','wawancara','penetapan','umum'
  file_url        TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  published_by    UUID REFERENCES profiles(id),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── JADWAL NOTIFIKASI ───────────────────────────────────────
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  judul       TEXT NOT NULL,
  pesan       TEXT,
  tipe        TEXT DEFAULT 'info',
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  link        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── AUDIT LOGS ──────────────────────────────────────────────
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id),
  aksi        TEXT NOT NULL,
  tabel       TEXT,
  record_id   UUID,
  data_lama   JSONB,
  data_baru   JSONB,
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────────
CREATE INDEX idx_pendaftaran_peserta  ON pendaftaran(peserta_id);
CREATE INDEX idx_pendaftaran_lowongan ON pendaftaran(lowongan_id);
CREATE INDEX idx_pendaftaran_status   ON pendaftaran(status);
CREATE INDEX idx_dokumen_pendaftaran  ON dokumen(pendaftaran_id);
CREATE INDEX idx_penilaian_pendaftaran ON penilaian_ukk(pendaftaran_id);
CREATE INDEX idx_pengumuman_published ON pengumuman(is_published, published_at DESC);
CREATE INDEX idx_notifications_user  ON notifications(user_id, is_read);
CREATE INDEX idx_audit_user          ON audit_logs(user_id, created_at DESC);

-- ─── RLS POLICIES ─────────────────────────────────────────────
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendaftaran    ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen        ENABLE ROW LEVEL SECURITY;
ALTER TABLE penilaian_ukk  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;

-- Peserta hanya melihat data sendiri
CREATE POLICY "peserta_own_pendaftaran" ON pendaftaran
  FOR ALL USING (peserta_id = auth.uid());

CREATE POLICY "peserta_own_dokumen" ON dokumen
  FOR ALL USING (
    pendaftaran_id IN (SELECT id FROM pendaftaran WHERE peserta_id = auth.uid())
  );

-- Panitia lihat semua pendaftaran
CREATE POLICY "panitia_all_pendaftaran" ON pendaftaran
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ketua_pansel','sekretaris','admin'))
  );

-- Penilai UKK sesuai komponen
CREATE POLICY "penilai_own_penilaian" ON penilaian_ukk
  FOR ALL USING (penilai_id = auth.uid());

-- Notifikasi hanya milik sendiri
CREATE POLICY "own_notifications" ON notifications
  FOR ALL USING (user_id = auth.uid());

-- ─── TRIGGERS ──────────────────────────────────────────────────
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated    BEFORE UPDATE ON profiles    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_pendaftaran_updated BEFORE UPDATE ON pendaftaran FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_dokumen_updated     BEFORE UPDATE ON dokumen     FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_rekap_updated       BEFORE UPDATE ON rekap_nilai FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create rekap_nilai when pendaftaran created
CREATE OR REPLACE FUNCTION create_rekap_on_daftar()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO rekap_nilai (pendaftaran_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_rekap AFTER INSERT ON pendaftaran
  FOR EACH ROW EXECUTE FUNCTION create_rekap_on_daftar();

-- Auto-update ranking when nilai changes
CREATE OR REPLACE FUNCTION update_ranking()
RETURNS TRIGGER AS $$
BEGIN
  WITH ranked AS (
    SELECT id, ROW_NUMBER() OVER (
      PARTITION BY (SELECT lowongan_id FROM pendaftaran p WHERE p.id = pendaftaran_id)
      ORDER BY nilai_akhir DESC NULLS LAST
    ) AS rn FROM rekap_nilai
    WHERE pendaftaran_id IN (
      SELECT id FROM pendaftaran WHERE lowongan_id = (
        SELECT lowongan_id FROM pendaftaran WHERE id = NEW.pendaftaran_id
      )
    )
  )
  UPDATE rekap_nilai SET ranking = ranked.rn FROM ranked WHERE rekap_nilai.id = ranked.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_ranking AFTER INSERT OR UPDATE OF nilai_akhir ON rekap_nilai
  FOR EACH ROW EXECUTE FUNCTION update_ranking();

-- Audit log trigger
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, aksi, tabel, record_id, data_lama, data_baru)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_pendaftaran AFTER INSERT OR UPDATE OR DELETE ON pendaftaran
  FOR EACH ROW EXECUTE FUNCTION log_audit();
CREATE TRIGGER trg_audit_penetapan   AFTER INSERT OR UPDATE OR DELETE ON penetapan
  FOR EACH ROW EXECUTE FUNCTION log_audit();

-- ─── VIEWS ─────────────────────────────────────────────────────
CREATE VIEW v_rekap_seleksi AS
SELECT
  p.id AS pendaftaran_id,
  pr.nama AS nama_peserta,
  i.nama AS instansi,
  l.jabatan,
  l.jenis_seleksi,
  p.status,
  r.nilai_psikotes,
  r.nilai_tes_tulis,
  r.nilai_paparan,
  r.nilai_wawancara,
  r.nilai_integritas,
  r.nilai_akhir,
  r.ranking,
  r.lulus_ukk
FROM pendaftaran p
JOIN profiles pr   ON pr.id = p.peserta_id
JOIN lowongan l    ON l.id  = p.lowongan_id
JOIN instansi i    ON i.id  = l.instansi_id
LEFT JOIN rekap_nilai r ON r.pendaftaran_id = p.id
ORDER BY l.id, r.ranking NULLS LAST;

-- ─── SEED DATA ──────────────────────────────────────────────────
INSERT INTO instansi (nama, singkatan, jenis, deskripsi) VALUES
  ('Perusahaan Umum Daerah Air Minum Among Tirta', 'Perumdam Among Tirta', 'BUMD', 'BUMD pengelola air minum Kota Batu'),
  ('PT Bank Perkreditan Rakyat Bank Batu',          'PT BPR Bank Batu',    'BUMD', 'BPR milik Pemerintah Kota Batu'),
  ('Perusahaan Daerah Pasar Kota Batu',             'PD Pasar Kota Batu',  'BUMD', 'BUMD pengelola pasar tradisional'),
  ('Rumah Sakit Umum Daerah Kota Batu',             'RSUD Kota Batu',      'BLUD', 'RSUD milik Pemerintah Kota Batu'),
  ('Puskesmas Kecamatan Batu',                      'Puskesmas Batu',      'BLUD', 'Pusat Kesehatan Masyarakat Kec. Batu'),
  ('Puskesmas Kecamatan Bumiaji',                   'Puskesmas Bumiaji',   'BLUD', 'Pusat Kesehatan Masyarakat Kec. Bumiaji');
