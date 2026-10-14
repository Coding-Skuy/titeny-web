> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 40-TECHSTACK — titeny-web

Mengacu: Titeny-TownHall v1.0.0 (`https://github.com/Coding-Skuy/Titeny-TownHall/tree/main/platform/versions/v1.0.0`). Stack pengikat divisi: [`FSD/30-kontrak.md`](https://github.com/Coding-Skuy/Titeny-TownHall/blob/main/platform/versions/v1.0.0/FSD/30-kontrak.md).

## Konteks TownHall

Stack divisi dikunci di TownHall v1.0.0: web Bun + Svelte 5 + SvelteKit 2 + TypeScript; analis-desktop KMP Windows (Kotlin, Compose Multiplatform, Navigation3); backend Rust Axum 0.8; model dan pipeline Python 3.12. Repo ini: Papan insight web 3 peran (petani, vendor, CEO) berbasis Bun + SvelteKit, termasuk proxy `/api/v1/*` untuk klien web dan umpan-balik.

## Stack Repo Ini

| Lapisan | Pilihan | Versi target | STATUS |
|---|---|---|---|
| Runtime | Bun | latest (baseline 1.4.x), dikunci exact saat kickoff | defined |
| UI | Svelte 5 (runes) | 5 (kode kini 5.2.0) | defined |
| Framework | SvelteKit 2, adapter-node | 2 (kode kini 2.8.0) | defined |
| Bahasa | TypeScript | latest (baseline 5.9.x; kode kini 5.6.3) | defined |
| Validasi | zod | 3.23.x | defined |
| Gaya | Tailwind CSS | 3.4.x (dikunci, bukan v4) | defined |
| Grafik | SVG Svelte + tabel teks alternatif | tanpa echarts | defined |
| Uji | `bun test` (unit + kontrak 11 fixture + beban ringan 100 req/dtk) | - | defined |

## Perintah

```bash
bun install
bun run dev --port 5173
bun run build
bun run start --port 3000
bun test
```

CI: `bun install --frozen-lockfile && bun run build && bun test` hijau sebelum merge.

## Kewajiban Selaras Kode (migrasi)

Repo web sudah memakai SvelteKit (tidak ada drift Next.js/React). Kewajiban yang tersisa:

| Butir | Kondisi kode | Target v1.0.0 |
|---|---|---|
| Bun dan TypeScript | `package.json` memakai npm-style + TS 5.6.3 | Bun 1.4.x, TS 5.9.x, versi exact dikunci saat kickoff |
| Svelte / SvelteKit | 5.2.0 / 2.8.0 | Naik ke versi terbaru seri 5 / 2 dengan uji regresi papan |
| Rute | Hanya `+page.svelte` dasar | `/masuk`, `/insight/petani`, `/insight/vendor`, `/insight/ceo` |
| Validasi | Belum ada zod | zod 3.23.x, 11 fixture event |

## Rute dan Cache

Landing Peran, Masuk, `/insight/petani`, `/insight/vendor`, `/insight/ceo` (+ rekomendasi, ekspor 500 baris). Respons prediksi cache 6 jam (`max-age=21600`); stale-while-revalidate 6 jam petani/vendor, revalidasi 15 menit CEO; `/kesehatan` 30 detik; timeout 12 detik menampilkan cache + stempel waktu.

## Batasan

Dokumen ini hanya mengatur stack repo `titeny-web`. Perubahan versi pustaka atau stack dicatat sebagai ADR baru di `docs/decisions/` dan dilaporkan ke TownHall. Titeny read-only terhadap DB sumber; satu-satunya basis tulis adalah DB `titeny`.
