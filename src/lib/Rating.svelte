<script lang="ts">
  export let value: number;
  export let readonly: boolean = false;
  // Name is only required when the component's value can change
  export let name: string;
</script>

<div class="rating rating-half block {$$restProps.class || ''}">
  {#each Array(10) as _, n}
    <input type="radio" {name} class="mask mask-coffee {n % 2 == 0 ? 'mask-half-1' : 'mask-half-2'} bg-accent {readonly ? 'cursor-default' : ''}" checked={n == value - 1} disabled={readonly} />
  {/each}
</div>

<style>
.mask-coffee {
  mask-image: url("$lib/assets/coffee.svg");
}
</style>
