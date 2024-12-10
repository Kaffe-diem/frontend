<script lang="ts">
  import { categories } from "$stores/menuStore";
  let { selectedItem = $bindable() } = $props();
</script>

<div class="flex flex-col overflow-y-auto">
  {#each $categories as category}
    <div class="mb-8">
      <h1 class="mb-4 text-2xl font-bold text-primary">{category.name}</h1>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each category.expand.drinks_via_category as item}
          <label>
            <input
              type="radio"
              name="drink"
              class="peer hidden"
              value={item}
              bind:group={selectedItem}
            />
            <div
              class="btn relative flex h-24 w-full flex-col items-center justify-center border-4 peer-checked:border-accent"
            >
              <span class="font-bold">{item.name}</span>
              <span class="absolute bottom-2 right-2 font-normal">{item.price},-</span>
            </div>
          </label>
        {/each}
      </div>
    </div>
  {/each}
</div>
