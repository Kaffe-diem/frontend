<script lang="ts">
  import { OrdersStateOptions } from "$lib/pocketbase";
  import OrderList from "../OrderList.svelte";

  const { received, production, completed } = OrdersStateOptions;
</script>

<div class="grid h-full grid-cols-[1fr,auto,1fr] grid-rows-[100%] gap-4">
  <OrderList show={[received]} onclick={production} label="Mottatt" />

  <div class="divider divider-horizontal"></div>

  <OrderList show={[production]} onclick={completed} label="Lages" />
</div>
