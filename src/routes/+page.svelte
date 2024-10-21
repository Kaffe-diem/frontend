<script>
  import { auth } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import Logo from "$lib/assets/logo.png";
  import AuthButton from "$lib/AuthButton.svelte";
  import Rating from "$lib/Rating.svelte";
  import Review from "$lib/Review.svelte";

  let isAuthenticated = false;

  onMount(auth.subscribe((value) => {
    isAuthenticated = value.isAuthenticated;
  }));
</script>

<img src={Logo} alt="Kaffe diem logo" class="w-full max-w-[400px] md:max-w-[280px] md:mr-10 md:float-left m-4 mx-auto rounded-xl" />

<p>
  Den beste kaffeen på amalie skram!
</p>

<div class="inline-block text-center m-2">
  <Rating class="rating-lg" value=9 readonly />
  <span class="text-sm">Fra 1729 omtaler</span>
</div>

<div>
  {#if isAuthenticated}
    <a href="/drinks" class="btn">Trykk her for å bestille</a>
  {:else}
    <AuthButton class="btn m-2">Logg inn for å bestille</AuthButton>
    <p class="text-xs">Ved å opprette en bruker samtykker du til våre <a href="/tos" class="link-primary">vilkår for bruk</a></p>
  {/if}
</div>

<!-- Jump below the image -->
<br class="clear-both" />

<!-- Scroll horizontally -->
<div class="flex overflow-x-auto">
  <Review rating=10>
    <span slot="title">Meningen med livet</span>
    <span slot="content">Dette er den beste kaffeen jeg noen gang har smakt!</span>
    <span slot="author">Navn Navnesen</span>
  </Review>
  <Review rating=1>
    <span slot="title">Kjempedårlig</span>
    <span slot="content">Har aldri smakt noe så dårlig.</span>
    <span slot="author">Navn Navnesen</span>
  </Review>
</div>

<br />

<p>
  <a href="/drinks" class="link-primary">Se menyen vår</a>
</p>
