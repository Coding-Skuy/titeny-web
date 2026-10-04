export const BASE_URL = 'http://localhost:8080';

export type Kartu = { judul: string; nilai: string };
export type Ringkas = { kartu: Kartu[] };

export async function ambilRingkas(): Promise<Ringkas> {
  const r = await fetch(`${BASE_URL}/insight/ringkas`);
  if (!r.ok) throw new Error(`backend ${r.status}`);
  return r.json() as Promise<Ringkas>;
}

export async function ambilHarga(komoditas: string) {
  const r = await fetch(`${BASE_URL}/insight/harga?komoditas=${encodeURIComponent(komoditas)}`);
  if (!r.ok) throw new Error(`backend ${r.status}`);
  return r.json();
}
