<script>
  let isMenuOpen = $state(false);
  let darkMode = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header
  class="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
>
  <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-zinc-900 dark:text-white">
      Nega<span class="text-blue-600">Dash</span>
    </a>

    <nav
      class="hidden md:flex items-center space-x-6 text-zinc-700 dark:text-zinc-300"
    >
      <a href="/dashboard" class="hover:text-blue-600">Início</a>
      <a href="/sobre" class="hover:text-blue-600">Sobre</a>
    </nav>

    <div class="flex items-center gap-3">
      <button
        class="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        onclick={toggleMenu}
      >
        {#if isMenuOpen}
          ✖
        {:else}
          ☰
        {/if}
      </button>
    </div>
  </div>

  {#if isMenuOpen}
    <nav
      class="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 space-y-3"
    >
      <a href="/" class="block hover:text-blue-600">Início</a>
      <a href="/dashboard" class="block hover:text-blue-600">Dashboard</a>
      <a href="/sobre" class="block hover:text-blue-600">Sobre</a>
    </nav>
  {/if}
</header>

<style>
  :global(html) {
    transition:
      background 0.3s,
      color 0.3s;
  }
</style>
