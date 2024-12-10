<script lang="ts">
  import type { DrinksResponse } from "$lib/pocketbase";
  let { selectedItem } = $props();
  import orders from "$stores/orderStore";

  let cart = $state<DrinksResponse[]>([]);
  let totalPrice = $derived(cart.reduce((sum, item) => sum + item.price, 0));
</script>

<div class="flex h-full flex-col justify-center gap-8">
  <div class="h-1/2 overflow-y-auto">
    <table class="table table-pin-rows table-auto list-none p-4 shadow-2xl">
      <thead>
        <tr>
          <th class="w-full">Drikke</th>
          <th class="whitespace-nowrap">Pris</th>
        </tr>
      </thead>
      <tbody>
        {#if cart.length > 0}
          {#each cart as drink, index}
            <tr class="hover select-none" onclick={() => cart.splice(index, 1)}>
              <td>{drink.name}</td>
              <td>{drink.price},-</td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td>Ingenting</td>
            <td></td>
          </tr>
        {/if}
      </tbody>
      <tfoot>
        <tr>
          <th>Total: <span class="text-neutral">{cart.length}</span></th>
          <th><span class="text-bold text-lg text-primary">{totalPrice},-</span></th>
        </tr>
      </tfoot>
    </table>
  </div>

  <div class="flex flex-row justify-center gap-2">
    <button
      class="bold btn btn-lg text-xl"
      onclick={() => {
        orders.create(cart.map((item) => item.id));
        cart = [];
      }}>Ferdig</button
    >
    <button class="bold btn btn-primary btn-lg text-3xl" onclick={() => cart.push(selectedItem)}
      >+</button
    >
  </div>
</div>
