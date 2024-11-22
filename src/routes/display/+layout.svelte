<script lang="ts">
  import QR from "$lib/assets/qr-code.svg";
  import pb from "$lib/pocketbase";
  import { onMount } from "svelte";

  interface Props {
    data: { activeMessage: String[] };
  }

  let { data, children }: Props = $props();
  let message = $state(data.activeMessage[0]);

  onMount(() => {
    pb.collection("activeMessage").subscribe(
      message.id,
      (event) => {
        message = event.record;
      },
      {
        expand: "message"
      }
    );
  });
</script>

{#if message.isVisible}
  <div class="flex h-screen flex-col items-center justify-center">
    <span class="p-2 text-7xl font-bold md:text-9xl">{message.expand.message.title}</span>
    <span class="p-2 text-4xl md:text-6xl">{message.expand.message.subtext}</span>
  </div>
{:else}
  <main class="relative mx-auto h-screen w-11/12 py-4">
    {@render children?.()}
  </main>
{/if}

<div class="absolute bottom-0 left-0 hidden md:flex w-screen">
  <a href="/">
    <img class="h-48 w-48" src={QR} alt="QR code" />
  </a>
  <div class="ml-2 mr-2 flex flex-col items-start justify-center py-1 text-xl text-neutral">
    <span>Skann eller besøk</span>
    <a href="https://kaffediem.asvg.no" class="font-bold text-accent">kaffediem.asvg.no</a>
    <span>for å bestille</span>
  </div>

</div>
<div class="absolute bottom-0 left-0 hidden md:flex w-screen">
  <div class="ml-2 mr-2 flex flex-col items-center justify-center py-1 text-xl text-neutral flex-grow text-center h-48">
    <p>Laget av elevene fra ITK :) </p>
  </div>
</div>
