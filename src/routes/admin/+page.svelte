<script lang="ts">
  const adminPages = [
    { href: "/admin/orders/frontdesk", text: "Bestillingsdisk" },
    { href: "/admin/orders/kitchen", text: "Kjøkken" },
    { href: "/display", text: "Visning" },
    { href: "/admin/message", text: "Endre skjermmelding" }
    // { href: "/admin/menu", text: "Endre menyen" }
  ];
</script>

<ul>
  {#each adminPages as page}
    <li>
      <a
        class="btn relative m-4 flex h-24 w-full flex-col items-center justify-center text-3xl lg:text-5xl"
        href={page.href}
        >{page.text}
      </a>
    </li>
  {/each}
</ul>
