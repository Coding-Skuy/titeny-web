> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 60-BLAST-RADIUS — titeny-web

Mengacu: Titeny-TownHall v1.0.0 (`https://github.com/Coding-Skuy/Titeny-TownHall/tree/main/platform/versions/v1.0.0`), [`townhall-roadmap.md` bagian 2](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) (baris Titeny: point of concern "11 event; MAPE H+1 <= 8%"; batas context "12 komoditas x 8 pasar; read-only ke DB sumber") dan [`KONTEKS-LINTAS-DIVISI.md` bagian 8-9](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/KONTEKS-LINTAS-DIVISI.md).

## Pernyataan read-only

Repo ini tidak menulis ke DB sumber. Titeny hanya membaca dari Lumbung, TitipO, dan Pasaree (lewat event/konektor SELECT); satu-satunya basis tulis adalah DB `titeny`.

## Yang BOLEH disentuh repo ini

Seluruh kode papan web, proxy `/api/v1/*`, modul `sesi.ts`, komponen grafik SVG, uji `bun test`; membaca token desain dari `titeny-design`.

## Yang DILARANG

- Menambah string koneksi ke DB mana pun; web hanya memanggil API Titeny.
- Menghitung ulang prediksi, rekomendasi, atau papan di klien.
- Menaikkan ekspor web di atas 500 baris (massal hanya desktop analis).
- Memakai Next.js, React, atau `$:` gaya lama; menaruh kunci layanan di browser.

## Kontrak

- **Dikonsumsi**: API Titeny (`GET /api/v1/harga`, `/demand`, `/panen`, `/rekomendasi`, `/kesehatan`); token desain `titeny-design`.
- **Diproduksi**: `POST /api/v1/umpan-balik` (petani/vendor), `POST /api/v1/rekomendasi/{id}/status` (CEO/analis); event analitik `papan.dibuka`, `kartu.terlihat`, `umpan_balik.diberi`, `rekomendasi.status_berubah`, `ekspor.dibuat` (instrumentasi internal, BUKAN bagian registry 11).
- Modul bersama `:shared:pantry-resep` adalah milik Pawonee dan tidak dipakai atau diubah oleh Titeny. `pedaree.stok.v1` adalah kontrak bilateral Pedaree-TitipO dan bukan bagian registry Titeny (11 event terkunci).

## Radius Dampak per Perubahan

| Perubahan | Dampak | Batas penahan |
|---|---|---|
| Rute `/insight/*` | 3 papan petani/vendor/CEO ikut berubah | Uji 360 px tanpa scroll horizontal sebelum rilis |
| Cache 6 jam | Risiko tayang basi | Stempel waktu + label basi/kemarin selalu tampil |
| Runes Svelte 5 | Risiko regresi reaktivitas | Dilarang `$:` gaya lama; uji `bun test` wajib hijau |
| Proxy `/api/v1` | Risiko bocor kunci layanan | Kunci layanan hanya di server via secret, tidak ke browser |

## Rollback

Setiap rilis menyimpan build sebelumnya. Rollback berarti mengembalikan build dan memverifikasi `GET /api/v1/kesehatan` plus satu halaman `/insight/petani` tampil dari cache.

## Batasan

Dokumen ini hanya mengatur radius repo `titeny-web`. Dampak repo lain ada di dokumen blast-radius repo tersebut. Insiden DB sumber diteruskan ke pemilik sumber.
