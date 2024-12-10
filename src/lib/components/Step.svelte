<script lang="ts">
  interface Props {
    state: boolean;
    children?: import("svelte").Snippet;
  }

  let { state, children }: Props = $props();
</script>

<li class="step {state ? 'step-primary' : ''} p-2 after:h-14 after:w-14">{@render children?.()}</li>
