<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from "$lib/stores/authStore";

  export let data: { drinks: any[] };

  let drinks = data.drinks;

  onMount(() => {
        
    pb.collection('drinks').subscribe('*', (data) => {
      console.log(data);  // Handle real-time updates here
    });
  });
</script>

<ul class="list-none">
  {#each drinks as drink}
    <li>{drink.name}</li>
  {/each}
</ul>
