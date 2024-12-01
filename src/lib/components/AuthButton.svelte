<script lang="ts">
  import auth from "$stores/authStore";
  import pb from "$lib/pocketbase";
  import { goto } from "$app/navigation";
  interface Props {
    children?: import("svelte").Snippet;
    [key: string]: any;
  }

  let { children, ...rest }: Props = $props();

  function goHome() {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      goto("/");
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
    goHome();
  }

  async function loginWithBasicAuth() {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    const authData = await pb.collection("users").authWithPassword(username!, password!);
    console.log(authData);
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    goHome();
  }

  function logout() {
    pb.authStore.clear();
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    goHome();
  }
</script>

{#if $auth.isAuthenticated}
  <button onclick={logout} class={rest.class || ""}
    >{#if children}{@render children()}{:else}Logg ut{/if}</button
  >
{:else}
  <button onclick={login} oncontextmenu={loginWithBasicAuth} class={rest.class || ""}
    >{#if children}{@render children()}{:else}Logg inn{/if}</button
  >
{/if}
