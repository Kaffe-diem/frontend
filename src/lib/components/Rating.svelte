<script lang="ts">
  interface RatingProps {
    value?: number;
    readonly?: boolean;
    name?: string | null;
    maxRating?: number;
    class?: string;
    [key: string]: any;
  }

  let {
    value = $bindable(0),
    readonly = false,
    name = null,
    maxRating = 10,
    class: className = ""
  }: RatingProps = $props();

  function generateRatingItems(max: number): number[] {
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  const items = generateRatingItems(maxRating);

  function handleRatingChange(newValue: number): void {
    if (!readonly) {
      value = newValue;
    }
  }
</script>

<div class="rating rating-half block {className}">
  {#each items as rating}
    <input
      type="radio"
      {name}
      class="mask-coffee mask mask-half-{2 - (rating % 2)} bg-accent"
      class:cursor-default={readonly}
      checked={rating === value}
      disabled={readonly}
      onchange={() => handleRatingChange(rating)}
    />
  {/each}
</div>

<style>
  .mask-coffee {
    mask-image: url("$assets/coffee.svg");
  }
</style>
