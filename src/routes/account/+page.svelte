<script lang="ts">
  import { pb } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import ExpandedDrink from "$lib/ExpandedDrink.svelte";

  let favorites: any[];
  let previous_orders_drinks: any[];
  onMount(async () => {
    const userId = pb.authStore.model?.id;
    if (userId) {
      const user = await pb.collection("users").getOne(userId, {
        expand: "favorites,favorites.drink"
      });
      favorites = user.expand?.favorites || [];

      const orders = await pb.collection("orders").getList(1, 10, {
        filter: `customer = '${userId}'`,
        expand: "drinks,drinks.drink"
      });
      previous_orders_drinks = orders.items.flatMap((order) => order.expand?.drinks || []);
      console.log(previous_orders_drinks);
    }
  });
</script>

<div class="items-between flex">
  <section>
    <h1 class="my-16 text-4xl font-bold italic text-teal-700">
      {pb.authStore.model?.name.split(" ")[0].toUpperCase()} ELSKER
    </h1>
    <div class="grid grid-cols-3 gap-16">
      {#each favorites || [] as drink}
        <ExpandedDrink {drink} />
      {/each}
    </div>
  </section>

  <section>
    <h1 class="my-16 text-4xl font-bold italic text-teal-700">SISTE BESTILLINGER</h1>
    <div class="grid grid-cols-3 gap-16">
      {#each previous_orders_drinks ?? [] as drink}
        <ExpandedDrink {drink} />
      {/each}
    </div>
  </section>
</div>
