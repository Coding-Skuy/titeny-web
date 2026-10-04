<script lang="ts">
  import { ambilRingkas } from '$lib/api';
  let data: Awaited<ReturnType<typeof ambilRingkas>> | null = null;
  let galat: string | null = null;
  async function muat() {
    try { data = await ambilRingkas(); }
    catch (e) { galat = String(e); }
  }
  muat();
</script>

<main class="p-6 max-w-5xl mx-auto">
  <h1 class="text-3xl font-bold">Titeny — Dasbor Insight</h1>
  <p class="opacity-70">Sumber: titeny-backend-service (DB titeny). Model: titeny-ai-models.</p>
  {#if galat}<p>Belum terhubung ke backend: {galat}</p>
  {:else if !data}<p>Memuat…</p>
  {:else}
    <section class="grid gap-4 mt-4">
      {#each data.kartu as k}
        <article class="border rounded p-4"><h2>{k.judul}</h2><p>{k.nilai}</p></article>
      {/each}
    </section>
  {/if}
</main>
