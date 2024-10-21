<script lang="ts">
  import Rating from "$lib/Rating.svelte";
  export let rating: number;
</script>

<div class="flex-none card bg-base-200 w-full md:max-w-lg shadow m-2">
  <div class="card-body">
    <h2 class="card-title"><slot name="title">Title</slot></h2>
    <Rating value={rating} readonly />
    <p><slot name="content">Content</slot></p>
    <p class="mt-2 italic">- <slot name="author">Author</slot></p>
  </div>
</div>
