<script lang="ts">
  import OrderList from "./OrderList.svelte";
  import { OrdersStateOptions } from "$lib/pocketbase";
  const { received, production, completed } = OrdersStateOptions;
</script>

<div
  class="grid h-full grid-cols-1 grid-rows-[1fr_auto_1fr] gap-4 md:grid-cols-[1fr_auto_1fr] md:grid-rows-1"
>
  <div class="flex h-full flex-col p-4">
    <h2 class="mb-3 text-4xl font-bold text-neutral md:mb-6 md:text-center md:text-4xl">
      Straks ferdig...
    </h2>
    <OrderList show={[received, production]} />
  </div>

  <div class="divider md:divider-horizontal"></div>

  <div class="flex h-full flex-col p-4">
    <h2 class="mb-3 text-4xl font-bold text-primary md:mb-6 md:text-center md:text-4xl">
      Kom og hent!
    </h2>
    <OrderList show={[completed]} />
  </div>
</div>
