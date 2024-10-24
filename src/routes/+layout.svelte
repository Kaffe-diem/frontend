<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";
</script>

<div class="flex min-h-screen flex-col">
  <div class="flex-grow">
    <!-- Display-kiosk-siden skal ikke ha noen navbar; den skal kun vise bestillinger -->
    {#if $page.url.pathname.includes("display")}
      <slot />
    {:else}
      <div class="app mx-auto w-11/12 md:w-9/12">
        <Nav />
        <main class="mt-16">
          <slot />
        </main>
      </div>
    {/if}
  </div>

  <!-- Display-siden skal heller ikke ha footer -->
  {#if !$page.url.pathname.includes("display")}
    <Footer />
  {/if}
</div>
