<script lang="ts">
  import QR from "$lib/assets/qr-code.svg";
  import { pb } from "$lib/stores/authStore";
  import { onMount } from "svelte";

  let screenMessage = {};

  onMount(async () => {
    const screenMessageRecord = await pb.collection("screen_message").getList(1, 1);
    screenMessage = screenMessageRecord.items[0];
  });

  onMount(() => {
    pb.collection("screen_message").subscribe("*", function (event) {
      screenMessage = event.record;
    });
  });
</script>

{#if screenMessage.title != ""}
  <div class="flex h-screen flex-col items-center justify-center">
    <span class="text-7xl font-bold md:text-9xl p-2">{screenMessage.title}</span>
    {#if screenMessage.subtext != ""}
      <span class="text-4xl md:text-6xl p-2">{screenMessage.subtext}</span>
    {/if}
  </div>
{:else}
  <main class="relative mx-auto h-screen w-11/12 py-4">
    <slot />
  </main>
{/if}

<div class="absolute bottom-0 left-0 hidden md:flex">
  <a href="/">
    <img class="h-48 w-48" src={QR} alt="QR code" />
  </a>
  <div class="ml-2 mr-2 flex flex-col items-start justify-center py-1 text-xl text-neutral">
    <span>Skann eller besøk</span>
    <a href="https://kaffediem.asvg.no" class="font-bold text-accent">kaffediem.asvg.no</a>
    <span>for å bestille</span>
  </div>
</div>
