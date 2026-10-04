> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 40-TECHSTACK — titeny-web

Mengacu: Titeny-TownHall v1.0.0 (https://github.com/Coding-Skuy/Titeny-TownHall/tree/main/versions/v1.0.0).

## Konteks TownHall

Stack divisi dikunci di TownHall v1.0.0: web Bun latest + Svelte 5 + SvelteKit Kit 2 + TypeScript latest; analis-desktop KMP Windows; backend Rust axum 0.8.4; model dan pipeline Python 3.12. Repo ini adalah web Bun latest + Svelte 5 + SvelteKit Kit 2 + TypeScript latest.

## Stack Repo Ini

| Lapisan | Pilihan | Versi target | STATUS |
|---|---|---|---|
| Runtime | Bun | latest (baseline v1.0.0: 1.4.x) | defined |
| UI | Svelte | 5 (repo kini 5.2.0) | defined |
| Framework | SvelteKit | Kit 2 (repo kini 2.8.0), adapter-node | defined |
| Bahasa | TypeScript | latest (baseline 5.9.x; repo kini 5.6.3 → target latest) | defined |
| Validasi | zod | 3.23.x mengikuti kontrak 11 event | defined |
| Grafik | SVG Svelte ringan + tabel teks alternatif | tanpa echarts di v1.0.0 | defined |
| Uji | bun test (unit + kontrak 11 fixture + beban ringan) | — | defined |

Satu proses `Bun.serve` melayani SSR + `/api/v1/*`; job 04.00/04.30 memakai penjaga kunci berkas. Rute: `/masuk`, `/insight/petani`, `/insight/vendor`, `/insight/ceo`.

## Perintah

```bash
bun install
bun run dev --port 5173
bun run build
bun run start --port 3000
bun test
```

CI: `bun install --frozen-lockfile && bun run build && bun test` hijau sebelum merge.

## Batasan

Batasan dokumen ini: hanya stack web. Logika prediksi mengikuti TownHall; repo ini tidak menulis ke DB sumber. Kenaikan Bun/TS ke latest dilakukan sebagai tugas terpisah dengan uji regresi papan sebelum rilis.
