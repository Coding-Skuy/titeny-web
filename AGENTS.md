# AGENTS.md — titeny-web

Papan insight web 3 peran (petani, vendor, CEO) berbasis Bun + SvelteKit, termasuk proxy `/api/v1/*` untuk klien web dan umpan-balik.

## Sumber kebenaran

Semua requirement bersumber dari [Titeny-TownHall](https://github.com/Coding-Skuy/Titeny-TownHall) versi beku `v1.0.0`. Dilarang menduplikasi requirement di repo kode; requirement berubah = PR di TownHall dulu.

| Dokumen (Titeny-TownHall) | Isi |
|---|---|
| [`produk/10-papan-insight.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/produk/10-papan-insight.md) | Papan insight 3 peran |
| [`platform/versions/v1.0.0/PRD/20-alur.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/PRD/20-alur.md) | Alur produk insight sampai tindak lanjut |
| [`platform/versions/v1.0.0/PRD/30-kriteria.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/PRD/30-kriteria.md) | US-001..US-006 dan acceptance |
| [`produk/21-kontrak-api-web-bun.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/produk/21-kontrak-api-web-bun.md) | Kontrak API web |
| [`platform/versions/v1.0.0/FSD/10-alur.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/FSD/10-alur.md) | Urutan ingest/hitung/tayang, jadwal job, urutan layar |
| [`platform/versions/v1.0.0/FSD/30-kontrak.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/FSD/30-kontrak.md) | Kontrak API, event, galat, stack pengikat |
| [`platform/versions/v1.0.0/BRD/30-akurasi-dampak.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/BRD/30-akurasi-dampak.md) | BR-301..BR-305: target MAPE, adopsi, instrumentasi |
| [`platform/versions/v1.0.0/FRD/10-fungsional.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/FRD/10-fungsional.md) | FR-001..FR-303 |
| [`platform/versions/v1.0.0/SRS/40-acceptance-criteria.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/SRS/40-acceptance-criteria.md) | QA-001..QA-004 (QA gate) |
| [`KONTEKS-LINTAS-DIVISI.md`](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/KONTEKS-LINTAS-DIVISI.md) (ChefGenie-TownHall) | Event registry (bagian 3), satuan/ID/uang (bagian 6), metrik lintas-divisi (bagian 7) |
| [`townhall-roadmap.md`](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) (ChefGenie-TownHall) | Epic E4 #5, batas blast radius (bagian 2), definisi selesai (bagian 6) |

Rujukan versi: `https://github.com/Coding-Skuy/Titeny-TownHall/tree/main/platform/versions/v1.0.0`.

## Tech stack terkunci

- **Bun + Svelte 5 + SvelteKit 2 + TypeScript** (adapter-node), validasi zod 3.23.x, Tailwind CSS 3.4 (jangan naik ke v4).
- Baseline TownHall: Bun 1.4.x, TypeScript 5.9.x ("latest" dikunci **exact** saat coding kickoff dan dicatat di TECHSTACK). Kode kini Svelte 5.2.0, SvelteKit 2.8.0, TypeScript 5.6.3.
- Runes: `$state`, `$derived`, `$effect` hanya untuk polling; dilarang `$:` gaya lama. Grafik SVG Svelte ringan + tabel teks alternatif (tanpa echarts).
- **Dilarang**: Next.js dan React; menghitung ulang angka di klien; menulis ke DB (web hanya memanggil API).

Detail matriks: `versions/v1.0.0/docs/40-TECHSTACK.md`. Batas context: `versions/v1.0.0/docs/60-BLAST-RADIUS.md`.

## Aturan kerja AI

1. Baca `AGENTS.md` ini dan semua ADR di `docs/decisions/` sebelum coding.
2. TDD merah-hijau: tulis test yang gagal dulu; rilis diblokir bila QA gate gagal (QA-001..QA-004, tidak boleh skip test).
3. Kontrak API/event hanya diubah lewat bump versi + catatan di ADR baru; tidak ada `event_type` di luar 11 terkunci tanpa bump versi + dual-read 30 hari.
4. Commit memakai awalan `docs:` / `feat:` / `fix:` dan wajib memperbarui `CHANGELOG.md` repo.
5. Keputusan arsitektur baru = tambah ADR bernomor di `docs/decisions/`; jangan edit ADR lama (immutable, sama seperti aturan versi TownHall).
6. Dilarang menyentuh DB divisi lain: DB per service; Titeny read-only terhadap DB Lumbung, TitipO, dan Pasaree dan hanya menulis ke DB `titeny`.
7. Bahasa artefak: Indonesia; uang integer IDR; waktu ISO-8601 Asia/Jakarta; tanpa data pribadi di Titeny.

## Definisi selesai

Dari [`townhall-roadmap.md` bagian 6](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md):

- Dokumen versi lengkap (BRD/FRD/FSD/PRD/SRS) + `SNAPSHOT-ROADMAP.md` di TownHall; dokumen beku tidak diedit.
- QA gate berbasis SRS lulus (TDD merah-hijau, QA-001..QA-004); rilis diblokir bila gagal.
- Kontrak API terbit; audit keamanan bersih (JWT audiens `titeny` + DB per service).
- Bukti metrik lintas-divisi (KONTEKS-LINTAS-DIVISI.md bagian 7) tercatat: MAPE harga H+1 <= 8% median / H+7 <= 12%, demand H+7 <= 15%, panen <= 20%, cakupan P10-P90 70-90%.
- CHANGELOG repo dan CHANGELOG versi diperbarui.
