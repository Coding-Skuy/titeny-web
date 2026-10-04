# titeny-web

Dasbor utama divisi **Titeny (AI Insight)**, org **Coding-Skuy**. Dibangun dengan **Bun + Svelte + TypeScript**.

Ekosistem: [Titeny-TownHall](https://github.com/Coding-Skuy/Titeny-TownHall).

## Prasyarat (versi dipin)

- Bun 1.1.38
- Svelte 5.2.0, SvelteKit 2.8.0
- TypeScript 5.6.3
- Vite 5.4.8
- Tailwind CSS 3.4.13

## Cara jalan

```sh
bun install
bun run dev
```

Buka `http://localhost:5173`. Dasbor mengambil data insight dari `titeny-backend-service` di `http://localhost:8080`.

## Skrip

- `bun run dev` — mode pengembangan
- `bun run build` — bangun produksi
- `bun run preview` — pratinjau hasil bangun
- `bun run check` — cek tipe Svelte + TypeScript

## Struktur

```text
src/routes/+page.svelte  # halaman dasbor utama
src/lib/api.ts            # klien API insight
svelte.config.js          # konfigurasi SvelteKit
```
