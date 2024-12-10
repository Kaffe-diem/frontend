<script lang="ts">
  import { activeMessage } from "$stores/messageStore";
  import type { ActiveMessageResponse } from "$lib/pocketbase";

  interface Props {
    children;
  }

  let { children }: Props = $props();
</script>

{#if $activeMessage?.isVisible}
  <div class="flex h-full w-full flex-col items-center justify-center">
    <span class="p-2 text-center text-3xl font-bold md:text-6xl">Det er stengt</span>
    <button
      class="btn relative m-4 flex h-24 w-1/2 flex-col items-center justify-center text-3xl lg:text-5xl
"
      onclick={() =>
        activeMessage.update({
          ...$activeMessage,
          isVisible: false
        } as ActiveMessageResponse)}>Åpne</button
    >
    <a
      href="/admin/message"
      class="btn relative m-4 flex h-24 w-1/2 flex-col items-center justify-center text-3xl lg:text-5xl"
      >Eller endre status</a
    >
  </div>
{:else}
  <main class="relative mx-auto h-screen w-11/12 py-4">
    {@render children?.()}
  </main>
{/if}
