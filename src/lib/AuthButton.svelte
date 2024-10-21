<script lang="ts">
  import { onMount } from "svelte";
  import { auth, pb } from "$lib/stores/authStore";
  import { goto } from "$app/navigation";

  let isAuthenticated = false;

  onMount(auth.subscribe((value) => {
    isAuthenticated = value.isAuthenticated;
  }));

  function goHome() {
    if (window.location.pathname === '/') {
      window.location.reload();
    } else {
      goto('/');
    }
  }

  async function login() {
    const authData = await pb.collection("users").authWithOAuth2({ provider: "google" });

    const meta = authData.meta;

    if (meta?.isNew) {
      const formData = new FormData();
      formData.append("name", meta.name);

      const avatarResponse = await fetch(meta.avatarUrl);
      if (avatarResponse.ok) {
        const avatar = await avatarResponse.blob();
        formData.append("avatar", avatar);
      }

      await pb.collection("users").update(authData.record.id, formData);
    }

    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    goHome()
  }

  function logout() {
    pb.authStore.clear();
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    goHome()
  }
</script>

{#if isAuthenticated}
  <button on:click={logout} class={$$restProps.class || ''}><slot>Logg ut</slot></button>
{:else}
  <button on:click={login} class={$$restProps.class || ''}><slot>Logg inn</slot></button>
{/if}
