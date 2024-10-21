<script lang="ts">
  import { State, Order } from "$lib/types";

  // $: order = new Order(999, State.Complete);
  $: order = new Order(999);
  $: orders_in_queue = 10;
  $: eta_minutes = orders_in_queue * 3;
  $: order_complete = order.state == State.Complete;
</script>

<div class="text-center">
  {#if order_complete}
    <h2 class="mb-3 text-3xl font-bold text-green-700 md:mb-6 md:text-4xl">Kom og hent!</h2>
    <h2 class="mb-3 text-2xl font-bold md:mb-6 md:text-3xl">{order.id}</h2>
  {:else}
    <h2 class="mb-3 text-3xl font-bold md:mb-6 md:text-4xl">Straks ferdig...</h2>
    <h2 class="mb-3 text-2xl font-bold md:mb-6 md:text-3xl">{order.id}</h2>
    <h2 class="text-2xl font-bold md:text-3xl">
      Under {eta_minutes} minutter igjen!
    </h2>
  {/if}
</div>
