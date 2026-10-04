> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 60-BLAST-RADIUS — titeny-web

Mengacu: Titeny-TownHall v1.0.0 (https://github.com/Coding-Skuy/Titeny-TownHall/tree/main/versions/v1.0.0).

## Pernyataan read-only

Repo ini tidak menulis ke DB sumber. Web hanya membaca prediksi dari API Titeny dan meneruskan event masuk serta umpan-balik ke API; tidak pernah membuka koneksi ke DB Lumbung, TitipO, atau Pasaree. Satu-satunya tulis terjadi di server API ke DB `titeny`.

## Radius Dampak per Perubahan

| Perubahan | Dampak | Batas penahan |
|---|---|---|
| Rute `/insight/*` | 3 papan petani/vendor/CEO ikut berubah | Uji 360 px tanpa scroll horizontal sebelum rilis |
| Cache 6 jam | Risiko tayang basi | Stempel waktu + label basi/kemarin selalu tampil |
| Runes Svelte 5 | Risiko regresi reaktivitas | Dilarang `$:` gaya lama; uji `bun test` wajib hijau |
| Proxy `/api/v1` | Risiko bocor kunci layanan | Kunci layanan hanya di server via secret, tidak ke browser |

## Larangan Eksplisit

- Dilarang menambah string koneksi ke DB sumber.
- Dilarang menghitung ulang fee, grade, atau papan di klien; semua memakai angka server.
- Dilarang menaikkan ekspor web di atas 500 baris (massal hanya via desktop analis beraudit).

## Rollback

Setiap rilis menyimpan build sebelumnya. Rollback berarti mengembalikan build dan memverifikasi `GET /api/v1/kesehatan` plus satu halaman `/insight/petani` tampil dari cache.

## Batasan

Batasan dokumen ini: hanya radius repo web. Dampak ingest ada di `titeny-data-pipeline`, dampak model di `titeny-ai-models`. Insiden DB sumber diteruskan ke pemilik sumber.
