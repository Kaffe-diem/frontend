<script>
  import { categories } from "$stores/menuStore";
  import { activeMessage } from "$stores/messageStore";
  import MenuItem from "$components/MenuItem.svelte";
</script>

{#each $categories as category}
  <div class="mb-10">
    <h1 class="mb-4 text-3xl text-primary">{category.name}</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {#each category.expand.drinks_via_category as item}
        <MenuItem {item} buyButton={!$activeMessage?.isVisible} />
      {/each}
    </div>
  </div>
{/each}
