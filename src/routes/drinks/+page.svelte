<script lang="ts">
  import Drink from "$lib/Drink.svelte";
  import { pb } from "$lib/stores/authStore";
  let groupedDrinks: Record<string, any[]>;

  /** @type {import('./$types').PageData} */
  export let data = { drinks: [] };
  groupedDrinks = Object.groupBy(data.drinks, ({ kind }) => kind);
</script>

{#if pb.authStore.isValid}
  <h1 class="my-16 text-4xl font-bold italic text-teal-700">
    {pb.authStore.model?.name.split(" ")[0].toUpperCase()} VIL HA
  </h1>
{:else}
  <h1 class="my-16 text-4xl font-bold italic text-teal-700">JEG VIL HA</h1>
{/if}

<div class="flex flex-col gap-16">
  <section>
    <h1 class="text-2xl font-bold italic text-red-700">Varm drikke</h1>
    <ul class="grid grid-cols-1 gap-16 md:grid-cols-3">
      {#each groupedDrinks?.hot || [] as drink}
        <li class="drink-card">
          <Drink {drink} />
        </li>
      {/each}
    </ul>
  </section>

  <section>
    <h1 class="text-2xl font-bold italic text-sky-700">Kald drikke</h1>
    <ul class="grid grid-cols-3 gap-16">
      {#each groupedDrinks?.cold || [] as drink}
        <li class="drink-card">
          <Drink {drink} />
        </li>
      {/each}
    </ul>
  </section>

  <section>
    <h1 class="text-2xl font-bold italic text-orange-700">Sesongens spesial 🎃</h1>
    <ul class="grid grid-cols-3 gap-16">
      {#each groupedDrinks?.special || [] as drink}
        <li class="drink-card">
          <Drink {drink} />
        </li>
      {/each}
    </ul>
  </section>
</div>
