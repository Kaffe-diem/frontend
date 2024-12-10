<script lang="ts">
  import orders from "$stores/orderStore";
  import { OrdersStateOptions } from "$lib/pocketbase";

  interface Props {
    show: OrdersStateOptions[];
  }

  let { show }: Props = $props();
</script>

<div class="flex flex-wrap gap-2">
  {#each $orders as order, index}
    {#if show.includes(order?.state)}
      <button class="btn btn-lg bg-base-200 text-3xl font-normal text-neutral">{index + 100}</button
      >
    {/if}
  {/each}
</div>
