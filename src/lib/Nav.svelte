<script lang="ts">
  import { auth } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import { restrictedRoutes } from "$lib/constants";
  import MenuIcon from "$lib/assets/MenuIcon.svelte";
  import NavItems from "$lib/NavItems.svelte";

  let isAuthenticated = false;

  onMount(
    auth.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
    })
  );

  class NavItem {
    href: string;
    text: string;
    requiresAuth: boolean;

    constructor(href: string, text: string) {
      this.href = href;
      this.text = text;
      this.requiresAuth = restrictedRoutes.includes(this.href);
    }
  }

  const navItems = [
    new NavItem("/drinks", "Meny"),
    new NavItem("/display", "Visning"),
    new NavItem("/account", "Min bruker"),
    new NavItem("/status", "Min bestilling")
  ];
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Kaffe Diem</a>
  </div>
  <div class="dropdown dropdown-end lg:hidden">
    <div tabindex="0" role="button" class="btn btn-ghost">
      <MenuIcon />
    </div>
    <NavItems
      {navItems}
      {isAuthenticated}
      class="dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
    />
  </div>
  <div class="hidden flex-none lg:flex">
    <NavItems {navItems} {isAuthenticated} class="menu menu-horizontal px-1" />
  </div>
</div>
