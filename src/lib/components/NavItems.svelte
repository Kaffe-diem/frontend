<script lang="ts">
  import type { NavItem } from "$lib/types";
  import AuthButton from "$components/AuthButton.svelte";

  interface Props {
    navItems: NavItem[];
    isAuthenticated: boolean;
    isAdmin: boolean;
    [key: string]: any;
  }

  let { navItems, isAuthenticated, isAdmin, ...rest }: Props = $props();
</script>

<ul class="menu {rest.class || ''}">
  {#each navItems as item}
    {#if (isAuthenticated || !item.requiresAuth) && (isAdmin || !item.requiresAdmin)}
      <li>
        <a href={item.href} tabindex="0">{item.text}</a>
      </li>
    {/if}
  {/each}
  <li><AuthButton /></li>
</ul>
