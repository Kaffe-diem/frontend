<script lang="ts">
  import OrderList from "../OrderList.svelte";
  import ItemSelection from "./ItemSelection.svelte";
  import Cart from "./Cart.svelte";
  import { OrdersStateOptions, type DrinksResponse } from "$lib/pocketbase";

  let selectedItem = $state<DrinksResponse | undefined>();
</script>

<div class="grid h-full grid-cols-[2fr,auto,1fr,auto,1fr] grid-rows-[100%] gap-2">
  <ItemSelection bind:selectedItem />

  <div class="divider divider-horizontal m-1 p-1"></div>

  <Cart {selectedItem} />

  <div class="divider divider-horizontal m-1 p-1"></div>

  <OrderList
    show={[OrdersStateOptions.completed]}
    onclick={OrdersStateOptions.dispatched}
    label="Ferdig"
  />
</div>
